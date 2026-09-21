import "./PaperCard.css";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";

function PaperCard({

    id,

    title,

    summary,

    image

}){
    const { t } = useLanguage();

    return(

        <Card className="paper-card">

            <div className="paper-image">

                {image}

            </div>

            <div className="paper-content">

                <h3>

                    {title}

                </h3>

                <p>

                    {summary}

                </p>

                <Link to={`/papers/${id}`}>

                    <Button variant="ghost">

                        {t.papers.readMore} →

                    </Button>

                </Link>

            </div>

        </Card>

    );

}

export default PaperCard;