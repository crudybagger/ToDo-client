const base_url = import.meta.env.VITE_API_URL || 'http://localhost:3000'


export const usePost = async (relativePath : string, headers : any, data : any) => {
    return fetch(`${base_url}${relativePath}`, {
        method: 'POST',
        headers: {
           ...headers,
            'Content-Type': 'application/json',
        },
        // credentials: 'same-origin',
        body: JSON.stringify(data),
    }).then(res => res.json()).catch(err => {alert(err);console.log(err)})
}

export const useGet = async (relativePath : string, headers : any) => {
    return fetch(`${base_url}${relativePath}`, {
        method: 'GET',
        headers: {
           ...headers,
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}
