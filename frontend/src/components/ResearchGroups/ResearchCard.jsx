
import "./ResearchCard.css";

import Card from "../UI/Card/Card";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

function ResearchCard({
    slug,
    name,
    image,
    summary,
    researchers_count = 0,
    papers_count = 0
}) {
    const { t } = useLanguage();

    return (
        <Link
            to={`/investigaciones/${slug}`}
            className="research-card-link"
        >
            <Card className="research-card">

                <div className="research-image">
                    <img
                        src={image}
                        alt={name}
                    />
                </div>

                <div className="research-info">

                    <h3>{name}</h3>

                    <p>{summary}</p>

                    <div className="research-stats">

                        <span>
                            👨‍🔬 {researchers_count} {t.research.researchers}
                        </span>

                        <span>
                            📄 {papers_count} {t.research.papers}
                        </span>

                    </div>

                    <span className="research-explore">
                        {t.research.explore} →
                    </span>

                </div>

            </Card>
        </Link>
    );
}

export default ResearchCard;