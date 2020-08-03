import express, { Application, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import logger from 'morgan';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import helmet from 'helmet';
import requestIp from 'request-ip';
import passport from 'passport';
import configPassport from 'middlewares/passport';
import database from 'database/models';
import responseHelper from 'helper/response';
import { restRouter } from 'routes';
import dependencyInjector from './dependency-injector';
import cookieParser from 'cookie-parser';
import path from 'path';
import i18n from 'i18n';

dependencyInjector();

const app: Application = express();

if (process.env.NODE_ENV !== 'test') {
    i18n.configure({
        locales: ['th', 'en'],
        directory: __dirname + '/../locales',
        defaultLocale: 'th',
        cookie: 'lang',
        queryParameter: 'lang',
        autoReload: true,
        objectNotation: true,
        directoryPermissions: '755',
        updateFiles: true,
    })
}

app.use('/.well-known', express.static(path.join(__dirname, "/../../.well-known"), {
    dotfiles: 'allow'
}));

app.disable('x-powered-by');

app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
}

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SECRET_SESSION_TOKEN as string,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: Number(process.env.MAXAGE_SESSION_TOKEN) * 1000,
        }
    })
);

app.use(cookieParser())

if (process.env.NODE_ENV !== 'test') {
    app.use(i18n.init)
}

const formData = multer();
app.use(formData.any());

app.use(helmet());

app.use(cors());

app.use(responseHelper.middlewareResponse);

app.use(requestIp.mw())

app.use(passport.initialize());

configPassport();

if (process.env.SEQUELIZE_SYNC === 'alter') {
    database.sequelize.sync({ alter: true });
} else if (process.env.SEQUELIZE_SYNC === 'force' &&
    process.env.NODE_ENV === 'development'
) {
    database.sequelize.sync({ force: true });
}

app.use(express.static(path.join(__dirname, '/../common')));

if (process.env.NODE_ENV !== 'test') {
    app.use((req: Request, res: Response, next: NextFunction) => {
        const { lang } = req.query;
        if (!req.cookies.lang && !lang) {
            res.cookie('lang', 'th', { maxAge: 900000, httpOnly: true });
            i18n.setLocale('th');
        } else if (lang && req.cookies.lang !== lang && i18n.getLocales().includes(lang as string)) {
            res.cookie('lang', lang as string, { maxAge: 900000, httpOnly: true });
            i18n.setLocale(lang as string);
        }
        next();
    });
}

app.set("views", __dirname + "/../views");

app.set('view engine', 'ejs');

app.use('/', restRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found');
    next(error);
});
interface ErrorWithStatus extends Error {
    status?: number
}

app.use((error: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    res.json({
        status: error.status || 500,
        error: error.message
    })
})

export default app;