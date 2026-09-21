import AdminLayout from "../components/AdminLayout";

function News() {
    return (
        <AdminLayout>
            <div className="admin-page">
                <div className="admin-page-header">
                    <div>
                        <h1>Noticias</h1>
                        <p>Gestiona las noticias y novedades del Instituto.</p>
                    </div>

                    <button className="admin-primary-button">
                        + Agregar noticia
                    </button>
                </div>

                <div className="admin-table-card">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Nueva investigación del Instituto</td>
                                <td>02/09/2026</td>
                                <td>
                                    <span className="status-active">
                                        Publicada
                                    </span>
                                </td>
                                <td>
                                    <button>Editar</button>
                                    <button>Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

export default News;