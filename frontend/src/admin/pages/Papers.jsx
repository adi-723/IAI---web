import { useState } from "react";
import { createPortal } from "react-dom";

import AdminLayout from "../components/AdminLayout";

import { useLanguage } from "../../context/LanguageContext";

import es from "../translations/es";
import en from "../translations/en";

import "../styles/AdminPapers.css";


function Papers() {

    const { language } = useLanguage();

    const t = language === "es" ? es : en;


    // =====================================================
    // ESTADOS
    // =====================================================

    const [showModal, setShowModal] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const [uploading, setUploading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    // =====================================================
    // ABRIR MODAL
    // =====================================================

    function handleOpenModal() {

        setShowModal(true);

        setSelectedFile(null);

        setMessage("");

        setError("");

    }


    // =====================================================
    // SELECCIONAR PDF
    // =====================================================

    function handleFileChange(event) {

        const file = event.target.files[0];

        setMessage("");

        setError("");


        if (!file) {

            setSelectedFile(null);

            return;

        }


        // Verificar que sea PDF

        if (
            file.type !== "application/pdf" &&
            !file.name.toLowerCase().endsWith(".pdf")
        ) {

            setSelectedFile(null);

            setError(
                t.papers.invalidPdf ||
                "Only PDF files are allowed."
            );

            event.target.value = "";

            return;

        }


        // Máximo 20 MB

        const maxSize = 20 * 1024 * 1024;


        if (file.size > maxSize) {

            setSelectedFile(null);

            setError(
                t.papers.pdfTooLarge ||
                "The PDF cannot exceed 20 MB."
            );

            event.target.value = "";

            return;

        }


        setSelectedFile(file);

    }


    // =====================================================
    // SUBIR PDF
    // =====================================================

    async function handleUpload() {

        setMessage("");

        setError("");


        if (!selectedFile) {

            setError(
                t.papers.requiredPdf ||
                "Please select a PDF file."
            );

            return;

        }


        try {

            setUploading(true);


            // =================================================
            // 1. SUBIR PDF AL SERVIDOR
            // =================================================

            const formData = new FormData();

            formData.append(
                "paper",
                selectedFile
            );


            const uploadResponse = await fetch(
                "http://localhost:5000/api/papers/upload.php",
                {
                    method: "POST",
                    body: formData
                }
            );


            const uploadData =
                await uploadResponse.json();


            if (
                !uploadResponse.ok ||
                !uploadData.success
            ) {

                throw new Error(
                    uploadData.error ||
                    "Could not upload the PDF."
                );

            }


            // =================================================
            // 2. INFORMAR QUE SE SUBIÓ
            // =================================================

            setMessage(
                "PDF uploaded. Analyzing with AI..."
            );


            // =================================================
            // 3. ANALIZAR PDF CON OPENAI
            // =================================================

            const analyzeResponse = await fetch(
                "http://localhost:5000/api/papers/analyze.php",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        file: uploadData.file

                    })

                }
            );


            const analyzeData =
                await analyzeResponse.json();


            if (
                !analyzeResponse.ok ||
                !analyzeData.success
            ) {

                throw new Error(
                    analyzeData.error ||
                    "Could not analyze the PDF."
                );

            }


            // =================================================
            // 4. MOSTRAR RESULTADO
            // =================================================

            console.log(
                "Paper analizado:",
                analyzeData.paper
            );


            setMessage(
                "Paper analyzed successfully."
            );


            /*
            * POR AHORA:
            *
            * solamente mostramos el resultado
            * en la consola.
            *
            * En el siguiente paso vamos a mostrarlo
            * dentro del modal y permitir revisarlo.
            */

            console.log(
                "Título:",
                analyzeData.paper.title
            );

            console.log(
                "Autores:",
                analyzeData.paper.authors
            );

            console.log(
                "Abstract:",
                analyzeData.paper.abstract
            );

            console.log(
                "Keywords:",
                analyzeData.paper.keywords
            );

            console.log(
                "Journal:",
                analyzeData.paper.journal
            );

            console.log(
                "Fecha:",
                analyzeData.paper.publication_date
            );

            console.log(
                "DOI:",
                analyzeData.paper.doi
            );


        } catch (error) {

            console.error(
                "Error procesando paper:",
                error
            );


            setError(
                error.message ||
                "Could not process the paper."
            );


        } finally {

            setUploading(false);

        }

    }


    // =====================================================
    // CERRAR MODAL
    // =====================================================

    function handleCloseModal() {

        if (uploading) {

            return;

        }


        setShowModal(false);

        setSelectedFile(null);

        setMessage("");

        setError("");

    }


    // =====================================================
    // MODAL
    // =====================================================

    function PaperModal() {

        if (!showModal) {

            return null;

        }


        return createPortal(

            <div
                className="papers-modal-overlay"
                onMouseDown={(event) => {

                    /*
                     * Si hacemos click directamente
                     * sobre el fondo oscuro, cerramos.
                     */

                    if (
                        event.target === event.currentTarget &&
                        !uploading
                    ) {

                        handleCloseModal();

                    }

                }}
            >

                <div
                    className="papers-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="papers-modal-title"
                    onMouseDown={(event) => {

                        /*
                         * Evita que el click dentro
                         * del modal llegue al overlay.
                         */

                        event.stopPropagation();

                    }}
                >

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="papers-modal-header">

                        <div className="papers-modal-heading">

                            <h2 id="papers-modal-title">

                                {t.papers.add || "Add paper"}

                            </h2>


                            <p>

                                {t.papers.uploadDescription ||
                                    "Select the publication PDF. The paper information will be analyzed automatically."}

                            </p>

                        </div>


                        <button
                            type="button"
                            className="papers-modal-close"
                            onClick={handleCloseModal}
                            disabled={uploading}
                            aria-label="Close"
                        >

                            ×

                        </button>

                    </div>


                    {/* =================================================
                        BODY
                    ================================================= */}

                    <div className="papers-modal-body">

                        <div className="papers-form-group">

                            <label htmlFor="paper-pdf">

                                {t.papers.pdfFile || "PDF file"}

                            </label>


                            <input
                                id="paper-pdf"
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={handleFileChange}
                                disabled={uploading}
                            />


                            <small>

                                {t.papers.pdfHelp ||
                                    "Only PDF files up to 20 MB are allowed."}

                            </small>

                        </div>


                        {/* ARCHIVO SELECCIONADO */}

                        {selectedFile && (

                            <div className="papers-selected-file">

                                <div className="papers-selected-file-icon">

                                    PDF

                                </div>


                                <div className="papers-selected-file-info">

                                    <strong>

                                        {t.papers.selectedFile ||
                                            "Selected file"}

                                    </strong>


                                    <span>

                                        {selectedFile.name}

                                    </span>


                                    <small>

                                        {(
                                            selectedFile.size /
                                            (1024 * 1024)
                                        ).toFixed(2)}{" "}
                                        MB

                                    </small>

                                </div>

                            </div>

                        )}


                        {/* ERROR */}

                        {error && (

                            <div className="papers-message papers-message-error">

                                {error}

                            </div>

                        )}


                        {/* ÉXITO */}

                        {message && (

                            <div className="papers-message papers-message-success">

                                {message}

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <div className="papers-modal-footer">

                        <button
                            type="button"
                            className="papers-button papers-button-secondary"
                            onClick={handleCloseModal}
                            disabled={uploading}
                        >

                            {t.papers.cancel || "Cancel"}

                        </button>


                        <button
                            type="button"
                            className="papers-button papers-button-primary"
                            onClick={handleUpload}
                            disabled={uploading}
                        >

                            {uploading
                                ? (
                                    t.papers.uploading ||
                                    "Uploading..."
                                )
                                : (
                                    t.papers.upload ||
                                    "Upload PDF"
                                )
                            }

                        </button>

                    </div>

                </div>

            </div>,

            document.body

        );

    }


    // =====================================================
    // PÁGINA
    // =====================================================

    return (

        <AdminLayout>

            <div className="admin-page">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="admin-page-header">

                    <div>

                        <h1>

                            {t.papers.title}

                        </h1>


                        <p>

                            {t.papers.description}

                        </p>

                    </div>


                    <button
                        type="button"
                        className="admin-primary-button"
                        onClick={handleOpenModal}
                    >

                        + {t.papers.add}

                    </button>

                </div>


                {/* =================================================
                    TABLA
                ================================================= */}

                <div className="admin-table-card">

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>

                                    {t.papers.titleColumn}

                                </th>


                                <th>

                                    {t.papers.researchers}

                                </th>


                                <th>

                                    {t.papers.year}

                                </th>


                                <th>

                                    {t.papers.status}

                                </th>


                                <th>

                                    {t.papers.actions}

                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr>

                                <td>

                                    Modelo de IA para clasificación de imágenes médicas

                                </td>


                                <td>

                                    2

                                </td>


                                <td>

                                    2026

                                </td>


                                <td>

                                    <span className="status-active">

                                        {t.papers.published}

                                    </span>

                                </td>


                                <td className="papers-actions">

                                    <button type="button">

                                        {t.papers.edit}

                                    </button>


                                    <button
                                        type="button"
                                        className="papers-delete-button"
                                    >

                                        {t.papers.delete}

                                    </button>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>


            </div>


            {/* =====================================================
                MODAL

                IMPORTANTE:
                Este componente se monta mediante createPortal
                directamente en document.body.
            ===================================================== */}

            <PaperModal />

        </AdminLayout>

    );

}


export default Papers;