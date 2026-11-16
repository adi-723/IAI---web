
import "./InvestigatorProfile.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "../UI/Card/Card";
import Container from "../UI/Container/Container";
import { get } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";

function InvestigatorProfile() {
    const { slug } = useParams();
    const { language } = useLanguage();

    // Textos que cambian según el idioma seleccionado.
    const labels = {
        es: {
            loading: "Cargando perfil...",
            loadError: "No pudimos cargar este perfil",
            notFound: "Integrante del personal no encontrado.",
            serverError: "No se pudo conectar con el servidor.",
            missingSlug: "No se indicó el perfil que deseas consultar.",
            checkServer:
                "Comprueba que el servidor PHP esté funcionando y que la dirección del perfil sea correcta.",

            breadcrumb: "Personal",
            team: "PERSONAL DEL INSTITUTO",
            position: "Cargo",
            area: "Área de especialización",

            academicProfile: "PERFIL PROFESIONAL",
            biography: "Biografía",
            experience: "Trayectoria y experiencia profesional",

            researchLines: "Líneas de investigación",
            studyAreas: "Principales áreas de estudio",

            education: "Formación académica",
            studies: "Estudios y formación profesional",

            academicLinks: "Enlaces académicos",
            resources: "Consulta sus perfiles y recursos profesionales",

            scholar: "Publicaciones y citas académicas",
            orcid: "Identificador de investigador",
            researchgate: "Investigaciones y colaboraciones",
            website: "Página web institucional o personal",
            websiteName: "Sitio web",

            photo: "Fotografía de"
        },

        en: {
            loading: "Loading profile...",
            loadError: "We couldn't load this profile",
            notFound: "Staff member not found.",
            serverError: "Could not connect to the server.",
            missingSlug: "No profile was specified.",
            checkServer:
                "Check that the PHP server is running and that the profile address is correct.",

            breadcrumb: "Staff",
            team: "INSTITUTE STAFF",
            position: "Position",
            area: "Area of expertise",

            academicProfile: "PROFESSIONAL PROFILE",
            biography: "Biography",
            experience: "Professional background and experience",

            researchLines: "Research interests",
            studyAreas: "Main areas of study",

            education: "Academic background",
            studies: "Education and professional training",

            academicLinks: "Academic links",
            resources: "Explore professional profiles and resources",

            scholar: "Publications and academic citations",
            orcid: "Researcher identifier",
            researchgate: "Research and collaborations",
            website: "Institutional or personal website",
            websiteName: "Website",

            photo: "Photo of"
        }
    };

    const text = language === "en" ? labels.en : labels.es;

    const [investigator, setInvestigator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;

        async function loadInvestigator() {
            try {
                setLoading(true);
                setError(null);

                // Solicitamos los datos según el idioma seleccionado.
                const data = await get(
                    `/investigators/getOne.php?slug=${encodeURIComponent(slug)}&language=${language}`
                );

                if (!active) return;

                // Algunos endpoints devuelven el objeto dentro de "data".
                const result = data?.data ?? data;

                if (
                    !result ||
                    result.error ||
                    !result.name
                ) {
                    throw new Error(
                        result?.message || text.notFound
                    );
                }

                setInvestigator(result);
            } catch (err) {
                console.error("Error al cargar el perfil:", err);

                if (active) {
                    setError(
                        err.message || text.serverError
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        if (slug) {
            loadInvestigator();
        } else {
            setError(text.missingSlug);
            setLoading(false);
        }

        return () => {
            active = false;
        };

    // Se vuelve a cargar el perfil cuando cambia el slug o el idioma.
    }, [slug, language]);

    // Estado de carga.
    if (loading) {
        return (
            <main className="investigator-profile">
                <Container>
                    <div className="investigator-state">
                        <div className="profile-loader" />
                        <h2>{text.loading}</h2>
                    </div>
                </Container>
            </main>
        );
    }

    // Estado de error.
    if (error || !investigator) {
        return (
            <main className="investigator-profile">
                <Container>
                    <div className="investigator-state">
                        <h2>{text.loadError}</h2>

                        <p>{error || text.notFound}</p>

                        <p>{text.checkServer}</p>
                    </div>
                </Container>
            </main>
        );
    }

    // Normaliza las direcciones web para evitar enlaces inválidos.
    function cleanUrl(value) {
        if (typeof value !== "string") return "";

        const url = value.trim();

        if (!url) return "";

        const normalizedUrl = /^https?:\/\//i.test(url)
            ? url
            : `https://${url}`;

        try {
            const parsedUrl = new URL(normalizedUrl);

            if (!["http:", "https:"].includes(parsedUrl.protocol)) {
                return "";
            }

            return parsedUrl.href;
        } catch {
            return "";
        }
    }

    // Enlaces académicos y profesionales.
    const academicLinks = [
        {
            name: "Google Scholar",
            url: cleanUrl(investigator.scholar),
            icon: "📚",
            description: text.scholar
        },
        {
            name: "ORCID",
            url: cleanUrl(investigator.orcid),
            icon: "🪪",
            description: text.orcid
        },
        {
            name: "ResearchGate",
            url: cleanUrl(investigator.researchgate),
            icon: "🔬",
            description: text.researchgate
        },
        {
            name: text.websiteName,
            url: cleanUrl(investigator.website),
            icon: "🌐",
            description: text.website
        }
    ].filter((link) => link.url);

    return (
        <main className="investigator-profile">
            <Container>

                {/* Ruta de navegación */}
                <div className="profile-breadcrumb">
                    <span>Instituto IAI</span>

                    <span className="breadcrumb-separator">/</span>

                    <span>{text.breadcrumb}</span>

                    <span className="breadcrumb-separator">/</span>

                    <span className="breadcrumb-current">
                        {investigator.name}
                    </span>
                </div>

                <Card>

                    {/* Información principal del personal */}
                    <section className="profile-hero">

                        <div className="profile-photo">
                            {investigator.image ? (
                                <img
                                    src={investigator.image}
                                    alt={`${text.photo} ${investigator.name}`}
                                    onError={(event) => {
                                        event.currentTarget.style.display = "none";
                                    }}
                                />
                            ) : (
                                <span className="profile-initial">
                                    {investigator.name?.charAt(0) || "I"}
                                </span>
                            )}
                        </div>

                        <div className="profile-identity">

                            <span className="profile-eyebrow">
                                {text.team}
                            </span>

                            <h1>{investigator.name}</h1>

                            {investigator.degree && (
                                <p className="profile-degree">
                                    <span aria-hidden="true">🎓</span>
                                    {investigator.degree}
                                </p>
                            )}

                            {investigator.position && (
                                <p className="profile-detail">
                                    <strong>{text.position}</strong>
                                    <span>{investigator.position}</span>
                                </p>
                            )}

                            {investigator.area && (
                                <p className="profile-detail">
                                    <strong>{text.area}</strong>
                                    <span>{investigator.area}</span>
                                </p>
                            )}

                        </div>
                    </section>

                    <div className="profile-divider" />

                    {/* Resumen profesional */}
                    {investigator.summary && (
                        <section className="profile-summary">

                            <span className="profile-section-label">
                                {text.academicProfile}
                            </span>

                            <p>{investigator.summary}</p>

                        </section>
                    )}

                    {/* Biografía */}
                    {investigator.biography && (
                        <section className="profile-section">

                            <div className="profile-section-heading">

                                <span className="profile-section-icon">
                                    📖
                                </span>

                                <div>
                                    <h2>{text.biography}</h2>
                                    <p>{text.experience}</p>
                                </div>

                            </div>

                            <p className="profile-biography">
                                {investigator.biography}
                            </p>

                        </section>
                    )}

                    {/* Líneas de investigación */}
                    {Array.isArray(investigator.interests) &&
                        investigator.interests.length > 0 && (

                            <section className="profile-section">

                                <div className="profile-section-heading">

                                    <span className="profile-section-icon">
                                        🔬
                                    </span>

                                    <div>
                                        <h2>{text.researchLines}</h2>
                                        <p>{text.studyAreas}</p>
                                    </div>

                                </div>

                                <ul className="profile-interest-list">

                                    {investigator.interests.map(
                                        (interest, index) => (
                                            <li key={index}>
                                                {interest}
                                            </li>
                                        )
                                    )}

                                </ul>

                            </section>
                        )}

                    {/* Formación académica */}
                    {Array.isArray(investigator.education) &&
                        investigator.education.length > 0 && (

                            <section className="profile-section">

                                <div className="profile-section-heading">

                                    <span className="profile-section-icon">
                                        🎓
                                    </span>

                                    <div>
                                        <h2>{text.education}</h2>
                                        <p>{text.studies}</p>
                                    </div>

                                </div>

                                <ul className="profile-education-list">

                                    {investigator.education.map(
                                        (education, index) => (
                                            <li key={index}>
                                                {education}
                                            </li>
                                        )
                                    )}

                                </ul>

                            </section>
                        )}

                    {/* Enlaces académicos */}
                    {academicLinks.length > 0 && (

                        <section className="profile-section profile-links-section">

                            <div className="profile-section-heading">

                                <span className="profile-section-icon">
                                    ↗
                                </span>

                                <div>
                                    <h2>{text.academicLinks}</h2>
                                    <p>{text.resources}</p>
                                </div>

                            </div>

                            <div className="profile-links-grid">

                                {academicLinks.map((link) => (

                                    <a
                                        className="profile-link-card"
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={link.name}
                                    >

                                        <span className="profile-link-icon">
                                            {link.icon}
                                        </span>

                                        <span className="profile-link-text">

                                            <strong>{link.name}</strong>

                                            <small>
                                                {link.description}
                                            </small>

                                        </span>

                                        <span
                                            className="profile-link-arrow"
                                            aria-hidden="true"
                                        >
                                            ↗
                                        </span>

                                    </a>

                                ))}

                            </div>

                        </section>
                    )}

                </Card>

            </Container>
        </main>
    );
}

export default InvestigatorProfile;
