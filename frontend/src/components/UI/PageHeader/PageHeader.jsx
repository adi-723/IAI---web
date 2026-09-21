import "./PageHeader.css";

import Container from "../Container/Container";

function PageHeader({

    title,

    subtitle,

    background

}) {

    return (

        <section

            className="page-header"

            style={{

                backgroundImage: `url(${background})`

            }}

        >

            <div className="page-header-overlay">

                <Container>

                    <div className="page-header-content">

                        <h1>

                            {title}

                        </h1>

                        <p>

                            {subtitle}

                        </p>

                    </div>

                </Container>

            </div>

        </section>

    );

}

export default PageHeader;