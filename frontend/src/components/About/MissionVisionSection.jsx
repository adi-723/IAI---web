import "./MissionVisionSection.css";

import Container from "../UI/Container/Container";
import Card from "../UI/Card/Card";

import { useLanguage } from "../../context/LanguageContext";

function MissionVisionSection() {

    const { t } = useLanguage();

    return (

        <section className="mission-section">

            <Container>

                <div className="mission-header">

                    <h2>

                        {t.home.mission.title}

                    </h2>

                    <p>

                        {t.home.mission.description}

                    </p>

                </div>

                <div className="mission-grid">

                    <Card className="mission-card">

                        <div className="mission-icon">

                            🎯

                        </div>

                        <h3>

                            {t.home.mission.missionTitle}

                        </h3>

                        <p>

                            {t.home.mission.missionText}

                        </p>

                    </Card>

                    <Card className="mission-card">

                        <div className="mission-icon">

                            🚀

                        </div>

                        <h3>

                            {t.home.mission.visionTitle}

                        </h3>

                        <p>

                            {t.home.mission.visionText}

                        </p>

                    </Card>

                </div>

            </Container>

        </section>

    );

}

export default MissionVisionSection;