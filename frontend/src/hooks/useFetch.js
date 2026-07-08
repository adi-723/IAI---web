import { useEffect, useState } from "react";

function useFetch(funcion){

    const [datos,setDatos]=useState([]);

    useEffect(()=>{

        async function cargar(){

            const data = await funcion();

            setDatos(data);

        }

        cargar();

    },[]);

    return datos;

}

export default useFetch;