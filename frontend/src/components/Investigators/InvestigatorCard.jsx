import "./InvestigatorCard.css";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

import { Link } from "react-router-dom";

function InvestigatorCard({
    id,
    slug,
    name,
    degree,
    area,
    image,
    summary,
    scholar
}) {

    return (

        <Card className="investigator-card">

            <div className="investigator-photo">
                <img
                    src={image}
                    alt={name}
                />
            </div>

            <div className="investigator-info">

                <h3>
                    {name}
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

                    <a
                        href={scholar}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button variant="secondary">
                            Google Scholar
                        </Button>
                    </a>

                    <Link to={`/investigadores/${slug}`}>
                        <Button variant="ghost">
                            Ver perfil →
                        </Button>
                    </Link>

                </div>

            </div>

        </Card>

    );
}

export default InvestigatorCard;