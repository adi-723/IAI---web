import AdminLayout from "../components/AdminLayout";

function Users() {
    return (
        <AdminLayout>
            <div className="admin-page">
                <div className="admin-page-header">
                    <div>
                        <h1>Usuarios</h1>
                        <p>Gestiona las cuentas con acceso administrativo.</p>
                    </div>

                    <button className="admin-primary-button">
                        + Agregar usuario
                    </button>
                </div>

                <div className="admin-table-card">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Administrador</td>
                                <td>admin@iai.cl</td>
                                <td>Administrador</td>
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

export default Users;