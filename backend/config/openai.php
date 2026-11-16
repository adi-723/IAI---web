<?php

class OpenAIConfig
{
    /*
     * Obtiene la API Key desde una variable
     * de entorno del servidor.
     */
    public static function getApiKey()
    {
        $apiKey = getenv("OPENAI_API_KEY");

        if (!$apiKey) {

            throw new Exception(
                "No se encontró la variable OPENAI_API_KEY."
            );

        }

        return $apiKey;
    }


    /*
     * Obtiene el modelo desde una variable
     * de entorno.
     *
     * Si no existe, usamos el modelo indicado
     * por defecto.
     */
    public static function getModel()
    {
        $model = getenv("OPENAI_MODEL");

        if (!$model) {

            $model = "gpt-6-astra";

        }

        return $model;
    }
}

?>