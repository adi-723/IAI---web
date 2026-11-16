import { useEffect, useState } from "react";

import "./InvestigatorSection.css";

import Container from "../UI/Container/Container";
import InvestigatorCard from "./InvestigatorCard";

import { get } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";

import investigatorsES from "../../translations/es/investigators";
import investigatorsEN from "../../translations/en/investigators";

function InvestigatorSection() {
    const { language } = useLanguage();

    const t = language === "es"
        ? investigatorsES
        : investigatorsEN;

    const [investigators, setInvestigators] = useState([]);
    const [researchGroups, setResearchGroups] = useState([]);

    const [search, setSearch] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | CARGAR INVESTIGADORES Y GRUPOS
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        let active = true;

        async function loadData() {
            try {
                setLoading(true);
                setError(null);

                const [investigatorResponse, groupResponse] =
                    await Promise.all([
                        get(`/investigators/getAll.php?language=${language}`),
                        get(`/research/getAll.php?language=${language}`)
                    ]);

                if (!active) return;

                const investigatorData =
                    investigatorResponse?.data ?? investigatorResponse;

                const groupData =
                    groupResponse?.data ?? groupResponse;

                if (!Array.isArray(investigatorData)) {
                    throw new Error("La respuesta de investigadores no es válida.");
                }

                if (!Array.isArray(groupData)) {
                    throw new Error("La respuesta de grupos no es válida.");
                }

                setInvestigators(investigatorData);
                setResearchGroups(groupData);

            } catch (err) {
                console.error("Error al cargar investigadores y grupos:", err);

                if (active) {
                    setError(t.loadError);
                }

            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            active = false;
        };

    }, [language]);

    /*
    |--------------------------------------------------------------------------
    | REINICIAR FILTROS AL CAMBIAR IDIOMA
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        setSelectedGroup("");
        setSearch("");
    }, [language]);

    /*
    |--------------------------------------------------------------------------
    | FILTRAR INVESTIGADORES
    |--------------------------------------------------------------------------
    */

    const filtered = investigators.filter((investigator) => {
        const fullName = [
            investigator.name,
            investigator.last_name
        ]
            .filter(Boolean)
            .join(" ");

        const searchText = search.toLowerCase();

        const matchName = fullName
            .toLowerCase()
            .includes(searchText);

        const groupIds = Array.isArray(investigator.research_group_ids)
            ? investigator.research_group_ids.map(Number)
            : [];

        const matchGroup =
            selectedGroup === "" ||
            groupIds.includes(Number(selectedGroup));

        return matchName && matchGroup;
    });

    /*
    |--------------------------------------------------------------------------
    | CARGA
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <section className="investigator-section">
                <Container>
                    <p>{t.loading}</p>
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
                    <p>{error}</p>
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
                        placeholder={t.search}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                    >
                        <option value="">
                            {t.filter}
                        </option>

                        {researchGroups.map((group) => (
                            <option
                                key={group.id}
                                value={group.id}
                            >
                                {group.name}
                            </option>
                        ))}
                    </select>

                </div>

                <div className="investigator-list">

                    {filtered.map((investigator) => (
                        <InvestigatorCard
                            key={investigator.id}
                            {...investigator}
                        />
                    ))}

                </div>

                {filtered.length === 0 && (
                    <p>{t.noResults}</p>
                )}

            </Container>
        </section>
    );
}

export default InvestigatorSection;