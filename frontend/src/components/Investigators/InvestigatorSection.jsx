import { useEffect, useState } from "react";

import "./InvestigatorSection.css";

import Container from "../UI/Container/Container";

import InvestigatorCard from "./InvestigatorCard";

import { get } from "../../services/api";


function InvestigatorSection() {

    const [investigators, setInvestigators] = useState([]);

    const [search, setSearch] = useState("");

    const [selectedArea, setSelectedArea] =
        useState("Todas las áreas");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    /*
    |--------------------------------------------------------------------------
    | CARGAR INVESTIGADORES DESDE LA API
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        async function loadInvestigators() {

            try {

                setLoading(true);

                setError(null);

                const data = await get(
                    "/investigators/getAll.php?language=es"
                );

                setInvestigators(data);

            } catch (err) {

                console.error(
                    "Error al cargar investigadores:",
                    err
                );

                setError(err.message);

            } finally {

                setLoading(false);

            }
        }

        loadInvestigators();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | ÁREAS
    |--------------------------------------------------------------------------
    |
    | Las áreas ahora se obtienen directamente desde MySQL.
    |
    */

    const areas = [
        "Todas las áreas",

        ...new Set(
            investigators
                .map(
                    investigator => investigator.area
                )
                .filter(Boolean)
        )
    ];


    /*
    |--------------------------------------------------------------------------
    | FILTRAR INVESTIGADORES
    |--------------------------------------------------------------------------
    */

    const filtered = investigators.filter(
        (investigator) => {

            const name =
                investigator.name || "";

            const area =
                investigator.area || "";


            const matchName =
                name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            const matchArea =
                selectedArea ===
                    "Todas las áreas" ||
                area === selectedArea;


            return matchName && matchArea;

        }
    );


    /*
    |--------------------------------------------------------------------------
    | CARGANDO
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <section className="investigator-section">

                <Container>

                    <p>
                        Cargando investigadores...
                    </p>

                </Container>

            </section>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | ERROR
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (

            <section className="investigator-section">

                <Container>

                    <p>
                        Error al cargar los investigadores:
                        {" "}
                        {error}
                    </p>

                </Container>

            </section>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | VISTA
    |--------------------------------------------------------------------------
    */

    return (

        <section className="investigator-section">

            <Container>

                <div className="investigator-filters">

                    <input

                        type="text"

                        placeholder="Buscar investigador..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />


                    <select

                        value={selectedArea}

                        onChange={(e) =>
                            setSelectedArea(
                                e.target.value
                            )
                        }

                    >

                        {areas.map((area) => (

                            <option

                                key={area}

                                value={area}

                            >

                                {area}

                            </option>

                        ))}

                    </select>

                </div>


                <div className="investigator-list">

                    {filtered.map(
                        (investigator) => (

                            <InvestigatorCard

                                key={investigator.id}

                                {...investigator}

                            />

                        )
                    )}

                </div>


                {filtered.length === 0 && (

                    <p>
                        No se encontraron investigadores.
                    </p>

                )}

            </Container>

        </section>

    );

}


export default InvestigatorSection;