import "./PaperSection.css";

function PaperSection(){

    return(

        <section className="papers">

            <h2>Últimos Papers</h2>

            <div className="paper-grid">

                <div className="paper-card">

                    <div className="paper-image">

                        Imagen IA

                    </div>

                    <h3>Paper 1</h3>

                    <p>
                        Resumen del paper...
                    </p>

                </div>

                <div className="paper-card">

                    <div className="paper-image">

                        Imagen IA

                    </div>

                    <h3>Paper 2</h3>

                    <p>
                        Resumen del paper...
                    </p>

                </div>

                <div className="paper-card">

                    <div className="paper-image">

                        Imagen IA

                    </div>

                    <h3>Paper 3</h3>

                    <p>
                        Resumen del paper...
                    </p>

                </div>

            </div>

        </section>

    );

}

export default PaperSection;