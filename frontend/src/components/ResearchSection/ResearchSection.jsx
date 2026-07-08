import "./ResearchSection.css";

function ResearchSection(){

    const grupos=[

        "Paleoambiente",

        "Biología del Cáncer",

        "Bioarqueología",

        "Modelamiento Matemático",

        "Biogenética"

    ];

    return(

        <section className="research">

            <h2>

                Grupos de Investigación

            </h2>

            <div className="research-grid">

                {

                    grupos.map((grupo)=>(

                        <div
                            key={grupo}
                            className="research-card"
                        >

                            {grupo}

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default ResearchSection;