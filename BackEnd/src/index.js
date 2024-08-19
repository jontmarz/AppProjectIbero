import express from 'express';
import cors from 'cors';
import "../database/dbconexion.js";
import "dotenv/config"
import { middlewareToken } from './middlewares/middlewareToken.js';
import auth from "./routes/authRouter.js";
import dataApp from "./routes/dataRouter.js";
import problem from "./routes/problemRouter.js";
import description from "./routes/descriptionRouter.js";
import justification from "./routes/justificationRouter.js";
import user from "./routes/userRouter.js";
import goal from "./routes/goalRouter.js";
import methodology from "./routes/methodologyRouter.js";
import record from "./routes/recordRouter.js";
import ethicalImpacts from "./routes/ethicalImpactRouter.js";
import review from "./routes/reviewRouter.js";
import search from "./routes/searchRouter.js";
import settingsApp from './routes/settingsAppRouter.js';
import superUser from './routes/superUserRouter.js';

const app = express();

// CORS
const whitelist = [process.env.APPSETTING_ORIGIN1];
const corsOptions = {
    origin: function (origin, callback) {
        console.log(`Origin: ${origin}`);
        if (!origin || whitelist.includes(origin)) {
            callback(null, origin);
        } else {
            callback(new Error(`No autorizado por CORS. origin: ${origin}. No autorizado`));
        }
    },
    credentials: true,
};
app.use('*', cors(corsOptions));
app.use(express.json());

// MIDDLEWARES
const middlewares = [middlewareToken];

// ROUTES
app.use('/api/auth', auth);
app.use('/api/user', middlewares, user);
app.use('/api/dataApp/problem-tree', middlewares, problem);
app.use('/api/dataApp/description', middlewares, description);
app.use('/api/dataApp/justification', middlewares, justification);
app.use('/api/dataApp/goals', middlewares, goal);
app.use('/api/dataApp/methodology', middlewares, methodology);
app.use('/api/dataApp/records', middlewares, record);
app.use('/api/dataApp/ethicalImpacts', middlewares, ethicalImpacts);
app.use('/api/dataApp/review', middlewares, review);
app.use('/api/dataApp', middlewares, dataApp);
app.use('/api/search', middlewares, search);
app.use('/api/settings', middlewares, settingsApp);
app.use('/api/superUser', middlewares, superUser);

// SERVER LISTENER
app.listen(process.env.APPSETTING_PORT, () => {
    console.log("EL SERVIDOR SE INICIO CORRECTAMENTE EN EL PUERTO : " + process.env.APPSETTING_PORT);
});
