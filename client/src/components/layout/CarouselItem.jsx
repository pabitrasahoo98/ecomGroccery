import React from 'react'
import "../../pages/home.css"
import { Paper} from '@mui/material'
import { Link } from 'react-router-dom'

const CarouselItem = (items) => {
  return (
    <Paper>
            <img src={items.item.carouselLink} alt="pks" style={{width:"100%",height:"45vh",}}></img>

            <Link to="/products" className="CheckButton">
                View Products!!!
            </Link>
        </Paper>
  ) 
}

export default CarouselItem