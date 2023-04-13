import { initializeFirebase } from './utility/firebase';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { v1 } from './api/v1/routes';
import { root } from './api/root';
import createError from 'http-errors';
import HttpException from './utility/exceptions';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

class App {
  public server: any;

  constructor() {}

  async init() {
    await initializeFirebase();
    this.server = express();

    Sentry.init({
      dsn: "https://128dcaedc5624af6a275a2ffbd0b5671@o1151739.ingest.sentry.io/6257000",
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app: this.server }),
      ],
      tracesSampleRate: 1.0,
    });
    
    this.middlewares();
    this.routes();

    // catch 404 and forward to error handler
    this.server.use(function(req: Request, res: Response, next: NextFunction) {
      next(createError(404));
    });
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(Sentry.Handlers.tracingHandler());
    this.server.use(express.json({limit: '100mb'}));
    this.server.use(express.urlencoded({extended: false, limit: '100mb'}));

    this.server.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  routes() {
    this.server.use('/v1', v1);
    this.server.use('/', root)
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

export default new App();