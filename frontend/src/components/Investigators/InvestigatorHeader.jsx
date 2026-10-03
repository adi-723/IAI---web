import "./InvestigatorHeader.css";

import Container from "../UI/Container/Container";

import { useLanguage } from "../../context/LanguageContext";

import investigatorsES from "../../translations/es/investigators";
import investigatorsEN from "../../translations/en/investigators";


function InvestigatorHeader() {

    const { language } = useLanguage();


    const t =
        language === "es"
            ? investigatorsES
            : investigatorsEN;


    return (

        <section className="investigator-header">

            <Container>

                <h1>
                    {t.title}
                </h1>

                <p>
                    {t.subtitle}
                </p>

            </Container>

        </section>

    );

}


export default InvestigatorHeader;