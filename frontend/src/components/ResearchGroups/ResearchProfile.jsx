
import "./ResearchProfile.css";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";
import { get } from "../../services/api";

import Container from "../UI/Container/Container";
import Card from "../UI/Card/Card";

function ResearchProfile() {
    const { slug } = useParams();
    const { t, language } = useLanguage();

    const [research, setResearch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let active = true;

        async function loadResearch() {
            try {
                setLoading(true);
                setError(false);
                setResearch(null);

                const response = await get(
                    `/research/getOne.php?slug=${encodeURIComponent(slug)}&language=${language}`
                );

                if (response?.success === false) {
                    throw new Error(response.message);
                }

                const data = response?.data ?? response;

                if (!data || !data.id) {
                    throw new Error("Invalid research response");
                }

                if (active) {
                    setResearch(data);
                }

            } catch (err) {
                console.error("Error al cargar investigación:", err);

                if (active) {
                    setError(true);
                    setResearch(null);
                }

            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadResearch();

        return () => {
            active = false;
        };

    }, [slug, language]);

    if (loading) {
        return (
            <Container>
                <p className="research-message">
                    {t.research.loading}
                </p>
            </Container>
        );
    }

    if (error || !research) {
        return (
            <Container>
                <p className="research-message">
                    {error
                        ? t.research.loadError
                        : t.research.noResearch}
                </p>

                <Link to="/investigaciones">
                    {t.research.backToResearch}
                </Link>
            </Container>
        );
    }

    const investigators = research.investigators || [];
    const papers = research.papers || [];

    return (
        <Container>

            <section className="research-profile">

                {/* ENCABEZADO DEL ÁREA */}

                <div className="research-profile-header">

                    {research.image && (
                        <img
                            className="research-banner"
                            src={research.image}
                            alt={research.name}
                        />
                    )}

                    <div className="research-profile-heading">

                        <h1>{research.name}</h1>

                        <p className="research-description">
                            {research.description || research.summary}
                        </p>

                        <div className="research-profile-stats">

                            <span>
                                👨‍🔬 {investigators.length}{" "}
                                {t.research.researchers}
                            </span>

                            <span>
                                📄 {papers.length}{" "}
                                {t.research.papers}
                            </span>

                        </div>

                    </div>

                </div>

                {/* INVESTIGADORES */}

                <div className="profile-section">

                    <h2>{t.research.members}</h2>

                    {investigators.length === 0 ? (

                        <Card>
                            <p>{t.research.noMembers}</p>
                        </Card>

                    ) : (

                        <div className="research-members">

                            {investigators.map(member => (

                                <Link
                                    key={member.id}
                                    to={`/investigadores/${member.slug}`}
                                    className="research-member-link"
                                >

                                    <Card className="member-card">

                                        {member.image && (
                                            <img
                                                src={member.image}
                                                alt={`${member.name || ""} ${member.last_name || ""}`}
                                            />
                                        )}

                                        <h3>
                                            {member.name} {member.last_name}
                                        </h3>

                                        {member.degree && (
                                            <p>{member.degree}</p>
                                        )}

                                        <span>
                                            {t.research.viewProfile} →
                                        </span>

                                    </Card>

                                </Link>

                            ))}

                        </div>

                    )}

                </div>

                {/* PAPERS */}

                <div className="profile-section">

                    <h2>{t.research.publications}</h2>

                    {papers.length === 0 ? (

                        <Card>
                            <p>{t.research.noPapers}</p>
                        </Card>

                    ) : (

                        <div className="research-papers">

                            {papers.map(paper => (

                                <Card
                                    key={paper.id}
                                    className="research-paper-card"
                                >

                                    <div className="research-paper-content">

                                        <h3>
                                            {paper.title || t.research.untitledPaper}
                                        </h3>

                                        {paper.authors && (
                                            <p className="paper-authors">
                                                {paper.authors}
                                            </p>
                                        )}

                                        {paper.journal && (
                                            <p>{paper.journal}</p>
                                        )}

                                        {paper.publication_date && (
                                            <p>
                                                {paper.publication_date}
                                            </p>
                                        )}

                                        {paper.abstract && (
                                            <p className="paper-abstract">
                                                {paper.abstract}
                                            </p>
                                        )}

                                        <div className="paper-links">

                                            <Link to={`/papers/${paper.id}`}>
                                                {t.research.viewPaper} →
                                            </Link>

                                            {paper.pdf && (
                                                <a
                                                    href={paper.pdf}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {t.research.downloadPdf}
                                                </a>
                                            )}

                                            {paper.doi && (
                                                <a
                                                    href={
                                                        paper.doi.startsWith("http")
                                                            ? paper.doi
                                                            : `https://doi.org/${paper.doi}`
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    DOI
                                                </a>
                                            )}

                                        </div>

                                    </div>

                                </Card>

                            ))}

                        </div>

                    )}

                </div>

                <Link
                    to="/investigaciones"
                    className="research-back-link"
                >
                    ← {t.research.backToResearch}
                </Link>

            </section>

        </Container>
    );
}

export default ResearchProfile;