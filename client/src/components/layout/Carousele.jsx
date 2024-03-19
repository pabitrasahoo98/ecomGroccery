import React from 'react'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'
import { useSelector } from 'react-redux'

const Carousele = () => {
    const {carousel}=useSelector((state)=>state.catagories)
   
  return (
    <Carousel>
    {
        carousel.map( (item, i) => <CarouselItem key={i} item={item} /> )
    }
    </Carousel>
  )
}

export default Carousele