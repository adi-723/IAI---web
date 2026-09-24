import { useEffect, useState } from "react";
import "./NewsSection.css";

function NewsSection() {

    // Aquí guardaremos las noticias que vienen del backend
    const [news, setNews] = useState([]);

    // Indica si todavía estamos cargando las noticias
    const [loading, setLoading] = useState(true);

    // Guarda un posible mensaje de error
    const [error, setError] = useState(null);


    // Se ejecuta cuando el componente aparece
    useEffect(() => {

        fetch("http://localhost:5000/api/news/getAll.php")

            .then((response) => {

                // Si el servidor respondió con un error
                if (!response.ok) {

                    throw new Error(
                        "No se pudieron obtener las noticias."
                    );

                }

                // Convertimos la respuesta a JSON
                return response.json();

            })

            .then((data) => {

                // Guardamos las noticias
                setNews(data);

            })

            .catch((error) => {

                // Guardamos el error
                setError(error.message);

            })

            .finally(() => {

                // Terminó la petición
                setLoading(false);

            });

    }, []);


    // Mientras se cargan las noticias
    if (loading) {

        return (

            <section className="news">

                <h2>Noticias</h2>

                <p>
                    Cargando noticias...
                </p>

            </section>

        );

    }


    // Si ocurrió un error
    if (error) {

        return (

            <section className="news">

                <h2>Noticias</h2>

                <p>
                    {error}
                </p>

            </section>

        );

    }


    return (

        <section className="news">

            <h2>
                Noticias
            </h2>


            {news.length === 0 ? (

                <p>
                    No hay noticias disponibles.
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

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </section>

    );

}

export default NewsSection;