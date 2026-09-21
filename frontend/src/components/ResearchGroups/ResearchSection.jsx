import "./ResearchSection.css";

import Container from "../UI/Container/Container";
import ResearchCard from "./ResearchCard";
import researchGroups from "../../data/researchGroups";

import { useLanguage } from "../../context/LanguageContext";

function ResearchSection(){

    const { t } = useLanguage();

    return(

        <section className="research-section">

            <Container>

                <div className="section-header">

                    <h2>

                        {t.research.title}

                    </h2>

                    <p>

                        {t.research.subtitle}

                    </p>

                </div>

                <div className="research-grid">

                    {

                        researchGroups.map(group => (

                            <ResearchCard

                                key={group.id}

                                {...group}

                            />

                        ))

                    }

                </div>

            </Container>

        </section>

    );

}

export default ResearchSection;