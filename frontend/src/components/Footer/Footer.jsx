
import "./Footer.css";

import { useLanguage } from "../../context/LanguageContext";

function Footer() {

    const { t } = useLanguage();

    return (

        <footer className="footer">

            <p>{t.footer.rights}</p>

            <div className="footer-links">

                <a href="/privacy">{t.footer.privacy}</a>

                <a href="/terms">{t.footer.terms}</a>

            </div>

        </footer>

    );

}

export default Footer;
