import path from 'path';
import fs from 'fs'
import AppError from '../utils/AppError';
import { Router } from 'express';
import { Di } from '../core/di'
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from "../utils/response"
import { catchAsync } from '../utils/catchAsync';
import { authHandler } from '../middlewares/authHandler';
export class Route {
  
  private static readonly modulesPath: string = path.join(__dirname, '../modules');
  private static readonly exclude_methods: string[] = ['constructor'];
  
  static createRoutes() {
    const router : Router = Router();
    
    router.get('/', (req: Request, res: Response) => {
      sendResponse(res, true, 200, 'Success', { desc: "Welcome to Spotify Insight API !"});
    })
    fs.readdirSync(Route.modulesPath).forEach((moduleName) => {
      const modulePath = path.join(Route.modulesPath, moduleName); 
      if(fs.statSync(modulePath).isDirectory()) {
        fs.readdirSync(modulePath).forEach((file) => {
          if (/\.controller\.ts$/.test(file)) {
            const controllerInstance = Di.createInstance(modulePath);
            if (controllerInstance) {
              const methods = Object
                .getOwnPropertyNames(controllerInstance.constructor.prototype)
                .filter((method) => !Route.exclude_methods.includes(method));
              const base_route = `/${moduleName.toLowerCase()}`;
              methods.forEach((method) => {
                let route = base_route;
                const methods_prefix = {
                  get: ['index', 'get', 'fetch', 'find'],
                  post: ['post', 'save', 'create'],
                  put: ['update', 'put'],
                  delete: ['delete', 'remove']
                } as const;
                type HttpMethod = keyof typeof methods_prefix;
                const type = (Object.keys(methods_prefix) as HttpMethod[]).find((val) =>
                  methods_prefix[val].some((prefix) => method.startsWith(prefix))
                );
                // Split method name: getTopByType → ['getTop', 'ByType']
                const [baseMethod, ...rest] = method.split('By');
                if (rest.length > 0) {
                  // Get param names: ByType → ['Type'] → ['type']
                  const paramNames = rest
                    .join('') // 'Type' or 'TypeAndYear'
                    .match(/[A-Z][a-z]+/g) // → ['Type', 'Year']
                    ?.map((p) => p.toLowerCase()) || [];
        
                  route += `/${baseMethod}`; // e.g. /user/getTop
                  if (paramNames.length > 0) {
                    route += `/${paramNames.map((p) => `:${p}`).join('/')}`; // → /:type, /:type/:year
                  }
                } else if (method === 'index') {
                  route = base_route;
                } else if (['update', 'delete'].includes(method)) {
                  route += `/${method}/:id`; // fallback
                } else {
                  route += `/${method}`;
                }
                if (type) {
                  const requireToken: boolean = Reflect.getMetadata('requireToken', controllerInstance, method) ?? true;
                  router[type]( route, authHandler(requireToken), catchAsync(controllerInstance[method].bind(controllerInstance)));
                } else {
                  // console.warn(`Unknown HTTP method for ${method} in ${base_route}`);
                }
              });
            }
          }
        });
      }
    })
    router.use((req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, 'Route Not Found'));
    });
    return router
  }
  
  
}