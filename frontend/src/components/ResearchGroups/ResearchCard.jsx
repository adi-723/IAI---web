import "./ResearchCard.css";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

function ResearchCard({

    slug,

    name,

    image,

    summary,

    investigators,

    papers

}){
    const { t } = useLanguage();

    return(

        <Card className="research-card">

            <div className="research-image">

                <img

                    src={image}

                    alt={name}

                />

            </div>

            <div className="research-info">

                <h3>

                    {name}

                </h3>

                <p>

                    {summary}

                </p>

                <div className="research-stats">

                    <span>

                        👨‍🔬 {investigators.length} {t.research.researchers}

                    </span>

                    <span>

                        📄 {papers.length} {t.research.papers}

                    </span>

                </div>

                <Link to={`/investigaciones/${slug}`}>

                    <Button>

                        {t.research.explore}

                    </Button>

                </Link>

            </div>

        </Card>

    );

}

export default ResearchCard;