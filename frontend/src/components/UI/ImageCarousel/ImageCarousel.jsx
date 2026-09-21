import { useEffect, useState } from "react";

import "./ImageCarousel.css";

function ImageCarousel({

    images = [],

    height = "400px",

    interval = 5000

}){

    const [current,setCurrent]=useState(0);

    const [paused,setPaused]=useState(false);

    useEffect(()=>{

        if(images.length<=1 || paused) return;

        const timer=setInterval(()=>{

            nextSlide();

        },interval);

        return()=>clearInterval(timer);

    },[current,paused]);

    function nextSlide(){

        setCurrent(prev=>

            (prev+1)%images.length

        );

    }

    function previousSlide(){

        setCurrent(prev=>

            prev===0

            ? images.length-1

            : prev-1

        );

    }

    return(

        <div

            className="image-carousel"

            style={{height}}

            onMouseEnter={()=>setPaused(true)}

            onMouseLeave={()=>setPaused(false)}

        >

            <img

                key={current}

                src={images[current]}

                alt=""

                className="carousel-image"

            />

            <button

                className="carousel-button left"

                onClick={previousSlide}

            >

                ❮

            </button>

            <button

                className="carousel-button right"

                onClick={nextSlide}

            >

                ❯

            </button>

            <div className="carousel-dots">

                {

                    images.map((_,index)=>(

                        <span

                            key={index}

                            onClick={()=>setCurrent(index)}

                            className={

                                current===index

                                ? "active"

                                : ""

                            }

                        />

                    ))

                }

            </div>

        </div>

    );

}

export default ImageCarousel;