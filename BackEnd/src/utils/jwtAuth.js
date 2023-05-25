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
        throw new Error ( "ERROR AL GENERAR EL TOKEN " )
    }
}


//AUTORIZACION TOKEN ENVIADO
export const verificarJwt = async ( token ) =>{
    try {
        const payload = jwt.verify(token, "" + process.env.SECRETPRIVATEKEY);
        return payload;
    } catch (error) {
        throw new Error ( "ERROR AL VERIFICAR EL TOKEN " )
    }
}

//DECODIFICAR EL TOKEN PARA SU USO
export const decodeJwt = async ( token ) =>{
    try {
        const payload = jwt.decode(token);
        return payload;

    } catch (error) {
        throw new Error ( "ERROR AL GENERAR EL TOKEN " )
    }
}


