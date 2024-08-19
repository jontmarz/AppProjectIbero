import { DataApp } from "../models/DataApp.js";
import { Users } from "../models/Users.js";
import { generarJwt, decodeJwt } from "../utils/jwtAuth.js";

// FUNCION PARA CREAR UN USUARIO NUEVO
export const signup = async ( req , res ) => {
    try {
        const request = {... req.body};
        let dataApp = new DataApp();

        // Verificar si hay usuarios en la base de datos
        let users = await Users.find({});
        if (users.length > 0) {
            // Verificar si el usuario ya existe
            let user = await Users.findOne({ emailI: request.emailI })
            if (user) {
                return res.status(400).json({
                    message: "Ya existe un usuario con este correo electrónico",
                    code: 410
                })
            }
        }
        
        // Si no hay datos en Users, se crea un nuevo usuario con rol de SuperUser
        if (users.length === 0) {
            // Eliminar el campo role del objeto request
            delete request.role;
            request.role = "SuperUser"
        }

        // Verifica si está autorizado para asignar proyectos
        if (request.role !== 'Docente') {
            // Eliminar el campo projects del objeto request
            delete request.projects;
        } 

        // Crear un nuevo usuario
        let user = new Users(request);
        await user.save();

        // Guardar el id del usuario en la colección DataApp
        if (request.role === "Estudiante") {
            dataApp.set({ "user": user._id });
            await dataApp.save();
        }

        // Se genera el token de autenticación
        const payload = {
            'id_User': user._id,
            'role': user.role
        }
        const { tokenGenerado, expiresIn } = await generarJwt(payload);

        // Se envía la respuesta al cliente
        return res.status(200).json({
            message: "Registro de usuario realizado con exito",
            code: 220,
            token: {
                tokenid: tokenGenerado,
                expires: expiresIn,
            }
        })
    } catch (e) {
        // En caso de error, se envía la respuesta al cliente
        return res.status(500).json({
            status: 500,
            message: e.message
        })
    }
}

// FUNCION PARA LOGEO DE USUARIOS
export const login = async ( req , res ) => {
    try {
        const { emailI, password } = req.body;
        let user = await Users.findOne({ emailI })

        // Verificar si el usuario existe y si los datos son correctos
        if (!user || !(await user.comparePassword(password))) {
            return res.status(420).json({
                message: "El usuario o contraseña incorrectos",
                code: 420
            })
        }
        // Si el usuario existe y los datos son correctos, se genera el token de autenticación
        const payload ={
            'id_User' : user._id,
            'role' : user.role
        }
        const {tokenGenerado, expiresIn} = await generarJwt(payload);

        // Verificar si el usuario ya tiene datos en la ficha de investigación
        let userDataApp = await DataApp.findOne({user: user._id});
        // console.log(user.role, userDataApp, user._id);
        
        if (user.role === "Docente") {
            // Si el usuario es docente
            return res.status(200).json({
                message: "LOG-IN docente fue realizado con exito. Revisa tu perfil de usuario",
                code: 210,
                token: {
                    tokenid: tokenGenerado,
                    expires: expiresIn,
                }
            })
        } else if(user.role === "SuperUser") {
            return res.status(200).json({
                message: "LOG-IN Super Usuario fue realizado con exito. Revisa tu perfil de usuario",
                code: 240,
                token: {
                    tokenid: tokenGenerado,
                    expires: expiresIn,
                }
            })
        } else if(!userDataApp) {
            // Si el usuario no tiene datos en la ficha de investigación
            return res.status(200).json({
                message: "LOG-IN fue realizado con exito, puedes ingresar los datos de tu ficha de investigación",
                code: 230,
                token: {
                    tokenid: tokenGenerado,
                    expires: expiresIn,
                }
            })
        } else {
            // Si el usuario ya tiene datos en la ficha de investigación
            return res.status(200).json({
                message: "LOG-IN estudiante fue realizado con exito. Revisa tu perfil de usuario",
                code: 220,
                token: {
                    tokenid: tokenGenerado,
                    expires: expiresIn,
                }
            })
        }
    } catch (e) {
        // En caso de error, se envía la respuesta al cliente
        return res.status(420).json({
            message: e.message,
            code:420
        })
    }
}

// FUNCIÓN PARA ELIMINAR EL USUARIO Y LA FICHA DE INVESTIGACIÓN
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);        

        // Validar si el usuario actual es SuperUser
        if (payload.role !== 'SuperUser') {
            return res.status(403).json({
                message: `Acceso denegado, No tienes permisos para realizar esta acción`,
                code : 403
            })
        }

        // Buscar y eliminar el usuario de la colección Users
        const user = await Users.findByIdAndDelete(id);
        if (!user) {
            return res.status(410).json({
                message: "Usuario no encontrado",
                code: 410
            })
        }

        // Eliminar el registro de la ficha de investigación
        const dataApp = await DataApp.findOneAndDelete({user: id});
        if (!dataApp) {
            return res.status(410).json({
                message: "Ficha de investigación no encontrada",
                code: 410
            })
        }

        return res.status(200).json({
            message: "Usuario y su registro asociado a la ficha de investigación fueron eliminados exitosamente",
            code: 200
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            code: 500
        })
    }
}

// FUNCION PARA LOGEO DE USUARIOS
export const logout = async ( req , res ) => {
    try {
        res.clearCookie("refreshCookies ");
        return res.status(210).json({
            code: 210,
            message: {ok: true} });
    } catch (e) {
        return res.status(410).json({
            code:410,
            message: e.message
        })
    }
}
