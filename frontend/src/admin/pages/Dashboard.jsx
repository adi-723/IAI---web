
import AdminLayout from "../components/AdminLayout";
import "../styles/Dashboard.css";

function Dashboard() {

    return (

        <AdminLayout>

            <div className="dashboard">

                <section className="dashboard-header">

                    <span className="dashboard-label">
                        PANEL DE ADMINISTRACIÓN
                    </span>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Bienvenido al panel de administración del IAI.
                        Desde aquí puedes gestionar el contenido del sitio.
                    </p>

                </section>


                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <h2>
                                Resumen
                            </h2>

                            <p>
                                Estado actual del contenido del sitio.
                            </p>

                        </div>

                    </div>


                    <div className="stats-grid">

                        <div className="admin-stat-card">

                            <div className="stat-top">

                                <div className="stat-icon">
                                    👨‍🔬
                                </div>

                                <span className="stat-title">
                                    Investigadores
                                </span>

                            </div>

                            <div className="stat-content">

                                <h2>0</h2>

                                <p>
                                    Investigadores registrados
                                </p>

                            </div>

                        </div>


                        <div className="admin-stat-card">

                            <div className="stat-top">

                                <div className="stat-icon">
                                    📄
                                </div>

                                <span className="stat-title">
                                    Papers
                                </span>

                            </div>

                            <div className="stat-content">

                                <h2>0</h2>

                                <p>
                                    Publicaciones registradas
                                </p>

                            </div>

                        </div>


                        <div className="admin-stat-card">

                            <div className="stat-top">

                                <div className="stat-icon">
                                    📰
                                </div>

                                <span className="stat-title">
                                    Noticias
                                </span>

                            </div>

                            <div className="stat-content">

                                <h2>0</h2>

                                <p>
                                    Noticias publicadas
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <h2>
                                Acciones rápidas
                            </h2>

                            <p>
                                Accede rápidamente a las principales funciones.
                            </p>

                        </div>

                    </div>


                    <div className="quick-actions">

                        <button className="quick-action">

                            <div className="quick-action-icon">
                                +
                            </div>

                            <div className="quick-action-content">

                                <strong>
                                    Agregar investigador
                                </strong>

                                <span>
                                    Registrar un nuevo investigador
                                </span>

                            </div>

                            <span>
                                →
                            </span>

                        </button>


                        <button className="quick-action">

                            <div className="quick-action-icon">
                                +
                            </div>

                            <div className="quick-action-content">

                                <strong>
                                    Agregar paper
                                </strong>

                                <span>
                                    Registrar una nueva publicación
                                </span>

                            </div>

                            <span>
                                →
                            </span>

                        </button>


                        <button className="quick-action">

                            <div className="quick-action-icon">
                                +
                            </div>

                            <div className="quick-action-content">

                                <strong>
                                    Crear noticia
                                </strong>

                                <span>
                                    Publicar una nueva noticia
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