import { useEffect, useState } from "react";

import "./NewsSection.css";

import { useLanguage } from "../../context/LanguageContext";

import newsES from "../../translations/es/news";
import newsEN from "../../translations/en/news";


function NewsSection() {

    // ------------------------------------------------
    // IDIOMA
    // ------------------------------------------------

    const { language } = useLanguage();


    // Seleccionamos las traducciones correspondientes

    const t =
        language === "es"
            ? newsES
            : newsEN;


    // ------------------------------------------------
    // ESTADOS
    // ------------------------------------------------

    const [news, setNews] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    // ------------------------------------------------
    // TEXTOS QUE TODAVÍA NO ESTÁN
    // EN LOS ARCHIVOS DE TRADUCCIÓN
    // ------------------------------------------------

    const messages = {

        es: {
            loading: "Cargando noticias...",
            loadError: "No se pudieron cargar las noticias.",
            noNews: "No hay noticias disponibles."
        },

        en: {
            loading: "Loading news...",
            loadError: "The news could not be loaded.",
            noNews: "No news available."
        }

    };


    const message = messages[language];


    // ------------------------------------------------
    // OBTENER NOTICIAS
    // ------------------------------------------------

    useEffect(() => {

        setLoading(true);

        setError(null);


        fetch(
            `http://localhost:5000/api/news/getAll.php?language=${language}`
        )

            .then((response) => {

                if (!response.ok) {

                    throw new Error(
                        message.loadError
                    );

                }

                return response.json();

            })

            .then((data) => {

                setNews(data);

            })

            .catch((error) => {

                console.error(error);

                setError(
                    message.loadError
                );

            })

            .finally(() => {

                setLoading(false);

            });

    }, [language]);


    // ------------------------------------------------
    // CARGANDO
    // ------------------------------------------------

    if (loading) {

        return (

            <section className="news">

                <h2>
                    {t.title}
                </h2>

                <p>
                    {message.loading}
                </p>

            </section>

        );

    }


    // ------------------------------------------------
    // ERROR
    // ------------------------------------------------

    if (error) {

        return (

            <section className="news">

                <h2>
                    {t.title}
                </h2>

                <p>
                    {error}
                </p>

            </section>

        );

    }


    // ------------------------------------------------
    // NOTICIAS
    // ------------------------------------------------

    return (

        <section className="news">

            <h2>
                {t.title}
            </h2>


            <p>
                {t.subtitle}
            </p>


            {news.length === 0 ? (

                <p>
                    {message.noNews}
                </p>

            ) : (

                <div className="news-list">

                    {news.map((item) => (

                        <article
                            className="news-card"
                            key={item.id}
                        >

                            <img
                                src={item.image}
                                alt={item.title}
                            />


                            <div className="news-card-content">

                                <p className="news-date">
                                    {item.publish_date}
                                </p>


                                <h3>
                                    {item.title}
                                </h3>


                                <p>
                                    {item.summary}
                                </p>


                                <button>
                                    {t.button}
                                </button>

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </section>

    );

}


export default NewsSection;