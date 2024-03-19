import React, { useRef} from 'react';
import Slider from "react-slick";
import './CatSlider.css';
import { useSelector } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CatSlider = () => {
    const itemBg = [
        '#fffceb',
        '#ecffec',
        '#feefea',
        '#fff3eb',
        '#fff3ff',
        '#f2fce4',
        '#feefea',
        '#fffceb',
        '#feefea',
        '#ecffec',
        '#feefea',
        '#fff3eb',
        '#fff3ff',
        '#f2fce4',
        '#feefea',
        '#fffceb',
        '#feefea',
        '#ecffec',
        '#f2fce4',
        '#feefea',
        '#fffceb',
        '#feefea',
        '#ecffec',
        '#feefea',
        '#fff3eb',
        '#fff3ff',
        '#f2fce4',
        '#feefea',
        '#fffceb',
        '#feefea',
        '#ecffec'
    ];

    const { catalog } = useSelector((state) => state.catagories);
    const sliderRef = useRef(null);

    const CustomNextArrow = (props) => (
        <div {...props} className="slick-arrow custom-next-arrow">
            Next
        </div>
    );

    const CustomPrevArrow = (props) => (
        <div {...props} className="slick-arrow custom-prev-arrow">
            Previous
        </div>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: calculateSlidesToShow(),
        slidesToScroll: 1,
        arrows: window.innerWidth > 992 ? true : false,
        autoplay: window.innerWidth > 200 ? 2000 : false,
        centerMode: window.innerWidth > 992 ? true : false,

        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    function calculateSlidesToShow() {
        return window.innerWidth < 600 ? 2 : 5;
    }

    return (
        <>
            <div className="category-slider-container">
                <Slider ref={sliderRef} {...settings} className="category-slider">
                    {catalog.map((item, index) => (
                        <div key={index}>
                            <Link to={`/products/category/${item.catagory}`}>
                                <Grid container justifyContent="center">
                                    <Grid item xs={10} >
                                        <Card className="card" style={{ background: itemBg[index] }}>
                                            <CardMedia
                                                component="img"
                                                height="110"
                                                image={item.imgLink}
                                                alt={item.catagory}
                                                className="card-media"
                                            />
                                            <CardContent className="card-content">
                                                <Typography variant='subtitle2' className="category-name">{item.catagory}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
}

export default CatSlider;
