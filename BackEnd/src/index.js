import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import "../database/dbconexion.js";

import auth from "./routes/authRouter.js";
import problem from "./routes/problemRouter.js";
import description from "./routes/descriptionRouter.js";
import user from "./routes/userRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

// MIDDLEWARES
import { middlewareToken } from './middlewares/middlewareToken.js'

// ROUTES
app.use('/api/auth', auth);
app.use('/api/user', middlewareToken, user);
app.use('/api/dataApp/problem-tree', middlewareToken, problem);
app.use('/api/dataApp/description', middlewareToken, description);


// SERVER LISTENER
app.listen(process.env.PORT,()=>{
    console.log("EL SERVIDOR SE INICIO CORRECTAMENTE EN EL PUERTO : " + process.env.PORT)
});
