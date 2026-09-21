import "./AboutSection.css";

import ImageCarousel from "../UI/ImageCarousel/ImageCarousel";
import Container from "../UI/Container/Container";

import { useLanguage } from "../../context/LanguageContext";

function AboutSection() {

    const { t } = useLanguage();
    console.log(t);

    return (

        <section className="about-section">

    <Container>

        <div className="about-content">

            <div className="about-text">

                <span className="section-tag">

                    {t.home.about.tag}

                </span>

                <h2>

                    {t.home.about.title}

                </h2>

                <p>

                    {t.home.about.paragraph1}
                </p>

                <p>

                    {t.home.about.paragraph2}

                </p>

            </div>

            <ImageCarousel

                height="350px"

                images={[

                    "/images/about/about1.png",

                    "/images/about/about2.png",

                    "/images/about/about3.png",

                    "/images/about/about4.png"

                ]}

            />

        </div>

    </Container>

</section>

    );

}

export default AboutSection;