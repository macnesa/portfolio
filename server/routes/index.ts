import path from 'path';
import fs from 'fs'
import { Router } from 'express';
import { Di } from '../core/di'
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from "../utils/response"

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
          if(/\.controller\.ts$/.test(file)){ 
            const controllerInstance = Di.createInstance(modulePath);
            if(controllerInstance) {
              const methods = Object
                .getOwnPropertyNames(controllerInstance.constructor.prototype)
                .filter((method) => !Route.exclude_methods.includes(method));
                const base_route = `/${moduleName.toLowerCase()}`;
                methods.forEach((method) => {
                  let route = method === 'index' ? base_route : `${base_route}/${method}`;
                  const byMatches = method.match(/By([A-Z][a-zA-Z]*)/g);
                  if (byMatches) {
                    let params = byMatches.map(match => match.slice(2).toLowerCase());
                    route += `/${params.map(param => `:${param}`).join('/')}`;
                  } else if(['update', 'delete'].includes(method)){
                    route += '/:id';
                  }
                  const methods_prefix = {
                    get: ['index', 'get', 'fetch', 'find'],
                    post: ['post', 'save', 'create'],
                    put: ['update', 'put'],
                    delete: ['delete', 'remove']
                  };
                  type HttpMethod = keyof typeof methods_prefix;
                  const type = (Object.keys(methods_prefix) as HttpMethod[]).find((val) =>
                    methods_prefix[val as HttpMethod].some((prefix) =>
                      method.startsWith(prefix)
                    )
                  );
                  if(type) {
                    router[type](route, controllerInstance[method].bind(controllerInstance));
                  } else {
                    // console.warn(`Unknown HTTP method for ${method} in ${base_route}`);
                  }
                });  
            }
          }
        })
      }
    })
    
    return router
  }
}