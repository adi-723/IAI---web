import AdminLayout from "../components/AdminLayout";

import { useLanguage } from "../../context/LanguageContext";

import es from "../translations/es";
import en from "../translations/en";


function Papers() {

    const { language } = useLanguage();

    const t = language === "es" ? es : en;


    return (
        <AdminLayout>

            <div className="admin-page">

                <div className="admin-page-header">

                    <div>

                        <h1>
                            {t.papers.title}
                        </h1>

                        <p>
                            {t.papers.description}
                        </p>

                    </div>


                    <button className="admin-primary-button">
                        + {t.papers.add}
                    </button>

                </div>


                <div className="admin-table-card">

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>
                                    {t.papers.titleColumn}
                                </th>

                                <th>
                                    {t.papers.researchers}
                                </th>

                                <th>
                                    {t.papers.year}
                                </th>

                                <th>
                                    {t.papers.status}
                                </th>

                                <th>
                                    {t.papers.actions}
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr>

                                <td>
                                    Modelo de IA para clasificación de imágenes médicas
                                </td>

                                <td>
                                    2
                                </td>

                                <td>
                                    2026
                                </td>

                                <td>

                                    <span className="status-active">
                                        {t.papers.published}
                                    </span>

                                </td>

                                <td>

                                    <button>
                                        {t.papers.edit}
                                    </button>

                                    <button>
                                        {t.papers.delete}
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


export default Papers;