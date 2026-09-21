import AdminLayout from "../components/AdminLayout";

function Papers() {
    return (
        <AdminLayout>
            <div className="admin-page">
                <div className="admin-page-header">
                    <div>
                        <h1>Papers</h1>
                        <p>Gestiona las publicaciones científicas del Instituto.</p>
                    </div>

                    <button className="admin-primary-button">
                        + Agregar paper
                    </button>
                </div>

                <div className="admin-table-card">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Investigadores</th>
                                <th>Año</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Modelo de IA para clasificación de imágenes médicas</td>
                                <td>2</td>
                                <td>2026</td>
                                <td>
                                    <span className="status-active">
                                        Publicado
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

export default Papers;