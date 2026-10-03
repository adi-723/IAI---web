import AdminLayout from "../components/AdminLayout";

import { useLanguage } from "../../context/LanguageContext";

import es from "../translations/es";
import en from "../translations/en";


function Investigators() {

    const { language } = useLanguage();

    const t = language === "es" ? es : en;


    return (

        <AdminLayout>

            <div className="admin-page">

                {/* ENCABEZADO */}

                <div className="admin-page-header">

                    <div>

                        <h1>
                            {t.investigators.title}
                        </h1>

                        <p>
                            {t.investigators.description}
                        </p>

                    </div>


                    <button className="admin-primary-button">
                        + {t.investigators.add}
                    </button>

                </div>


                {/* TABLA */}

                <div className="admin-table-card">

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>
                                    {t.investigators.name}
                                </th>

                                <th>
                                    {t.investigators.degree}
                                </th>

                                <th>
                                    {t.investigators.area}
                                </th>

                                <th>
                                    {t.investigators.status}
                                </th>

                                <th>
                                    {t.investigators.actions}
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr>

                                <td>
                                    Ejemplo Investigador
                                </td>

                                <td>
                                    Doctor en Ciencias
                                </td>

                                <td>
                                    Inteligencia Artificial
                                </td>

                                <td>

                                    <span className="status-active">
                                        {t.investigators.active}
                                    </span>

                                </td>

                                <td>

                                    <button>
                                        {t.investigators.edit}
                                    </button>

                                    <button>
                                        {t.investigators.delete}
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


export default Investigators;