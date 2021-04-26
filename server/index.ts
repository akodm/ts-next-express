import dotenv from 'dotenv';
dotenv.config();
import next from 'next';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import moment from 'moment';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import routes from './routes';
import apiRouters from './api';

moment.locale('ko');

const port = parseInt(process.env.PORT as string || "3333", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app);

const corsOptions = {
  origin: [process.env.CLIENT as string],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200
};

app.prepare().then(() => {
  const server = express();

  server.use(cors(corsOptions));
  server.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "'unsafe-eval'"],
      styleSrc: ["'unsafe-inline'"]
    }
  }));
  server.use(logger("dev"));
  server.use(cookieParser());
  server.use(express.static(path.join(__dirname, "../public")));
  // add express session..

  server.use("/api", apiRouters);

  server.all("*", (req, res) => handler(req, res));

  server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.s ?? err.status ?? 500;
    const message = err.m ?? "서버에서 문제가 발생하여 잠시 후 시도해주세요.";

    console.log(err);

    return res.status(status).send({
      result: true,
      message,
      data: null
    });
  });

  // add socket.io..

  server.listen(port, () => {
    console.log(`NODE_ENV: ${process.env.NODE_ENV} ${port}`, moment().format("YYYY. M. D. ddd LT HH:mm:ss"));
    console.log("Next Server running.");
    process.send && process.send("ready");
  });
}).catch(err => {
  console.log("Express Server Error: ", err);
  process.exit(1);
});