import { useEffect, useState } from "react";

import "./PaperSection.css";

import Container from "../UI/Container/Container";
import Button from "../UI/Button/Button";
import PaperCard from "./PaperCard";

import { useLanguage } from "../../context/LanguageContext";


function PaperSection() {

    const { language, t } = useLanguage();

    const [papers, setPapers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    useEffect(() => {

        const loadPapers = async () => {

            try {

                setLoading(true);

                setError(null);


                const response = await fetch(
                    `http://localhost:5000/api/papers/getAll.php?language=${language}`
                );


                if (!response.ok) {

                    throw new Error(
                        t.papers.loadError
                    );

                }


                const data = await response.json();


                setPapers(data);


            } catch (error) {

                console.error(
                    "Error al cargar papers:",
                    error
                );


                setError(
                    t.papers.loadError
                );


            } finally {

                setLoading(false);

            }

        };


        loadPapers();

    }, [language, t.papers.loadError]);


    return (

        <section className="paper-section">

            <Container>

                <div className="paper-header">

                    <div>

                        <h2>
                            {t.papers.latest}
                        </h2>

                        <p>
                            {t.papers.latestDescription}
                        </p>

                    </div>


                    <Button variant="secondary">

                        {t.papers.viewAll}

                    </Button>

                </div>


                {loading && (

                    <p>
                        {t.papers.loadingPapers}
                    </p>

                )}


                {error && (

                    <p>
                        {error}
                    </p>

                )}


                {!loading &&
                    !error &&
                    papers.length === 0 && (

                        <p>
                            {t.papers.noPapers}
                        </p>

                    )}


                {!loading &&
                    !error &&
                    papers.length > 0 && (

                        <div className="paper-grid">

                            {papers.map((paper) => (

                                <PaperCard

                                    key={paper.id}

                                    id={paper.id}

                                    title={paper.title}

                                    summary={paper.abstract}

                                    image={paper.image}

                                />

                            ))}

                        </div>

                    )}

            </Container>

        </section>

    );

}


export default PaperSection;