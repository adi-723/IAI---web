import AdminLayout from "../components/AdminLayout";

import { useLanguage } from "../../context/LanguageContext";

import es from "../translations/es";
import en from "../translations/en";


function Users() {

    const { language } = useLanguage();

    const t = language === "es" ? es : en;


    return (
        <AdminLayout>

            <div className="admin-page">

                <div className="admin-page-header">

                    <div>

                        <h1>
                            {t.users.title}
                        </h1>

                        <p>
                            {t.users.description}
                        </p>

                    </div>

                    <button className="admin-primary-button">
                        + {t.users.add}
                    </button>

                </div>


                <div className="admin-table-card">

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>
                                    {t.users.name}
                                </th>

                                <th>
                                    {t.users.email}
                                </th>

                                <th>
                                    {t.users.role}
                                </th>

                                <th>
                                    {t.users.status}
                                </th>

                                <th>
                                    {t.users.actions}
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr>

                                <td>
                                    Usuario de ejemplo
                                </td>

                                <td>
                                    admin@iai.cl
                                </td>

                                <td>
                                    {t.users.administrator}
                                </td>

                                <td>

                                    <span className="status-active">
                                        {t.users.active}
                                    </span>

                                </td>

                                <td>

                                    <button>
                                        {t.users.edit}
                                    </button>

                                    <button>
                                        {t.users.delete}
                                    </button>

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