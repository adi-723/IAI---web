import "./ValuesSection.css";

import Container from "../UI/Container/Container";
import Card from "../UI/Card/Card";

import { useLanguage } from "../../context/LanguageContext";

function ValuesSection() {

    const { t } = useLanguage();

    const values = [

        {

            icon: "🧠",

            title: t.home.values.innovation.title,

            description: t.home.values.innovation.text

        },

        {

            icon: "🤝",

            title: t.home.values.collaboration.title,

            description: t.home.values.collaboration.text

        },

        {

            icon: "🌎",

            title: t.home.values.impact.title,

            description: t.home.values.impact.text

        },

        {

            icon: "🔬",

            title: t.home.values.excellence.title,

            description: t.home.values.excellence.text

        }

    ];

    return (

        <section className="values-section">

            <Container>

                <div className="values-header">

                    <h2>

                        {t.home.values.title}

                    </h2>

                    <p>

                        {t.home.values.description}

                    </p>

                </div>

                <div className="values-grid">

                    {values.map((value) => (

                        <Card

                            key={value.title}

                            className="value-card"

                        >

                            <div className="value-icon">

                                {value.icon}

                            </div>

                            <h3>

                                {value.title}

                            </h3>

                            <p>

                                {value.description}

                            </p>

                        </Card>

                    ))}

                </div>

            </Container>

        </section>

    );

}

export default ValuesSection;