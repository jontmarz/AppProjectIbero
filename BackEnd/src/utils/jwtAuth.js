import jwt from 'jsonwebtoken';

// GENERAR TOKEN AL USUARIO
export const generarJwt = async (payload) =>{
    try {
        const expiresIn = '5h'
        const tokenGenerado = jwt.sign(
            payload,
            "" + process.env.SECRETPRIVATEKEY,
            { expiresIn }
        )
        return {tokenGenerado, expiresIn};

    } catch (error) {
        throw new Error ( "Error al generar el Token " )
    }
}


//AUTORIZACION TOKEN ENVIADO
export const verificarJwt = async ( token ) =>{
    try {
        const payload = jwt.verify(token, "" + process.env.SECRETPRIVATEKEY);
        return payload;
    } catch (error) {
        throw new Error ( "Error al verificar el Token " )
    }
}

//DECODIFICAR EL TOKEN PARA SU USO
export const decodeJwt = async ( token ) =>{
    try {
        const payload = jwt.decode(token);
        return payload;

    } catch (error) {
        throw new Error ( "Error al decodificar el Token " )
    }
}


