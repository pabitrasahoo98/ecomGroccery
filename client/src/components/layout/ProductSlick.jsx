import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductSlick.css';
import Product from './Product';


const ProductSlick = ({prod}) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
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
      <Slider {...settings}>
      {prod&&prod.map(p=>(<Product product={p}/>))}
      </Slider>
    </div>
  );
};

export default ProductSlick;