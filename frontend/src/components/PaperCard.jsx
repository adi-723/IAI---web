function PaperCard({paper}){

    return(

        <div className="paper-card">

            <img
                src={paper.imagen}
                alt={paper.titulo}
            />

            <h3>{paper.titulo}</h3>

            <p>{paper.resumen}</p>

            <button>Leer Paper</button>

        </div>

    );

}

export default PaperCard;