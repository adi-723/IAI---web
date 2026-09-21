import Container from "../UI/Container/Container";
import "./PaperHeader.css";

import { useLanguage } from "../../context/LanguageContext";

function PaperHeader() {

    const { t } = useLanguage();

    return (

        <section className="paper-header-page">

            <Container>

                <h1>

                    {t.papers.pageTitle}

                </h1>

                <p>

                    {t.papers.pageSubtitle}

                </p>

            </Container>

        </section>

    );

}

export default PaperHeader;