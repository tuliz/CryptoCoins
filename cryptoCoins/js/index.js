let GlobalcoinsSaved;
let infoSaved;

//on the loading of the website get the coins with the ON toggle and build all cards
window.onload = ()=>{
    GlobalcoinsSaved = JSON.parse(localStorage.getItem("coinsSaved")) ? JSON.parse(localStorage.getItem("coinsSaved")) : [];
    infoSaved = JSON.parse(localStorage.getItem("infoSaved")) ? JSON.parse(localStorage.getItem("infoSaved")) : [{result:{id:"dummy"}, time: 0}];
    showAllCrypto("all");
}

//listener for when clicking on showing page with all coins
$('#coinsBtn').click(()=>{
    showAllCrypto("all");
});

//creating and loading about page when about clicked in navigation
$("#aboutBtn").click(()=>{
    
    const div = document.createElement("div");
    div.id = "about-page";
    const information = document.createElement("p");
    information.innerHTML = "hey i am yarden a full stack web development student in john bryce. working in security and live in kiryat ata.";

    const projectInfo = document.createElement("p");
    projectInfo.innerHTML = "the project purpose is using jquery ajax for calling api of another website. this projects calls and showing crypto coins";

    const img = document.createElement("img");
    img.src = "./images/profile.jpg";
    img.className ="profile-img";
    
    $("#cardsContainer").html("");
    $("#cardsContainer").append(div);
    $("#about-page").append(information, projectInfo, img);
});

//listener for search button and when clicked getting the input of user and send to showAllCrypto function
$("#searchBtn").click(()=>{
    const input = document.getElementById("coin").value.toLowerCase();
    input ? showAllCrypto("single", input) : alert("you need to enter input");
    
});

