import { get } from "./api";

export async function obtenerPapers(){

    return await get("/papers");

}