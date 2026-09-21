import Layout from "../components/Layout";

import { useParams } from "react-router-dom";

function PaperProfile() {

    const { id } = useParams();

    return (

        <Layout>

            <section>

                <h1>

                    Paper

                </h1>

                <p>

                    Información del paper con ID: {id}

                </p>

            </section>

        </Layout>

    );

}

export default PaperProfile;