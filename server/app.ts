import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
import 'reflect-metadata';
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler';
import { Route } from './routes/Route';

class AppServer {
  public app: Application;
  private port: number;
  private clientUrl: string;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;
    this.clientUrl = process.env.CLIENT_URL || '';

    this.checkEnv();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private checkEnv() {
    if (!this.clientUrl) {
      console.error("❌ CLIENT_URL environment variable is missing. Exiting...");
      process.exit(1);
    }
  }

  private setupMiddleware() {
    this.app.use(cors({
      origin: this.clientUrl,
      credentials: true
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.options("*", (req, res) => res.sendStatus(200))
  }

  private setupRoutes() {
    this.app.use(Route.createRoutes());
    this.app.use(errorHandler);
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`
==========================================
♻️  MAC SPOTIFY SERVER launch on port ${this.port}
==========================================
      `);
    });
  }
}

const server = new AppServer();
server.start();
