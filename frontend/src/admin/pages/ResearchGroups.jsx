import AdminLayout from "../components/AdminLayout";

function ResearchGroups() {
    return (
        <AdminLayout>
            <div className="admin-page">
                <div className="admin-page-header">
                    <div>
                        <h1>Investigaciones</h1>
                        <p>Gestiona las líneas de investigación del Instituto.</p>
                    </div>

                    <button className="admin-primary-button">
                        + Agregar investigación
                    </button>
                </div>

                <div className="admin-table-card">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Investigadores</th>
                                <th>Papers</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Inteligencia Artificial</td>
                                <td>5</td>
                                <td>12</td>
                                <td>
                                    <span className="status-active">
                                        Activa
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

export default ResearchGroups;