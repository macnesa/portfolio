import 'reflect-metadata';

export function NoAuth() {
  return function(
    value: unknown,
    context: ClassMethodDecoratorContext
  ) {
    if (context.kind === 'method') {
      const proto = context.static ? context.constructor : context.constructor.prototype;
      Reflect.defineMetadata('requireToken', false, proto, context.name);
    }
  };
}
