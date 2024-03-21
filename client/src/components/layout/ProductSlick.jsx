import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductSlick.css';
import Product from './Product';


const ProductSlick = ({prod}) => {
  const [key, setKey] = useState(0);

  // Use useEffect to force a re-render when prod changes
  useEffect(() => {
    // Update the key to trigger a re-render
    setKey((prevKey) => prevKey + 1);
  }, [prod]);
  
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      };

 

  return (
    <div className="product-list">
      <Slider key={key} {...settings}>
      {prod&&prod.map((p)=>(<Product key={p._id} product={p}/>))}
      </Slider>
    </div>
  );
};

export default ProductSlick;