//function for using API for getting all coins and sending all coins to function for building the coins cards
const showAllCrypto = (type, searchValue = "") => {
    $.ajax({
        type: 'GET',
        url: "https://api.coingecko.com/api/v3/coins/list",
        dataType: 'json',
        success: (result, status, xhr)=>{
            let flag = false;
            let singleResult;
            //checking if this is a search function and find the coin by its symbol
            if(type === "single"){
            result.forEach(coin=>{

                if(coin.symbol == searchValue){
                  singleResult = coin;
                  flag = true;
                }
            });
        }
     
            if(flag)
              buildCryptoCards([singleResult], type);

            else if(!flag && type === "single"){
              buildCryptoCards([result], "all"); 
              alert("code symbol not found");
            }

            else
              buildCryptoCards([result], "all"); 

        },
        error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
}

//function for building the coin cards
const buildCryptoCards = (cryptoCoinsArray, type) =>{
    $("#cardsContainer").html("");
    //wanted to start from specific coins with better names
    const cryptoCoins = type === 'all' ? cryptoCoinsArray[0] : cryptoCoinsArray;
    const end = type === "all" ? 500 : 1;
    let i = type === "all" ? 400 : 0;
    for(i ; i < end; i++){
        const card = document.createElement("div");
        card.className = "card";

        const column = document.createElement("div");
        column.className = "col-lg-3";
        let node;

        const cardBody = document.createElement("div");
        cardBody.id = `${cryptoCoins[i].id}`;
        cardBody.className = "card-body crypto-card";

        const cryptoCode = document.createElement("h5");
        cryptoCode.className = "card-title";
        node = cryptoCoins[i].symbol;
        cryptoCode.append(node);

        const cryptoName = document.createElement("p");
        cryptoName.className = "card-text";
        node = cryptoCoins[i].name;
        cryptoName.append(node);

        const moreBtn = document.createElement("button");
        moreBtn.id = `${cryptoCoins[i].id}`;
        moreBtn.className = "btn btn-primary moreBtn";
        moreBtn.innerHTML = "More Info";

        
        const toggle = document.createElement("label");
        toggle.className = "switch";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `switch_${cryptoCoins[i].id}`;
        checkbox.checked =  GlobalcoinsSaved.includes(cryptoCoins[i].id);
        const slider = document.createElement("span");
        slider.className = "slider round";

        toggle.append(checkbox);
        toggle.append(slider);
     

        cardBody.append(cryptoCode);
        cardBody.append(cryptoName);
        cardBody.append(moreBtn);
        cardBody.append(toggle);

        card.append(cardBody);
        column.append(card);

        $("#cardsContainer").append(column);

    

    }
    
    addMoreBtnsListeners();
    addToggleBtnsListeners();    
}

//function for adding listeners for toggle button on each coin card
const addToggleBtnsListeners = () =>{
    $('input').each((i, obj)=>{
        obj.addEventListener("change", (e)=>{
            const slicedID = e.target.id.slice(7);
            //checking if the toggle is ON
            if(e.target.checked){
                //entering the toggle into the saved coins array
                GlobalcoinsSaved.push(slicedID);
                //cheking if coins saved array not empty and the list is not full (less than 5 items) if true saving the new array in localStorage
                if(GlobalcoinsSaved  && GlobalcoinsSaved.length < 6){
                    localStorage.setItem('coinsSaved', JSON.stringify(GlobalcoinsSaved));
                }
                //checking if saved coins list is full, if so activating function for replacing coins
                if(GlobalcoinsSaved.length > 5){
                    changeSavedCoin(GlobalcoinsSaved);
                }
            }
            //checking if toggle turned off, if yes it means user wants to remove the saved coins from saved coins list
            else{
                GlobalcoinsSaved.splice(GlobalcoinsSaved.indexOf(slicedID), 1);
                localStorage.setItem('coinsSaved', JSON.stringify(GlobalcoinsSaved));
            }
        });
    })

};

//function for adding listeners for the More Info buttons on each coin card
const addMoreBtnsListeners = () =>{
    //START of creating progress bar
    const progress = document.createElement("div");
    progress.className = "progress";
    
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar progress-bar-striped progress-bar-animated";
    progressBar.setAttribute("role", "progressbar");
    progressBar.setAttribute("aria-valuenow", "100");
    progressBar.setAttribute("aria-valuemin", "0");
    progressBar.setAttribute("aria-valuemax", "100");

    progress.append(progressBar);
    //END of creating progress bar


    $('.moreBtn').each((i, obj)=>{
        obj.addEventListener("click", (e)=>{
            //check if the card is in its normal height, it means if more info is not open
            if($(`div #${e.target.id}`)[0].clientHeight == 142){
                let flag = false;
                for(let i = 0; i < infoSaved.length; i++){

                    //check if info card exist in saved list and 2 minutes didnt pass since last time it opened, if true just use the saved results and skip using api call
                    if(infoSaved[i].result.id === e.target.id && (new Date().getTime() - infoSaved[i].time) < 120000){
                       buildInfoCard(infoSaved[i].result);
                       flag = true;
                       break;
                    }
                    //checking if info card exist in saved list and 2 minuts Have been passed since its been last called, if true add a progress bar and wait when calling infoAPI
                    //and remove the saved info from saved info array
                    else if(infoSaved[i].result.id === e.target.id && (new Date().getTime() - infoSaved[i].time) > 120000){
                    $(`div#${e.target.id}`).append(progress);
                    infoSaved.splice(i, 1);
                    localStorage.setItem("infoSaved", JSON.stringify(infoSaved));
                    
                    $.when(callInfoApi(e.target.id)).done(a1=>{
                        console.log(a1);
                    })
                    flag = true;
                    break;
                    }
                }
                //checking if info card never been called, create a new info card and saving it
                if(!flag){
                $(`div#${e.target.id}`).append(progress);
                $.when(callInfoApi(e.target.id)).done(a1 =>{
                    console.log(a1);
                })
            
            }
        }
        //getting here if card height is not normal, that means more info is open and users wants to close it
            else{
                const card_div = $(`div#${e.target.id}-info`)[0].parentElement;
                card_div.removeChild(card_div.lastChild);     
            }
        });
    })
            
}

//function for creating a window for chenging coins when user turns ON a toggle for saving coin and list if full
const changeSavedCoin = (coinsSaved) =>{

    const windowDiv = document.createElement("div");
    windowDiv.id = "remove-window";

    const h2 = document.createElement("h2");
    h2.append("list is full, pick a coin you want to replace:");
    windowDiv.append(h2);

    const changeBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");

       

    //creating a name and remove button for each saved coin in list
    coinsSaved.forEach((coin, id)=>{

        //last index(6) is the new coin the user want to save
        if(id != 5){
            let coinDiv = document.createElement("div");
            coinDiv.id = `remove-${coin}`;
            coinDiv.className = "coin-remove";

            let coinName = document.createElement("p");
            coinName.className = "remove-coin-name";
            coinName.append(coin);
            
            let removeBtn = document.createElement("button");
            removeBtn.className = "btn btn-danger remove-btn";
            removeBtn.innerHTML = "Remove";
            removeBtn.id = `remove-${coin}`;

            coinDiv.append(coinName);
            coinDiv.append(removeBtn);

            windowDiv.append(coinDiv);
            }
        });
        
        changeBtn.className = "btn btn-success";
        changeBtn.innerHTML = "Change";
        changeBtn.addEventListener("click", (e)=>{

            //if user press on change button but he didnt remove an existing coin, cant push new coin because list is still full
            if($(".remove-coin-name").length === 5)
              alert("cant replace, please remove one coin");

            //user pressing the change button and he removed at least one button or more
            else{
                GlobalcoinsSaved = []
                //getting the coins that user didnt remove and entering them again to array
              $(".remove-coin-name").each((i, obj)=>{
                GlobalcoinsSaved.push(obj.innerHTML);
              })
              //after getting all the coins that user didnt remove, enter the new coin to saved coins array and save to localStorage
              GlobalcoinsSaved.push(coinsSaved[5]);
              localStorage.setItem("coinsSaved", JSON.stringify(GlobalcoinsSaved));
              showAllCrypto("all");
            }
        });

        cancelBtn.className = "btn btn-primary";
        cancelBtn.innerHTML = "Cancel";
        cancelBtn.addEventListener("click", ()=>{
            coinsSaved.pop();
            showAllCrypto("all");
        });

        windowDiv.append(changeBtn);
        windowDiv.append(cancelBtn);
        $("#cardsContainer").html("");
        $("#cardsContainer").append(windowDiv);

        $(".remove-btn").each((i, obj)=>{
            obj.addEventListener("click", (e)=>{
                const removeParent = e.target.parentElement;
                document.getElementById("remove-window").removeChild(removeParent);                
            })
        });
    }

  

    
//function for activating the api for getting specific coin when clicking on more info on a coin card
const callInfoApi = (id) =>{
    return $.ajax({
        type: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/${id}`,
        dataType: 'json',
        success: (result, status, xhr)=>{
            infoSaved.push({result:result, time: new Date().getTime()});
            localStorage.setItem("infoSaved", JSON.stringify(infoSaved));
            buildInfoCard(result);
        },
        error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
}

//function for bulding the info card when clicking on showing more on each coin card
const buildInfoCard = (result) =>{
    
    const infoCard = document.createElement("div");
    infoCard.className = `card card-body info`;
    infoCard.id = `${result.id}-info`;

    // check if code got here from callInfoApi function and a progress bar been created for waiting, if so remove it
    if(document.getElementsByClassName("progress").length != 0)
    document.getElementById(`${result.id}`).removeChild(document.getElementsByClassName("progress")[0]);

    $(`div#${result.id}`).append(infoCard);

    const img = document.createElement("img");
    img.src = result.image.thumb;
    img.className = "coin-img";

    const usd_price = document.createElement("p");
    usd_price.append(`${result.market_data.current_price.usd}$`);

    const eur_price = document.createElement("p");
    eur_price.append(`${result.market_data.current_price.eur}€`);

    const ils_price = document.createElement("p");
    ils_price.append(`${result.market_data.current_price.ils}₪`);
    $(`#${result.id}-info`).append(img, usd_price, eur_price, ils_price);  
}