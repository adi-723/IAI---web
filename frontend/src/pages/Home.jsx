import Layout from "../components/Layout";

import Hero from "../components/Hero/Hero";

import AboutSection from "../components/About/AboutSection";
import MissionVisionSection from "../components/About/MissionVisionSection";
import ValuesSection from "../components/About/ValuesSection";
import StatisticsSection from "../components/About/StatisticsSection";

function Home() {

    return (

        <Layout>

            <Hero />

            <AboutSection />

            <MissionVisionSection />

            <ValuesSection />

            <StatisticsSection />

        </Layout>

    );

}

export default Home;