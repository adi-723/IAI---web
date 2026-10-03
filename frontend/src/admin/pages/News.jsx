import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";

import { useLanguage } from "../../context/LanguageContext";

import es from "../translations/es";
import en from "../translations/en";

import "../styles/AdminPages.css";

const API_URL = "http://localhost:5000/api/news";

function News() {

    // ------------------------------------------------
    // IDIOMA
    // ------------------------------------------------

    const { language } = useLanguage();

    const t = language === "es" ? es : en;


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
                    t.news.loadError
                );

            }


            const data = await response.json();

            setNews(data);


        } catch (error) {

            console.error(error);

            setError(
                t.news.loadError
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
                t.news.invalidImage
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


            let data = {};

            try {

                data = await response.json();

            } catch {

                data = {};

            }


            if (!response.ok) {

                throw new Error(
                    t.news.uploadError
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

            alert(
                t.news.uploadError
            );

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


        // Validar título

        if (!formData.title.trim()) {

            alert(
                t.news.requiredTitle
            );

            return;

        }


        // Validar resumen

        if (!formData.summary.trim()) {

            alert(
                t.news.requiredSummary
            );

            return;

        }


        // Validar contenido

        if (!formData.content.trim()) {

            alert(
                t.news.requiredContent
            );

            return;

        }


        // Validar fecha

        if (!formData.publish_date) {

            alert(
                t.news.requiredDate
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


            let data = {};

            try {

                data = await response.json();

            } catch {

                data = {};

            }


            if (!response.ok) {

                throw new Error(
                    t.news.createError
                );

            }


            alert(
                t.news.createdSuccess
            );


            setShowForm(false);

            limpiarFormulario();

            obtenerNoticias();


        } catch (error) {

            console.error(error);

            alert(
                t.news.createError
            );

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
            t.news.confirmDelete
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


            let data = {};

            try {

                data = await response.json();

            } catch {

                data = {};

            }


            if (!response.ok) {

                throw new Error(
                    t.news.deleteError
                );

            }


            alert(
                t.news.deletedSuccess
            );


            obtenerNoticias();


        } catch (error) {

            console.error(error);

            alert(
                t.news.deleteError
            );

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

            return t.news.noDate;

        }


        const fechaPublicacion =
            new Date(`${fecha}T00:00:00`);


        const hoy = new Date();

        hoy.setHours(0, 0, 0, 0);


        if (fechaPublicacion <= hoy) {

            return t.news.published;

        }


        return t.news.scheduled;

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
                            {t.news.title}
                        </h1>

                        <p>
                            {t.news.description}
                        </p>

                    </div>


                    <button
                        className="admin-primary-button"
                        onClick={abrirFormulario}
                    >
                        + {t.news.add}
                    </button>

                </div>


                {/* CARGANDO */}

                {loading && (

                    <div className="admin-table-card">

                        <p>
                            {t.news.loading}
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
                                        {t.news.titleColumn}
                                    </th>

                                    <th>
                                        {t.news.date}
                                    </th>

                                    <th>
                                        {t.news.status}
                                    </th>

                                    <th>
                                        {t.news.actions}
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {news.length === 0 ? (

                                    <tr>

                                        <td colSpan="4">

                                            {t.news.noNews}

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
                                                        t.news.published
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
                                                            t.news.editComingSoon
                                                        )
                                                    }
                                                >

                                                    {t.news.edit}

                                                </button>


                                                <button
                                                    className="admin-delete-button"
                                                    onClick={() =>
                                                        eliminarNoticia(
                                                            item.id
                                                        )
                                                    }
                                                >

                                                    {t.news.delete}

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
                                        {t.news.newNews}
                                    </h2>

                                    <p>
                                        {t.news.currentLanguageDescription}
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
                                        {t.news.generalInformation}
                                    </h3>


                                    {/* IMAGEN */}

                                    <label>
                                        {t.news.image}
                                    </label>


                                    <div className="news-image-input-wrapper">

                                        <input
                                            type="text"
                                            name="image"
                                            value={
                                                uploadingImage
                                                    ? t.news.uploadingImage
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
                                            {t.news.searchImage}
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

                                            {t.news.fileSelected}
                                            {" "}
                                            {imageFile.name}

                                        </p>

                                    )}


                                    <p className="news-image-help">

                                        {t.news.imageHelp}

                                    </p>


                                    {/* FECHA */}

                                    <label>
                                        {t.news.publishDate}
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
                                        {t.news.content}
                                    </h3>


                                    <p className="news-language-info">

                                        {t.news.currentLanguage}
                                        {": "}

                                        <strong>

                                            {
                                                language === "es"
                                                    ? "Español"
                                                    : "English"
                                            }

                                        </strong>

                                        <br />

                                        {t.news.otherLanguageNotice}

                                    </p>


                                    {/* TITULO */}

                                    <label>
                                        {t.news.titleField}
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
                                        {t.news.summary}
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
                                        {t.news.contentField}
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
                                        {t.news.cancel}
                                    </button>


                                    <button
                                        type="submit"
                                        className="admin-primary-button"
                                        disabled={
                                            uploadingImage
                                        }
                                    >

                                        {uploadingImage
                                            ? t.news.uploadingImage
                                            : t.news.saveNews}

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