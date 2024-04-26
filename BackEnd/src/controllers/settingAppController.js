import { SettingsApp } from '../models/SettingsApp.js';
import { decodeJwt } from '../utils/jwtAuth.js';

// Ver configuración de la aplicación
export const settingAppView = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// Crear configuración de la aplicación
export const settingAppCreate = async (req, res) => {
    try {
        const data = req.body;
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        const role = payload.role;
        
        // Validar si el usuario es SuperUser
        if (role === "SuperUser") {
            const settingApp = new SettingsApp(data);
            await settingApp.save();
            res.status(200).json({
                message: "SettingsApp saved successfully",
                role,
                settingApp
            });
        } else {
            // Usuario no encontrado o no autorizado
            res.status(401).json({ message: "Unauthorized" });
        }

    } catch (error) {
        res.status(410).json({
            message: "Error al guardar la configuración de la aplicación",
            error
        });
    }
}