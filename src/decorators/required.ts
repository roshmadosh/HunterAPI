import "reflect-metadata";

export const required = (target: any, memberName: string) => {
  if (!Reflect.hasOwnMetadata('validators', target, memberName)) {
    Reflect.defineMetadata('validators', [], target, memberName);
  } 
  let validators = Reflect.getOwnMetadata('validators', target, memberName);
  const rule = (newValue: any) => {
    if (!newValue && newValue != 0) {
      throw new Error(`${memberName} is required.`)
    }
    if (newValue === '') {
      throw new Error(`${memberName} cannot be an empty string.`);
    }
    return newValue;
  };
  validators.push(rule);
  Reflect.defineMetadata('validators', validators, target, memberName);
}