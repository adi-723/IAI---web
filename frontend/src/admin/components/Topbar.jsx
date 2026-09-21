import "../styles/Topbar.css";

function Topbar() {
    return (
        <header className="admin-topbar">

            <div>
                <h2> Panel de Administración</h2>
            </div>

            <div className="admin-user">

                <div className="admin-avatar">
                      👤
                </div>

                <div>
                    <strong> Administrador</strong>
                    <span> Cuenta administrativa</span>
                </div>

            </div>

        </header>
    );
}

export default Topbar;