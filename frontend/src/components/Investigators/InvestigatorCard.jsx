
import "./InvestigatorCard.css";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

import { Link } from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";

import investigatorsES from "../../translations/es/investigators";
import investigatorsEN from "../../translations/en/investigators";

function InvestigatorCard({
    id,
    slug,
    name,
    last_name,
    degree,
    area,
    image,
    summary,
    scholar
}) {
    const { language } = useLanguage();

    const t = language === "es"
        ? investigatorsES
        : investigatorsEN;

    const fullName = [name, last_name]
        .filter(Boolean)
        .join(" ");

    return (
        <Card className="investigator-card">

            <div className="investigator-photo">
                <img
                    src={image}
                    alt={fullName}
                />
            </div>

            <div className="investigator-info">

                <h3>
                    {fullName}
                </h3>

                <span>
                    {degree}
                </span>

                <h4>
                    {area}
                </h4>

                <p>
                    {summary}
                </p>

                <div className="investigator-buttons">

                    {scholar && (
                        <a
                            href={scholar}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Button variant="secondary">
                                {t.scholar}
                            </Button>
                        </a>
                    )}

                    <Link to={`/investigadores/${slug}`}>
                        <Button variant="ghost">
                            {t.profile} →
                        </Button>
                    </Link>

                </div>

            </div>

        </Card>
    );
}

export default InvestigatorCard;
