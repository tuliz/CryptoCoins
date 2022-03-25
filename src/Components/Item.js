import styled from '@emotion/styled';
import {Card, CardMedia} from '@mui/material';

const Div = styled.div`
display:inline-flex;
margin:10px;
 .Card{
        background-color: #F1F1F1;
        margin: 1%;
        padding: 0.3rem;
        width: 15vw;
        height: 50vh;
    }
    .cardHeader{
        display: flex; 
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
    .cardDate{
        display: flex; 
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .Image{
    }
`;

const Item = (props)=>{
    return(
        <Div>
        <Card className='Card'>
            <p className='cardHeader'>{props.day || props.cityname}</p>
            <p className='cardDate'>{props.date}</p>
            <CardMedia className='Image'
            image = {require(`../images/${props.img}.png`)} alt='rain'
            title = 'img'
            style={{ paddingTop: '56%' }}

            />

            <p className='degrees'>{props.degrees}</p>
            <p className='weather'>{props.weather}</p>
        </Card>
        </Div>
    );
}

export default Item;