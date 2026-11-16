import { useEffect, useState } from "react";

import "./PaperProfile.css";

import { useParams } from "react-router-dom";

import Container from "../UI/Container/Container";
import Card from "../UI/Card/Card";

import { useLanguage } from "../../context/LanguageContext";


function PaperProfile() {

    const { id } = useParams();

    const { language, t } = useLanguage();


    const [paper, setPaper] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    useEffect(() => {

        const loadPaper = async () => {

            try {

                setLoading(true);

                setError(null);


                const response = await fetch(
                    `http://localhost:5000/api/papers/getOne.php?id=${id}&language=${language}`
                );


                if (!response.ok) {

                    if (response.status === 404) {

                        throw new Error(
                            t.papers.notFound
                        );

                    }


                    throw new Error(
                        t.papers.couldNotLoad
                    );

                }


                const data = await response.json();


                setPaper(data);


            } catch (error) {

                console.error(
                    "Error al cargar paper:",
                    error
                );


                setError(error.message);


            } finally {

                setLoading(false);

            }

        };


        loadPaper();

    }, [id, language, t.papers.notFound, t.papers.couldNotLoad]);


    if (loading) {

        return (

            <Container>

                <p>
                    {t.papers.loading}
                </p>

            </Container>

        );

    }


    if (error || !paper) {

        return (

            <Container>

                <h2>
                    {error || t.papers.notFound}
                </h2>

            </Container>

        );

    }


    return (

        <Container>

            <section className="paper-profile">


                {paper.image && (

                    <img

                        className="paper-banner"

                        src={paper.image}

                        alt={paper.title}

                    />

                )}


                <h1>
                    {paper.title}
                </h1>


                <p className="paper-summary">

                    {paper.abstract}

                </p>


                <Card>

                    <h2>
                        {t.papers.abstract}
                    </h2>

                    <p>
                        {paper.abstract}
                    </p>

                </Card>


                {paper.authors &&
                    paper.authors.length > 0 && (

                    <Card>

                        <h2>
                            {t.papers.authors}
                        </h2>


                        <ul>

                            {paper.authors.map((author) => (

                                <li key={author.id}>

                                    {author.name}

                                </li>

                            ))}

                        </ul>

                    </Card>

                )}


                {paper.journal && (

                    <p>

                        <strong>
                            {t.papers.journal}:
                        </strong>{" "}

                        {paper.journal}

                    </p>

                )}


                {paper.publication_date && (

                    <p>

                        <strong>
                            {t.papers.date}:
                        </strong>{" "}

                        {paper.publication_date}

                    </p>

                )}


                {paper.doi && (

                    <p>

                        <strong>
                            {t.papers.doi}:
                        </strong>{" "}

                        <a
                            href={paper.doi}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {paper.doi}
                        </a>

                    </p>

                )}


                {paper.pdf && (

                    <p>

                        <a
                            href={paper.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t.papers.pdf}
                        </a>

                    </p>

                )}

            </section>

        </Container>

    );

}


export default PaperProfile;