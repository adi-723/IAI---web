import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { useLanguage } from "../../context/LanguageContext";

const API_URL = "http://localhost:5000/api/news";

function News() {

    const { language } = useLanguage();


    // ------------------------------------------------
    // ESTADOS
    // ------------------------------------------------

    const [news, setNews] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [imageFile, setImageFile] = useState(null);

    const [uploadingImage, setUploadingImage] = useState(false);


    const [formData, setFormData] = useState({

        image: "",

        publish_date: "",

        title: "",

        summary: "",

        content: ""

    });


    // ------------------------------------------------
    // OBTENER NOTICIAS
    // ------------------------------------------------

    useEffect(() => {

        obtenerNoticias();

    }, [language]);


    async function obtenerNoticias() {

        try {

            setLoading(true);

            setError("");

            const response = await fetch(
                `${API_URL}/getAll.php?language=${language}`
            );

            if (!response.ok) {

                throw new Error(
                    "No se pudieron obtener las noticias."
                );

            }

            const data = await response.json();

            setNews(data);

        } catch (error) {

            console.error(error);

            setError(
                "No se pudieron cargar las noticias."
            );

        } finally {

            setLoading(false);

        }

    }


    // ------------------------------------------------
    // CAMBIAR CAMPOS
    // ------------------------------------------------

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData((previousData) => ({

            ...previousData,

            [name]: value

        }));

    }


    // ------------------------------------------------
    // SELECCIONAR IMAGEN
    // ------------------------------------------------

    async function handleImageChange(event) {

        const file = event.target.files[0];

        if (!file) {
            return;
        }


        // Comprobar que sea una imagen

        if (!file.type.startsWith("image/")) {

            alert(
                "Por favor selecciona un archivo de imagen."
            );

            event.target.value = "";

            return;

        }


        setImageFile(file);

        setUploadingImage(true);


        try {

            const imageData = new FormData();

            imageData.append(
                "image",
                file
            );


            const response = await fetch(
                `${API_URL}/uploadImage.php`,
                {
                    method: "POST",
                    body: imageData
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "No se pudo subir la imagen."
                );

            }


            // Guardamos automáticamente
            // la ruta que devuelve PHP

            setFormData((previousData) => ({

                ...previousData,

                image: data.image

            }));


        } catch (error) {

            console.error(error);

            alert(error.message);

            setImageFile(null);

        } finally {

            setUploadingImage(false);

        }

    }


    // ------------------------------------------------
    // CREAR NOTICIA
    // ------------------------------------------------

    async function handleSubmit(event) {

        event.preventDefault();


        if (!formData.title.trim()) {

            alert(
                "Debes ingresar un título."
            );

            return;

        }


        if (!formData.summary.trim()) {

            alert(
                "Debes ingresar un resumen."
            );

            return;

        }


        if (!formData.content.trim()) {

            alert(
                "Debes ingresar el contenido."
            );

            return;

        }


        if (!formData.publish_date) {

            alert(
                "Debes seleccionar una fecha."
            );

            return;

        }


        try {

            const response = await fetch(
                `${API_URL}/create.php`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        image: formData.image,

                        publish_date:
                            formData.publish_date,

                        language: language,

                        title: formData.title,

                        summary: formData.summary,

                        content: formData.content

                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "No se pudo crear la noticia."
                );

            }


            alert(
                "Noticia creada correctamente."
            );


            setShowForm(false);

            limpiarFormulario();

            obtenerNoticias();


        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    }


    // ------------------------------------------------
    // LIMPIAR FORMULARIO
    // ------------------------------------------------

    function limpiarFormulario() {

        setFormData({

            image: "",

            publish_date: "",

            title: "",

            summary: "",

            content: ""

        });

        setImageFile(null);

    }


    // ------------------------------------------------
    // ELIMINAR NOTICIA
    // ------------------------------------------------

    async function eliminarNoticia(id) {

        const confirmar = window.confirm(
            "¿Estás seguro de que quieres eliminar esta noticia?"
        );


        if (!confirmar) {
            return;
        }


        try {

            const response = await fetch(
                `${API_URL}/delete.php?id=${id}`,
                {
                    method: "DELETE"
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "No se pudo eliminar la noticia."
                );

            }


            alert(
                "Noticia eliminada correctamente."
            );


            obtenerNoticias();


        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    }


    // ------------------------------------------------
    // FORMATEAR FECHA
    // ------------------------------------------------

    function formatearFecha(fecha) {

        if (!fecha) {
            return "-";
        }


        const partes = fecha.split("-");


        if (partes.length !== 3) {
            return fecha;
        }


        return `${partes[2]}/${partes[1]}/${partes[0]}`;

    }


    // ------------------------------------------------
    // ESTADO
    // ------------------------------------------------

    function obtenerEstado(fecha) {

        if (!fecha) {
            return "Sin fecha";
        }


        const fechaPublicacion =
            new Date(`${fecha}T00:00:00`);


        const hoy = new Date();

        hoy.setHours(0, 0, 0, 0);


        if (fechaPublicacion <= hoy) {

            return "Publicada";

        }


        return "Programada";

    }


    // ------------------------------------------------
    // ABRIR FORMULARIO
    // ------------------------------------------------

    function abrirFormulario() {

        limpiarFormulario();

        setShowForm(true);

    }


    // ------------------------------------------------
    // RENDER
    // ------------------------------------------------

    return (

        <AdminLayout>

            <div className="admin-page">

                {/* CABECERA */}

                <div className="admin-page-header">

                    <div>

                        <h1>
                            Noticias
                        </h1>

                        <p>
                            Gestiona las noticias y novedades
                            del Instituto.
                        </p>

                    </div>


                    <button
                        className="admin-primary-button"
                        onClick={abrirFormulario}
                    >
                        + Agregar noticia
                    </button>

                </div>


                {/* CARGANDO */}

                {loading && (

                    <div className="admin-table-card">

                        <p>
                            Cargando noticias...
                        </p>

                    </div>

                )}


                {/* ERROR */}

                {error && (

                    <div className="admin-table-card">

                        <p>
                            {error}
                        </p>

                    </div>

                )}


                {/* TABLA */}

                {!loading && !error && (

                    <div className="admin-table-card">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>
                                        Título
                                    </th>

                                    <th>
                                        Fecha
                                    </th>

                                    <th>
                                        Estado
                                    </th>

                                    <th>
                                        Acciones
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {news.length === 0 ? (

                                    <tr>

                                        <td colSpan="4">

                                            No hay noticias
                                            registradas.

                                        </td>

                                    </tr>

                                ) : (

                                    news.map((item) => (

                                        <tr
                                            key={item.id}
                                        >

                                            <td>
                                                {item.title}
                                            </td>


                                            <td>
                                                {formatearFecha(
                                                    item.publish_date
                                                )}
                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        obtenerEstado(
                                                            item.publish_date
                                                        ) ===
                                                        "Publicada"
                                                            ? "status-active"
                                                            : "status-pending"
                                                    }
                                                >

                                                    {
                                                        obtenerEstado(
                                                            item.publish_date
                                                        )
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <button
                                                    className="admin-action-button"
                                                    onClick={() =>
                                                        alert(
                                                            "La edición la implementaremos después."
                                                        )
                                                    }
                                                >
                                                    Editar
                                                </button>


                                                <button
                                                    className="admin-delete-button"
                                                    onClick={() =>
                                                        eliminarNoticia(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                )}


                {/* MODAL */}

                {showForm && (

                    <div className="news-modal-overlay">

                        <div className="news-modal">

                            {/* CABECERA DEL MODAL */}

                            <div className="news-modal-header">

                                <div>

                                    <h2>
                                        Nueva noticia
                                    </h2>

                                    <p>
                                        Escribe la noticia
                                        en el idioma actual.
                                    </p>

                                </div>


                                <button
                                    type="button"
                                    className="news-modal-close"
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                >
                                    ×
                                </button>

                            </div>


                            <form
                                onSubmit={handleSubmit}
                            >

                                {/* INFORMACIÓN GENERAL */}

                                <div className="news-form-section">

                                    <h3>
                                        Información general
                                    </h3>


                                    {/* IMAGEN */}

                                    <label>
                                        Imagen
                                    </label>


                                    <div className="news-image-input-wrapper">

                                        <input
                                            type="text"
                                            name="image"
                                            value={
                                                uploadingImage
                                                    ? "Subiendo imagen..."
                                                    : formData.image
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="/images/news/noticia-1.jpg"
                                        />


                                        <label
                                            htmlFor="news-image"
                                            className="news-image-button"
                                        >
                                            Buscar imagen
                                        </label>


                                        <input
                                            id="news-image"
                                            type="file"
                                            accept="image/*"
                                            onChange={
                                                handleImageChange
                                            }
                                            hidden
                                        />

                                    </div>


                                    {imageFile && !uploadingImage && (

                                        <p className="news-image-name">

                                            Archivo seleccionado:
                                            {" "}
                                            {imageFile.name}

                                        </p>

                                    )}


                                    <p className="news-image-help">

                                        Puedes escribir una ruta
                                        manualmente o seleccionar
                                        una imagen desde tu PC.

                                    </p>


                                    {/* FECHA */}

                                    <label>
                                        Fecha de publicación
                                    </label>


                                    <input
                                        type="date"
                                        name="publish_date"
                                        value={
                                            formData.publish_date
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* CONTENIDO */}

                                <div className="news-form-section">

                                    <h3>
                                        Contenido
                                    </h3>


                                    <p className="news-language-info">

                                        Idioma actual:
                                        {" "}

                                        <strong>
                                            {
                                                language === "es"
                                                    ? "Español"
                                                    : "English"
                                            }
                                        </strong>

                                        <br />

                                        La versión en el otro
                                        idioma será generada
                                        automáticamente.

                                    </p>


                                    {/* TITULO */}

                                    <label>
                                        {
                                            language === "es"
                                                ? "Título"
                                                : "Title"
                                        }
                                    </label>


                                    <input
                                        type="text"
                                        name="title"
                                        value={
                                            formData.title
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />


                                    {/* RESUMEN */}

                                    <label>
                                        {
                                            language === "es"
                                                ? "Resumen"
                                                : "Summary"
                                        }
                                    </label>


                                    <textarea
                                        name="summary"
                                        value={
                                            formData.summary
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />


                                    {/* CONTENIDO */}

                                    <label>
                                        {
                                            language === "es"
                                                ? "Contenido"
                                                : "Content"
                                        }
                                    </label>


                                    <textarea
                                        name="content"
                                        className="news-content-textarea"
                                        value={
                                            formData.content
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* BOTONES */}

                                <div className="news-form-actions">

                                    <button
                                        type="button"
                                        className="admin-secondary-button"
                                        onClick={() =>
                                            setShowForm(false)
                                        }
                                    >
                                        Cancelar
                                    </button>


                                    <button
                                        type="submit"
                                        className="admin-primary-button"
                                        disabled={
                                            uploadingImage
                                        }
                                    >

                                        {uploadingImage
                                            ? "Subiendo imagen..."
                                            : "Guardar noticia"}

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

            </div>

        </AdminLayout>

    );

}

export default News;