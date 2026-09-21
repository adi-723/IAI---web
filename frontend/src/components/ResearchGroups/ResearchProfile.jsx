import "./ResearchProfile.css";

import { useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

import Container from "../UI/Container/Container";
import Card from "../UI/Card/Card";
import researchGroups from "../../data/researchGroups";
import investigators from "../../data/investigators";

function ResearchProfile() {

    const { t } = useLanguage();

    const { slug } = useParams();

    const research = researchGroups.find(

        group => group.slug === slug

    );

    if (!research) {

        return (

            <Container>

                <h2>

                    {t.research.noResearch}

                </h2>

            </Container>

        );

    }

    const members = investigators.filter(

        investigator =>

            research.investigators.includes(

                investigator.slug

            )

    );

    return (

        <Container>

            <section className="research-profile">

                <img

                    className="research-banner"

                    src={research.image}

                    alt={research.name}

                />

                <h1>

                    {research.name}

                </h1>

                <p className="research-description">

                    {research.description}

                </p>

                <div className="profile-section">

                    <h2>

                        {t.research.members}

                    </h2>

                    <div className="research-members">

                        {

                            members.map(member => (

                                <Card

                                    key={member.id}

                                    className="member-card"

                                >

                                    <img

                                        src={member.image}

                                        alt={member.name}

                                    />

                                    <h3>

                                        {member.name}

                                    </h3>

                                    <p>

                                        {member.degree}

                                    </p>

                                </Card>

                            ))

                        }

                    </div>

                </div>

                <div className="profile-section">

                    <h2>

                        {t.research.publications}

                    </h2>

                    <Card>

                        <p>

                            {t.research.comingSoon}

                        </p>

                    </Card>

                </div>

            </section>

        </Container>

    );

}

export default ResearchProfile;