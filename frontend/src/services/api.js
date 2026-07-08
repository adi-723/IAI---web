const API_URL = "http://localhost:5000/api";

export async function get(endpoint){

    const response = await fetch(`${API_URL}${endpoint}`);

    return await response.json();

}

export async function post(endpoint,data){

    const response = await fetch(`${API_URL}${endpoint}`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    });

    return await response.json();

}