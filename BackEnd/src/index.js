import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import "../database/dbconexion.js";
import auth from "./routes/authRouter.js";
const app = express();

app.use(express.json());

// ROUTES
app.use('/api/auth', auth);


// SERVER LISTENER
app.listen(process.env.PORT,()=>{
    console.log("EL SERVIDOR SE INICIO CORRECTAMENTE EN EL PUERTO : " + process.env.PORT)
});
