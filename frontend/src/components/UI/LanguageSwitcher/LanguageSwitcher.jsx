import "./LanguageSwitcher.css";

import { useLanguage } from "../../../context/LanguageContext";

function LanguageSwitcher() {

    const {

        language,

        setLanguage

    } = useLanguage();

    return (

        <div className="language-switcher">

            <button

                className={`language-button ${language==="es" ? "active" : ""}`}

                onClick={() => setLanguage("es")}

            >

                <img

                    src="/images/flags/chile.png"

                    alt="Español"

                />

                <span>

                    ES

                </span>

            </button>

            <button

                className={`language-button ${language==="en" ? "active" : ""}`}

                onClick={() => setLanguage("en")}

            >

                <img

                    src="/images/flags/usa.png"

                    alt="English"

                />

                <span>

                    EN

                </span>

            </button>

        </div>

    );

}

export default LanguageSwitcher;