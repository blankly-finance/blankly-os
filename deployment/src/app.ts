import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { authRouter, projectRouter, modelRouter, privateRouter } from './routes';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { initializeFirebase } from './utility/firebase';
import HttpException from './utility/exceptions';
import {authKubernetes} from "./functions/kubernetes_auth";
import {initKube} from './utility/kubernetes'
const { errors } = require('celebrate');
const cors = require('cors')

dotenv.config();
class App {
  public server: any;

  constructor() {}

  async init () {
    await initializeFirebase()
    await authKubernetes()
    await initKube()
    this.server = express();

    await Sentry.init({
      dsn: "https://addc5d2ab3c14d44aba46be5529fb1d3@o1151739.ingest.sentry.io/6257005",
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app: this.server }),
      ],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });

    await this.middlewares();

    await this.server.use('/auth', authRouter);
    await this.server.use('/private', privateRouter)

    await this.authwares();
    await this.routes();

    // catch 404 and forward to error handler
    await this.server.use(function(req: Request, res: Response, next: NextFunction) {
      next(createError(404));
    });
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(Sentry.Handlers.tracingHandler());
    this.server.use(express.json());
    this.server.use(cors({
      origin: '*',
      methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
    }))
    this.server.use(express.urlencoded({extended: false}));
    this.server.use(cookieParser());
    this.server.use(errors())

    this.server.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token");
      next();
    });
  }
  
  authwares() {
    this.server.use(function (req: Request, res: Response, next: NextFunction) {
      if ('token' in req.headers) {
        const token: string = req.headers.token as string;
        if (token.length > 0) {
          admin
            .auth()
            .verifyIdToken(token, false)
            .then((decodedClaims) => {
              // The token's UID from token here
              req.headers.uid = decodedClaims.uid
              next();
            })
            .catch((error) => {
              next(createError(401));
            });
        } else {
          next(createError(401));
        }
      } else {
        next(createError(401))
      }
    });
  }

  routes() {
    this.server.use('/model', modelRouter);
    this.server.use('/project', projectRouter);
  }

  errors() {
    // catch 404 and forward to error handler
    this.server.use(function(req: Request, res: Response, next: NextFunction) {
      next(createError(404));
    });
    // error handler
    this.server.use(function(err: HttpException, req: Request, res: Response, next: NextFunction) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = err;

      // render the error page
      res.status(err.status || 500);
      res.json({'status': 500, 'message': "There was an error with your request"});
    });
  }
}

export default new App()