import "./InvestigatorProfile.css";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Container from "../UI/Container/Container";

import { get } from "../../services/api";


function InvestigatorProfile() {

    const { slug } = useParams();


    const [investigator, setInvestigator] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);


    /*
    |--------------------------------------------------------------------------
    | CARGAR INVESTIGADOR
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        async function loadInvestigator() {

            try {

                setLoading(true);

                setError(null);


                const data = await get(
                    `/investigators/${slug}?language=es`
                );


                setInvestigator(data);

            } catch (err) {

                console.error(
                    "Error al cargar investigador:",
                    err
                );

                setError(err.message);

            } finally {

                setLoading(false);

            }

        }


        if (slug) {

            loadInvestigator();

        }

    }, [slug]);


    /*
    |--------------------------------------------------------------------------
    | CARGANDO
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <Container>

                <h2>
                    Cargando investigador...
                </h2>

            </Container>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | ERROR
    |--------------------------------------------------------------------------
    */

    if (error || !investigator) {

        return (

            <Container>

                <h2>
                    Investigador no encontrado.
                </h2>

                {error && (

                    <p>
                        {error}
                    </p>

                )}

            </Container>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | PERFIL
    |--------------------------------------------------------------------------
    */

    return (

        <Container>

            <section className="investigator-profile">

                <Card>

                    <div className="profile-top">


                        <div className="profile-photo">

                            <img

                                src={investigator.image}

                                alt={investigator.name}

                            />

                        </div>


                        <div>

                            <h1>
                                {investigator.name}
                            </h1>


                            <h3>
                                {investigator.degree}
                            </h3>


                            {investigator.position && (

                                <p>

                                    <strong>
                                        Cargo:
                                    </strong>

                                    {" "}

                                    {investigator.position}

                                </p>

                            )}


                            {investigator.area && (

                                <p>

                                    Área de investigación:

                                    <strong>

                                        {" "}

                                        {investigator.area}

                                    </strong>

                                </p>

                            )}

                        </div>

                    </div>


                    {investigator.biography && (

                        <div className="profile-section">

                            <h2>
                                Biografía
                            </h2>


                            <p>
                                {investigator.biography}
                            </p>

                        </div>

                    )}


                    {investigator.interests &&
                        investigator.interests.length > 0 && (

                            <div className="profile-section">

                                <h2>
                                    Líneas de investigación
                                </h2>


                                <ul>

                                    {investigator.interests.map(
                                        (interest, index) => (

                                            <li key={index}>

                                                {interest}

                                            </li>

                                        )
                                    )}

                                </ul>

                            </div>

                        )}


                    {investigator.education &&
                        investigator.education.length > 0 && (

                            <div className="profile-section">

                                <h2>
                                    Formación académica
                                </h2>


                                <ul>

                                    {investigator.education.map(
                                        (education, index) => (

                                            <li key={index}>

                                                {education}

                                            </li>

                                        )
                                    )}

                                </ul>

                            </div>

                        )}


                    {investigator.scholar && (

                        <div className="profile-section">

                            <h2>
                                Google Scholar
                            </h2>


                            <a

                                href={investigator.scholar}

                                target="_blank"

                                rel="noopener noreferrer"

                            >

                                <Button>

                                    Ver perfil en Google Scholar

                                </Button>

                            </a>

                        </div>

                    )}

                </Card>

            </section>

        </Container>

    );

}


export default InvestigatorProfile;