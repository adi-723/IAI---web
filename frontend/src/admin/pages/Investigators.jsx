import AdminLayout from "../components/AdminLayout";

function Investigators() {
    return (
        <AdminLayout>
            <div className="admin-page">
                <div className="admin-page-header">
                    <div>
                        <h1>Investigadores</h1>
                        <p>Gestiona los investigadores pertenecientes al Instituto.</p>
                    </div>

                    <button className="admin-primary-button">
                        + Agregar investigador
                    </button>
                </div>

                <div className="admin-table-card">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Grado académico</th>
                                <th>Área</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Ejemplo Investigador</td>
                                <td>Doctor en Ciencias</td>
                                <td>Inteligencia Artificial</td>
                                <td>
                                    <span className="status-active">
                                        Activo
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

export default Investigators;