import AdminLayout from "../components/AdminLayout";

import { useLanguage } from "../../context/LanguageContext";

import es from "../translations/es";
import en from "../translations/en";


function ResearchGroups() {

    const { language } = useLanguage();

    const t = language === "es" ? es : en;


    return (
        <AdminLayout>

            <div className="admin-page">

                <div className="admin-page-header">

                    <div>

                        <h1>
                            {t.research.title}
                        </h1>

                        <p>
                            {t.research.description}
                        </p>

                    </div>


                    <button className="admin-primary-button">
                        + {t.research.add}
                    </button>

                </div>


                <div className="admin-table-card">

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>
                                    {t.research.name}
                                </th>

                                <th>
                                    {t.research.researchers}
                                </th>

                                <th>
                                    {t.research.papers}
                                </th>

                                <th>
                                    {t.research.status}
                                </th>

                                <th>
                                    {t.research.actions}
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr>

                                <td>
                                    Inteligencia Artificial
                                </td>

                                <td>
                                    5
                                </td>

                                <td>
                                    12
                                </td>

                                <td>

                                    <span className="status-active">
                                        {t.research.active}
                                    </span>

                                </td>

                                <td>

                                    <button>
                                        {t.research.edit}
                                    </button>

                                    <button>
                                        {t.research.delete}
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


export default ResearchGroups;