import AdminLayout from "../components/AdminLayout";
import "../styles/Dashboard.css";

import { useLanguage } from "../../context/LanguageContext";

import es from "../translations/es";
import en from "../translations/en";


function Dashboard() {

    const { language } = useLanguage();

    const t = language === "es" ? es : en;


    return (

        <AdminLayout>

            <div className="dashboard">

                {/* ENCABEZADO */}

                <section className="dashboard-header">

                    <span className="dashboard-label">
                        {t.dashboard.label}
                    </span>

                    <h1>
                        {t.dashboard.title}
                    </h1>

                    <p>
                        {t.dashboard.welcome}
                    </p>

                </section>


                {/* RESUMEN */}

                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <h2>
                                {t.dashboard.summary}
                            </h2>

                            <p>
                                {t.dashboard.summaryDescription}
                            </p>

                        </div>

                    </div>


                    <div className="stats-grid">

                        {/* INVESTIGADORES */}

                        <div className="admin-stat-card">

                            <div className="stat-top">

                                <div className="stat-icon">
                                    👨‍🔬
                                </div>

                                <span className="stat-title">
                                    {t.dashboard.researchers}
                                </span>

                            </div>


                            <div className="stat-content">

                                <h2>
                                    0
                                </h2>

                                <p>
                                    {t.dashboard.researchersRegistered}
                                </p>

                            </div>

                        </div>


                        {/* PAPERS */}

                        <div className="admin-stat-card">

                            <div className="stat-top">

                                <div className="stat-icon">
                                    📄
                                </div>

                                <span className="stat-title">
                                    {t.dashboard.papers}
                                </span>

                            </div>


                            <div className="stat-content">

                                <h2>
                                    0
                                </h2>

                                <p>
                                    {t.dashboard.papersRegistered}
                                </p>

                            </div>

                        </div>


                        {/* NOTICIAS */}

                        <div className="admin-stat-card">

                            <div className="stat-top">

                                <div className="stat-icon">
                                    📰
                                </div>

                                <span className="stat-title">
                                    {t.dashboard.news}
                                </span>

                            </div>


                            <div className="stat-content">

                                <h2>
                                    0
                                </h2>

                                <p>
                                    {t.dashboard.newsPublished}
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ACCIONES RÁPIDAS */}

                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <h2>
                                {t.dashboard.quickActions}
                            </h2>

                            <p>
                                {t.dashboard.quickActionsDescription}
                            </p>

                        </div>

                    </div>


                    <div className="quick-actions">

                        {/* AGREGAR INVESTIGADOR */}

                        <button className="quick-action">

                            <div className="quick-action-icon">
                                +
                            </div>

                            <div className="quick-action-content">

                                <strong>
                                    {t.dashboard.addResearcher}
                                </strong>

                                <span>
                                    {t.dashboard.addResearcherDescription}
                                </span>

                            </div>

                            <span>
                                →
                            </span>

                        </button>


                        {/* AGREGAR PAPER */}

                        <button className="quick-action">

                            <div className="quick-action-icon">
                                +
                            </div>

                            <div className="quick-action-content">

                                <strong>
                                    {t.dashboard.addPaper}
                                </strong>

                                <span>
                                    {t.dashboard.addPaperDescription}
                                </span>

                            </div>

                            <span>
                                →
                            </span>

                        </button>


                        {/* CREAR NOTICIA */}

                        <button className="quick-action">

                            <div className="quick-action-icon">
                                +
                            </div>

                            <div className="quick-action-content">

                                <strong>
                                    {t.dashboard.createNews}
                                </strong>

                                <span>
                                    {t.dashboard.createNewsDescription}
                                </span>

                            </div>

                            <span>
                                →
                            </span>

                        </button>

                    </div>

                </section>

            </div>

        </AdminLayout>

    );

}


export default Dashboard;