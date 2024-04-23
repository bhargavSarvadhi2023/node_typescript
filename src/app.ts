import express, { Express } from 'express';
import fileUpload from 'express-fileupload';
import './config/database';
import * as dotenv from 'dotenv';
dotenv.config();
import { logger } from './logger/logger';
import './config/passport.jwt';
import routes from './routes/index';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session';
import { END_POINTS } from './constant';
import i18n from './locales/index';
import { ErrorHandler, decryptData } from './middleware';
import { encriptionRoutesRoutes } from './routes/encryption/encryption.routes';

const port = process.env.PORT_SERVER || 8000;
const isLocalhost = (req) => req.hostname === 'localhost'; //tempory

class AppServer {
    constructor() {
        const app: Express = express();
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json({}));
        app.use(
            fileUpload({
                limits: { fileSize: 1024 * 1024 * 1024 },
            }),
        );
        app.use(
            cors({
                origin: '*',
                credentials: true,
            }),
        );
        app.use(
            session({
                secret: process.env.SESSION_SECERET,
                resave: false,
                saveUninitialized: true,
            }),
        );
        app.use(i18n.init);
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(END_POINTS.ENC_DEC, encriptionRoutesRoutes);
        app.use((req, res, next) => {
            if (isLocalhost(req)) {
                res.locals.isLocalhost = req.hostname === 'localhost';
                // temporary for localhost
                next();
            } else {
                decryptData(req, res, next);
            }
        });

        // app.use(decryptData);
        app.use(END_POINTS.MAIN, routes);
        app.use(ErrorHandler);
        app.listen(port, () => {
            logger.info(`🚀 Server is listening on Port:- ${port}`);
        });
    }
}
new AppServer();
