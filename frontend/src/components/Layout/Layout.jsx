
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import "./Layout.css";

function Layout({ children }) {

    return (
        <div className="site-layout">

            <Navbar />

            <main className="site-main">
                {children}
            </main>

            <Footer />

        </div>
    );
}

export default Layout;
