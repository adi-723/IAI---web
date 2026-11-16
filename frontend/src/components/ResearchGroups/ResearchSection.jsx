
import { useEffect, useState } from "react";

import "./ResearchSection.css";

import Container from "../UI/Container/Container";
import ResearchCard from "./ResearchCard";

import { useLanguage } from "../../context/LanguageContext";
import { get } from "../../services/api";

function ResearchSection() {
    const { t, language } = useLanguage();

    const [researchGroups, setResearchGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let active = true;

        async function loadResearchGroups() {
            try {
                setLoading(true);
                setError(false);

                const response = await get(
                    `/research/getAll.php?language=${language}`
                );

                if (!active) return;

                if (response?.success === false) {
                    throw new Error(response.message);
                }

                const groups = response?.data ?? response;

                if (!Array.isArray(groups)) {
                    throw new Error("Invalid API response");
                }

                setResearchGroups(groups);

            } catch (err) {
                console.error(
                    "Error al cargar grupos de investigación:",
                    err
                );

                if (active) {
                    setError(true);
                    setResearchGroups([]);
                }

            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadResearchGroups();

        return () => {
            active = false;
        };

    }, [language]);

    return (
        <section className="research-section">
            <Container>

                <div className="section-header">
                    <h2>{t.research.title}</h2>
                    <p>{t.research.subtitle}</p>
                </div>

                {loading && (
                    <p className="research-message">
                        {t.research.loading}
                    </p>
                )}

                {!loading && error && (
                    <p className="research-message">
                        {t.research.loadError}
                    </p>
                )}

                {!loading && !error && researchGroups.length === 0 && (
                    <p className="research-message">
                        {t.research.noResearch}
                    </p>
                )}

                {!loading && !error && researchGroups.length > 0 && (
                    <div className="research-grid">
                        {researchGroups.map((group) => (
                            <ResearchCard
                                key={group.id}
                                {...group}
                            />
                        ))}
                    </div>
                )}

            </Container>
        </section>
    );
}

export default ResearchSection;
