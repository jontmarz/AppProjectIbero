import express from 'express';
import cors from 'cors';
import "../database/dbconexion.js";

import  "dotenv/config"
import auth from "./routes/authRouter.js";
import problem from "./routes/problemRouter.js";
import description from "./routes/descriptionRouter.js";
import user from "./routes/userRouter.js";
import goal from "./routes/goalRouter.js";
import record from "./routes/recordRouter.js";
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
app.use('/api/dataApp/goals', middlewareToken, goal);
app.use('/api/dataApp/records', middlewareToken, record);

// SERVER LISTENER
app.listen(process.env.PORT,()=>{
    console.log("EL SERVIDOR SE INICIO CORRECTAMENTE EN EL PUERTO : " + process.env.PORT)
});
