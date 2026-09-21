import "./StatisticsSection.css";

import Container from "../UI/Container/Container";

import { useLanguage } from "../../context/LanguageContext";

function StatisticsSection() {

    const { t } = useLanguage();

    const stats = [

        {
            value: "38",
            label: t.home.statistics.researchers,
            icon: "👨‍🔬"
        },

        {
            value: "524",
            label: t.home.statistics.papers,
            icon: "📄"
        },

        {
            value: "17",
            label: t.home.statistics.projects,
            icon: "🚀"
        },

        {
            value: "11",
            label: t.home.statistics.collaborations,
            icon: "🌎"
        }

    ];

    return (

        <section className="statistics-section">

            <Container>

                <div className="statistics-header">

                    <h2>

                        {t.home.statistics.title}

                    </h2>

                    <p>

                        {t.home.statistics.description}

                    </p>

                </div>

                <div className="statistics-grid">

                    {stats.map((stat) => (

                        <div
                            key={stat.label}
                            className="stat-card"
                        >

                            <div className="stat-icon">

                                {stat.icon}

                            </div>

                            <h3>

                                {stat.value}

                            </h3>

                            <p>

                                {stat.label}

                            </p>

                        </div>

                    ))}

                </div>

            </Container>

        </section>

    );

}

export default StatisticsSection;