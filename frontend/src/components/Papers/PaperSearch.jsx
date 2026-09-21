import "./PaperSearch.css";

import { useLanguage } from "../../context/LanguageContext";

function PaperSearch() {

    const { t } = useLanguage();

    return (

        <div className="paper-search">

            <input

                type="text"

                placeholder={t.papers.search}

            />

        </div>

    );

}

export default PaperSearch;