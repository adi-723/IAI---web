
import { useEffect, useState } from "react";
import "./NewsSection.css";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";
import newsES from "../../translations/es/news";
import newsEN from "../../translations/en/news";

function NewsSection() {
    const { language } = useLanguage();
    const t = language === "es" ? newsES : newsEN;
    const navigate = useNavigate();

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const messages = {
        es: {
            loading: "Cargando noticias...",
            loadError: "No se pudieron cargar las noticias.",
            noNews: "Todavía no hay noticias disponibles.",
            readMore: "Saber más",
            sectionLabel: "ACTUALIDAD DEL INSTITUTO"
        },
        en: {
            loading: "Loading news...",
            loadError: "The news could not be loaded.",
            noNews: "There are no news articles available yet.",
            readMore: "Read more",
            sectionLabel: "INSTITUTE NEWS"
        }
    };

    const message = messages[language] || messages.es;

    useEffect(() => {
        const controller = new AbortController();

        async function fetchNews() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `http://localhost:5000/api/news/getAll.php?language=${language}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(message.loadError);
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error(message.loadError);
                }

                setNews(data);
            } catch (err) {
                if (err.name === "AbortError") return;

                console.error("Error cargando noticias:", err);
                setError(message.loadError);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchNews();

        return () => controller.abort();
    }, [language]);

    return (
        <section className="news">
            <div className="news-container">
                <header className="news-heading">
                    <span className="news-eyebrow">
                        {message.sectionLabel}
                    </span>

                    <h2>{t.title}</h2>

                    <p className="news-subtitle">
                        {t.subtitle}
                    </p>

                    <div className="news-heading-line" />
                </header>

                {loading && (
                    <div className="news-status" role="status">
                        <span className="news-loader" />
                        <p>{message.loading}</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="news-status news-status-error">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && news.length === 0 && (
                    <div className="news-status">
                        <p>{message.noNews}</p>
                    </div>
                )}

                {!loading && !error && news.length > 0 && (
                    <div className="news-grid">
                        {news.map((item) => (
                            <article
                                className="news-card"
                                key={item.id}
                            >
                                <div className="news-card-image">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title || ""}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="news-image-placeholder">
                                            <span>IAI</span>
                                        </div>
                                    )}
                                </div>

                                <div className="news-card-content">
                                    <p className="news-date">
                                        <span className="news-date-dot" />
                                        {item.publish_date}
                                    </p>

                                    <h3 className="news-card-title">
                                        {item.title}
                                    </h3>

                                    <p className="news-card-summary">
                                        {item.summary}
                                    </p>

                                    <button
                                        type="button"
                                        className="news-read-more"
                                        onClick={() => navigate(`/noticias/${item.id}`)}
                                    >
                                        {t.button || message.readMore}
                                        <span aria-hidden="true">→</span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default NewsSection;
