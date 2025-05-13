//#region variables
const isProduction = false;
export const BASE_API_URL=isProduction?'SERVER':'http://127.0.0.1:8000';
//#endregion

//#region lógica
export async function verifyToken(token){
    try{
        const response = await fetch(`${BASE_API_URL}/api/token/verify/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        })
        return true;
    } catch(error) {
        console.error('Error en la verificación del token', error);
        return false;
    }
} 

export function getJWT(token){
    try{
        const data = JSON.parse(atob(token.split(".")[1]));
        return data;
    } catch(error) {
        console.error('Error a la hora de obtener el JWT', error);
        return null;
    }
}
//#endregion
