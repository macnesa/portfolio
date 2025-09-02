import path from 'path'
import fs from 'fs'


interface Dependency {
  // repository: string | null,
  // service: string | null,
  controller: string | null
}

export class Di {
  static getDependency(modulePath: string) {
    
    /* must be this order */
    const dependency: Dependency = { 
      // repository: null, 
      // service: null, 
      controller: null 
    }
    
    fs.readdirSync(modulePath)
      .filter(o => fs.statSync(path.join(modulePath, o)).isFile())
      .forEach(v => {
        const file = path.join(modulePath, v);
        const type = Object.keys(dependency).find(key => new RegExp(`\\.${key}\\.(ts|js)$`).test(v)) as keyof Dependency;
        if (type) {
          dependency[type] = file
        }
      })
    return dependency
  }
  static createInstance(modulePath: string) {
    const moduleName = path.basename(modulePath),
      dependency = this.getDependency(modulePath),
      isValidClass =  (data: unknown): data is Function => typeof data === 'function' && /^class\s/.test(Function.prototype.toString.call(data));
    
    const entries = Object.entries(dependency).map(([key, val]) => {
      let def = val ? require(val as string) : null;
      def = def?.default ?? def;
      return [key, def];
    });
    
    /* order = repository, service, controller */
    const { controller } = Object.fromEntries(entries) as {
      controller: any;
    };
    
    if (![controller].every(isValidClass)) { // TCDBT #1
      console.warn(`Invalid class definition in ${Object.keys(dependency).join('/')} for module: ${moduleName}`);
      return false;
    }
    return new controller();
  }
}
