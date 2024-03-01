import React from 'react'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'
import { useSelector } from 'react-redux'

const Carousele = () => {
    const {carousel}=useSelector((state)=>state.catagories)
    /*var items = [
        {
            id:1,
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            src:"https://res.cloudinary.com/dav142uln/image/upload/v1708506381/sxd8gahgi80ch14cfmui.jpg"
        },
        {
            id:2,
            name: "Random Name #2",
            description: "Hello World!",
            src:"http://random.com/two",

        }
    ]*/
  return (
    <Carousel>
    {
        carousel.map( (item, i) => <CarouselItem key={item.id} item={item} /> )
    }
    </Carousel>
  )
}

export default Carousele