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
    }).then(async res => {
        if (res.status < 300) return res.json()
        else throw new Error(await res.text())
    }).catch(err => {
        alert(err.message);
        console.log(err)})
}

export const useGet = async (relativePath : string, headers : any) => {
    return fetch(`${base_url}${relativePath}`, {
        method: 'GET',
        headers: {
           ...headers,
            'Content-Type': 'application/json',
        }
    }).then(async res => {
        if (res.status < 300) return res.json()
        else throw new Error(await res.text())
    }).catch(err => {
        alert(err.message);
        console.log(err)})
}
