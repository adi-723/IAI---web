import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
    return (
        <aside className="admin-sidebar">

            <div className="admin-sidebar-logo">
                <span className="admin-logo-circle">IAI</span>

                <div>
                    <strong>IAI Admin</strong>
                    <small>Administración</small>
                </div>
            </div>

            <nav className="admin-navigation">

                <NavLink to="/admin" end>
                    <span>▣</span>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin/investigators">
                    <span>👨‍🔬</span>
                    <span>Investigadores</span>
                </NavLink>

                <NavLink to="/admin/papers">
                    <span>📄</span>
                    <span>Papers</span>
                </NavLink>

                <NavLink to="/admin/news">
                    <span>📰</span>
                    <span>Noticias</span>
                </NavLink>

                <NavLink to="/admin/research-groups">
                    <span>🔬</span>
                    <span>Investigaciones</span>
                </NavLink>

                <NavLink to="/admin/users">
                    <span>👤</span>
                    <span>Usuarios</span>
                </NavLink>

            </nav>

            <div className="admin-sidebar-footer">
                <NavLink to="/">
                    <span>←</span>
                    <span>Salir del panel</span>
                </NavLink>
            </div>

        </aside>
    );
}

export default Sidebar;