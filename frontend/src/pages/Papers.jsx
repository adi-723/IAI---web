import Layout from "../components/Layout";

import PaperHeader from "../components/Papers/PaperHeader";
import PaperSearch from "../components/Papers/PaperSearch";
import PaperSection from "../components/Papers/PaperSection";

function Papers() {

    return (

        <Layout>

            <PaperHeader />

            <PaperSearch />

            <PaperSection />

        </Layout>

    );

}

export default Papers;