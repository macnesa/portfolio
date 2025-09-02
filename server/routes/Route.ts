import path from 'path';
import fs from 'fs';
import AppError from '../utils/AppError';
import { Router } from 'express';
import { Di } from '../core/di';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from "../utils/response";
import { catchAsync } from '../utils/catchAsync';
import { authHandler } from '../middlewares/authHandler';

export class Route {

  private static readonly modulesPath: string = path.join(__dirname, '../modules');
  private static readonly exclude_methods: string[] = ['constructor'];

  // Fungsi recursive untuk cari semua file controller 
  private static findControllerFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach((fileOrDir) => {
      const fullPath = path.join(dir, fileOrDir);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(Route.findControllerFiles(fullPath));
      } else if (/\.controller\.ts$/.test(fileOrDir)) {
        results.push(fullPath);
      }
    });
    return results;
  }

  static createRoutes() {
    const router: Router = Router();

    router.get('/', (req: Request, res: Response) => {
      sendResponse(res, true, 200, 'Success', { desc: "Welcome to Spotify Insight API !" });
    });

    // Cari semua controller file (bisa nested)
    const controllerFiles = Route.findControllerFiles(Route.modulesPath);

    controllerFiles.forEach((controllerFilePath) => {
      // Dapatkan base route dari folder relatif controller file
      const relativePath = path.relative(Route.modulesPath, controllerFilePath);
      // relativePath contoh: 'spotify/player/player.controller.ts'

      // Base route ambil dari folder controller (hapus nama file)
      const routeBase = path.dirname(relativePath);
      // Normalize ke slash dan lowercase
      const baseRoute = '/' + routeBase.replace(/\\/g, '/').toLowerCase();

      const controllerFolder = path.dirname(controllerFilePath);
      const controllerInstance = Di.createInstance(controllerFolder);

      if (!controllerInstance) return;

      const methods = Object.getOwnPropertyNames(controllerInstance.constructor.prototype)
        .filter(m => !Route.exclude_methods.includes(m));
      methods.forEach((method) => {
        let route = baseRoute;
        const methods_prefix = {
          get: ['index', 'get', 'fetch', 'find'],
          post: ['post', 'save', 'create'],
          put: ['update', 'put'],
          delete: ['delete', 'remove']
        } as const;
        type HttpMethod = keyof typeof methods_prefix;
        const type = (Object.keys(methods_prefix) as HttpMethod[]).find(val =>
          methods_prefix[val].some(prefix => method.startsWith(prefix))
        );
        
        const [baseMethod, ...rest] = method.split('By');
        if (rest.length > 0) {
          const paramNames = rest.join('')
            .match(/[A-Z][a-z]+/g)
            ?.map(p => p.toLowerCase()) || [];

          route += `/${baseMethod}`;
          if (paramNames.length > 0) {
            route += `/${paramNames.map(p => `:${p}`).join('/')}`;
          }
        } else if (method === 'index') {
          // kalau index, route = baseRoute saja
          route = baseRoute;
        } else if (['update', 'delete'].includes(method)) {
          route += `/${method}/:id`; // fallback untuk update/delete
        } else {
          route += `/${method}`;
        }
        if (type) {
          console.log("der ganze velt", route);
          
          const requireToken: boolean = Reflect.getMetadata('requireToken', controllerInstance, method) ?? true;
          router[type](route, authHandler(requireToken), catchAsync(controllerInstance[method].bind(controllerInstance)));
        } else {
          // bisa log warning kalau perlu
          // console.warn(`Unknown HTTP method for ${method} in ${baseRoute}`);
        }
      });
    });

    // 404 handler jika route tidak ditemukan
    router.use((req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, 'Route Not Found'));
    });

    return router;
  }
}
