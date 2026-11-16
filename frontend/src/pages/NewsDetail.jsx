import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./NewsDetail.css";

function NewsDetail() {
    const { id } = useParams();
    const { language } = useLanguage();

    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchNews() {
            setLoading(true);
            setError(false);
            setNews(null);

            try {
                const response = await fetch(
                    `http://localhost:5000/api/news/getOne.php?id=${encodeURIComponent(id)}&language=${language}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("No se pudo obtener la noticia.");
                }

                const data = await response.json();

                // Algunos endpoints devuelven directamente el objeto;
                // otros pueden envolverlo en una propiedad "news".
                const item = data.news ?? data;

                if (!item || !item.id || !item.title) {
                    throw new Error("La noticia no existe.");
                }

                setNews(item);
            } catch (err) {
                if (err.name === "AbortError") return;

                console.error("Error cargando noticia:", err);
                setError(true);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchNews();

        return () => controller.abort();
    }, [id, language]);

    const text = language === "en"
        ? {
            back: "← Back to news",
            loading: "Loading article...",
            error: "Could not load this article.",
            missing: "Article not found."
        }
        : {
            back: "← Volver a noticias",
            loading: "Cargando noticia...",
            error: "No se pudo cargar esta noticia.",
            missing: "No se encontró la noticia."
        };

    return (
        <main className="news-detail">
            <div className="news-detail-container">
                <Link to="/noticias" className="news-detail-back">
                    {text.back}
                </Link>

                {loading && (
                    <p className="news-detail-status">{text.loading}</p>
                )}

                {!loading && error && (
                    <p className="news-detail-status">{text.error}</p>
                )}

                {!loading && !error && news && (
                    <article>
                        {news.image && (
                            <img
                                className="news-detail-image"
                                src={news.image}
                                alt={news.title}
                            />
                        )}

                        <p className="news-detail-date">
                            {news.publish_date}
                        </p>

                        <h1>{news.title}</h1>

                        {news.summary && (
                            <p className="news-detail-summary">
                                {news.summary}
                            </p>
                        )}

                        <div className="news-detail-content">
                            {news.content
                                ? news.content.split(/\r?\n/).map((paragraph, index) =>
                                    paragraph.trim() ? (
                                        <p key={index}>{paragraph}</p>
                                    ) : null
                                )
                                : <p>{text.missing}</p>
                            }
                        </div>
                    </article>
                )}
            </div>
        </main>
    );
}

export default NewsDetail;