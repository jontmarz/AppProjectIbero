import { Users } from "../models/Users.js";
import { DataApp } from "../models/DataApp.js";
import { decodeJwt } from '../utils/jwtAuth.js';

// FUNCION PARA VER DATOS DE LOS USUARIOS
export const getUsers = async (req, res) => {

    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        let tutors = await Users.find({ role: 'Docente' }, {_id: 1, fullName: 1, projects: 1});

        // console.log(payload.role, payload.id_User)
        

        if (payload.role !== 'SuperUser') {
            return res.status(403).json({
                message: `Acceso denegado, se requiere rol de superuser`,
                code : 403
            })
        }

        res.status(200).json({
            message: `Información Usuarios`,
            code : 220,
            docentes: tutors,
        })
        
    } catch (error) {
        return res.status(500).json({
            message: `Error al obtener los usuarios`,
            code : 500,
            error: error.message,
        })
    }
}

// FUNCION PARA VER DATOS DE PROYECTOS
export const getData = async (req, res) => {

    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        let dataApp = await DataApp.find({}, {_id: 1, 'goals.titleProj': 1});
        
        if (payload.role !== 'SuperUser') {
            return res.status(403).json({
                message: `Acceso denegado, se requiere rol de superuser`,
                code : 403,
            })
        } 

        res.status(200).json({
            message: `Información DataApp`,
            code : 220,
            projects: dataApp,
        })
        
    } catch (error) {
        return res.status(500).json({
            message: `Error al obtener los datos de Dataapp`,
            code : 500,
            error: error.message,
        })
    }
}

// FUNCION PARA AGREGAR PROYECTOS A UN DOCENTE
export const addProjects = async (req, res) => {
    const { id } = req.params;
    const { projects } = req.body;
    const token = req.headers.authorization.split(' ').pop();
    
    // agregar el proyecto al docente
    try {
        const payload = await decodeJwt(token);
    
        // Validar que userId y projectId existan
        if (payload.role !== 'SuperUser') {
            return res.status(403).json({
                message: `Acceso denegado, No tienes permisos para agregar proyectos a docentes`,
                code : 403,
            })
        }
        
        // Validar si el docente existe
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({
                message: `Docente no encontrado`,
                code : 404,
            })
        }
        // Validar que los proyectos existan y agregarlos al docente
        for(const projectId of projects) {
            const project = await DataApp.findById(projectId);
            if (!project) {
                return res.status(404).json({
                    message: `Proyecto con el ID ${projectId} no encontrado`,
                    code : 404,
                })
            }

            user.projects.push(projectId);
            await DataApp.findByIdAndUpdate(projectId, { $set: { tutor: user.fullName } });
        }

        await Users.findByIdAndUpdate(id, { $set: { projects } });

        res.status(200).json({
            message: `Proyecto agregado correctamente`,
            code : 200,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: `Error al agregar el proyecto al docente`,
            code : 500,
            error: error.message,
        })
    }
}