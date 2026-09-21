import "./PaperProfile.css";

import { useParams } from "react-router-dom";

import Container from "../UI/Container/Container";
import Card from "../UI/Card/Card";

import papers from "../../data/papers";

import { useLanguage } from "../../context/LanguageContext";

function PaperProfile() {

    const { id } = useParams();

    const { t } = useLanguage();

    const paper = papers.find(

        paper => String(paper.id) === id

    );

    if (!paper) {

        return (

            <Container>

                <h2>

                    {t.papers.notFound}

                </h2>

            </Container>

        );

    }

    return (

        <Container>

            <section className="paper-profile">

                <img

                    className="paper-banner"

                    src={paper.image}

                    alt={paper.title}

                />

                <h1>

                    {paper.title}

                </h1>

                <p className="paper-summary">

                    {paper.summary}

                </p>

                <Card>

                    <h2>

                        {t.papers.abstract}

                    </h2>

                    <p>

                        {paper.description}

                    </p>

                </Card>

            </section>

        </Container>

    );

}

export default PaperProfile;