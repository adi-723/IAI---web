import "./PaperSection.css";

import Container from "../UI/Container/Container";
import Button from "../UI/Button/Button";
import PaperCard from "./PaperCard";

import papers from "../../data/papers";

import { useLanguage } from "../../context/LanguageContext";

function PaperSection() {

    const { t } = useLanguage();

    return (

        <section className="paper-section">

            <Container>

                <div className="paper-header">

                    <div>

                        <h2>

                            {t.papers.latest}

                        </h2>

                        <p>

                            {t.papers.latestDescription}

                        </p>

                    </div>

                    <Button variant="secondary">

                        {t.papers.viewAll}

                    </Button>

                </div>

                <div className="paper-grid">

                    {papers.map((paper)=>(

                        <PaperCard

                            key={paper.id}

                            id={paper.id}

                            title={paper.title}

                            summary={paper.summary}

                            image={paper.image}

                        />

                    ))}

                </div>

            </Container>

        </section>

    );

}

export default PaperSection;