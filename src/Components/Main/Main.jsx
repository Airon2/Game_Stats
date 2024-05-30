import Sample from "./PopularGames";
import styles from './Main.module.css'
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

let Main = ()=>{
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };


    return(
        <div className={styles.Main}>
            <div className={styles.Main_wrapper}>
                <div className="slider">
                    <h1 className={styles.slider_text}>ПОПУЛЯРНЫЕ ИГРЫ</h1>
                    <div className={styles.slider_wrapper}>
                    <Slider {...settings}>
                      <div>
                        <img className={styles.Slider_img} src="./images/contor.jpg"/>
                      </div>
                      <div>
                        <img className={styles.Slider_img} src="./images/cal.jpg"/>
                      </div>
                      <div>
                        <img className={styles.Slider_img} src="./images/dota.jpg" />
                      </div>
                      <div>
                        <img className={styles.Slider_img} src="./images/fortnite.jpg"/>
                      </div>
                      <div>
                        <img className={styles.Slider_img} src="./images/valorant.jpg" />
                      </div>
                      <div>
                        <img className={styles.Slider_img} src="./images/apex.jpg"/>
                      </div>
                    </Slider>
                    </div>
                    <div className={styles.Game_wrapper}>
                    <Sample/>
                    <Sample/>
                    <Sample/>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Main;