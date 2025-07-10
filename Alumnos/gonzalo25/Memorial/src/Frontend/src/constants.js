//#region Variables
const isProduction = True;
export const BASE_API_URL = isProduction ? 'https://memorialapp-backend-pdl7.onrender.com' : 'http://127.0.0.1:8000';

//#endregion

//#region Funciones
//Funcion Verificar Token --DEPRECATED--
// export async function verifyToken(token) {
//     try {
//         const response = await fetch(`${BASE_API_URL}/api/token/verify/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ token })
//         })

//         return true
//     } catch (error) {
//         console.error('Error verifying token:', error)
//         return false
//     }
// }

// Función que decodifica el contenido de un JWT o null

export function getJWT(token) {
    try {
        const data = JSON.parse(atob(token.split('.')[1]));
        return data;
    } catch (error) {
        console.error('Error al decodificar el JWT:', error);
        return null;
    }
}

//Funcion que refresca el token y devuelve el token actualizado o si no null

export const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) return null;

    try {
        const tokenJSON = getJWT(refresh);
        const exp = tokenJSON.exp;
        const now = Date.now() / 1000;
        if (exp < now) {
            return null;
        }
    } catch (error) {
        return null;
    }

    const res = await fetch(`${BASE_API_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh }),
    });

    if (res.ok) {
        const data = await res.json();
        localStorage.setItem('access_token', data.access);
        return data.access;
    } else {
        return null;
    }
};


//NUEVO FETCH que tiene el cuenta el token
export const authFetch = async (endpoint, method = 'GET', body = null, customHeaders = {}) => {
    let access = localStorage.getItem('access_token');

    const headers = {
        'Authorization': `Bearer ${access}`,
        ...customHeaders,
    };

    // Solo añadir Content-Type si no es FormData
    if (!(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const config = {
        method,
        headers,
    };

    if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        config.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    let res = await fetch(`${BASE_API_URL}${endpoint}`, config);

    if (res.status === 401) {
        access = await refreshToken();
        if (access) {
            headers['Authorization'] = `Bearer ${access}`;
            res = await fetch(`${BASE_API_URL}${endpoint}`, { ...config, headers });
        } else {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        }
    }

    return res;
};
//#endregion