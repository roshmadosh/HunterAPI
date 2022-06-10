import "reflect-metadata";
/**
 *  Decorator must precede all other validation decorators. Allows for multiple property decorators.
 */
export const validate = (target: any, memberName: string) => {
  let currentValue = target[memberName];
  const validators = Reflect.getOwnMetadata('validators', target, memberName);
  const composite = (newValue: any) => {
    return validators.reduce((prev: any, curr: (arg: any) => any) => curr(prev), newValue); 
  }
  Object.defineProperty(target, memberName, {
    set: (newValue: any) => {
      const validated = composite(newValue);
      currentValue = validated;
    },
    get: () => currentValue
  });
}