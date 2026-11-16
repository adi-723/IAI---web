
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet
} from "react-router-dom";

// Páginas públicas
import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import ResearchGroups from "./pages/ResearchGroups";
import Papers from "./pages/Papers";
import Investigators from "./pages/Investigators";
import InvestigatorProfile from "./pages/InvestigatorProfile";
import News from "./pages/News";
import Contact from "./pages/Contact";
import ResearchProfile from "./components/ResearchGroups/ResearchProfile";
import PaperProfile from "./pages/PaperProfile";

// Administración
import Dashboard from "./admin/pages/Dashboard";
import Login from "./admin/pages/Login";
import AdminInvestigators from "./admin/pages/Investigators";
import AdminPapers from "./admin/pages/Papers";
import AdminNews from "./admin/pages/News";
import AdminResearchGroups from "./admin/pages/ResearchGroups";
import Users from "./admin/pages/Users";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import { AdminLanguageProvider } from "./admin/context/AdminLanguageContext";


function AdminLanguageLayout() {
    return (
        <AdminLanguageProvider>
            <Outlet />
        </AdminLanguageProvider>
    );
}


function Router() {

    return (
        <BrowserRouter>

            <Routes>

                {/* RUTAS PÚBLICAS */}

                <Route path="/" element={<Home />} />

                <Route
                    path="/investigaciones"
                    element={<ResearchGroups />}
                />

                <Route
                    path="/investigaciones/:slug"
                    element={<ResearchProfile />}
                />

                <Route
                    path="/papers"
                    element={<Papers />}
                />

                <Route
                    path="/papers/:id"
                    element={<PaperProfile />}
                />

                <Route
                    path="/investigadores"
                    element={<Investigators />}
                />

                <Route
                    path="/investigadores/:slug"
                    element={<InvestigatorProfile />}
                />

                <Route
                    path="/noticias"
                    element={<News />}
                />

                <Route
                    path="/noticias/:id"
                    element={<NewsDetail />}
                />

                <Route
                    path="/contacto"
                    element={<Contact />}
                />


                {/* LOGIN */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* RUTAS ADMINISTRATIVAS */}

                <Route element={<AdminLanguageLayout />}>

                    {/* ADMINISTRADOR */}

                    <Route
                        element={
                            <ProtectedRoute
                                allowedRoles={["Administrador"]}
                            />
                        }
                    >

                        <Route
                            path="/admin"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/admin/investigators"
                            element={<AdminInvestigators />}
                        />

                        <Route
                            path="/admin/papers"
                            element={<AdminPapers />}
                        />

                        <Route
                            path="/admin/research-groups"
                            element={<AdminResearchGroups />}
                        />

                        <Route
                            path="/admin/users"
                            element={<Users />}
                        />

                    </Route>


                    {/* ADMINISTRADOR Y EDITOR */}

                    <Route
                        element={
                            <ProtectedRoute
                                allowedRoles={[
                                    "Administrador",
                                    "Editor"
                                ]}
                            />
                        }
                    >

                        <Route
                            path="/admin/news"
                            element={<AdminNews />}
                        />

                    </Route>

                </Route>

            </Routes>

        </BrowserRouter>
    );

}

export default Router;