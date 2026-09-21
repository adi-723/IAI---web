import "./Hero.css";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Button from "../UI/Button/Button";

import { useLanguage } from "../../context/LanguageContext";

const slides = [

    "/images/hero/hero1.png",

    "/images/hero/hero2.png",

    "/images/hero/hero3.png",

    "/images/hero/hero4.png"

];

function Hero() {

    const { t } = useLanguage();

    const [current, setCurrent] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrent((prev) => (prev + 1) % slides.length);

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    return (

        <section

            className="hero"

            style={{

                backgroundImage: `url(${slides[current]})`

            }}

        >

            <div className="hero-overlay">

                <div className="hero-content">

                    <span>

                        {t.hero.badge}

                    </span>

                    <h1>

                        {t.hero.title}

                    </h1>

                    <p>

                        {t.hero.description}

                    </p>

                    <Link to="/investigaciones">

                        <Button>

                            {t.hero.button}

                        </Button>

                    </Link>

                    <div className="hero-indicators">

                        {

                            slides.map((_, index) => (

                                <span

                                    key={index}

                                    className={

                                        index === current

                                            ? "active"

                                            : ""

                                    }

                                />

                            ))

                        }

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Hero;