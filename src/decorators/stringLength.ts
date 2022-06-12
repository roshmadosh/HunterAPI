import 'reflect-metadata';

export const stringLength = (data: { min: number, max: number }) => {
  return function(target: any, memberName: string) {
    if (!Reflect.hasOwnMetadata('validators', target, memberName)) {
      Reflect.defineMetadata('validators', {}, target, memberName);
    }
    let validators = Reflect.getOwnMetadata('validators', target, memberName);
    const rule = (newValue: any) => {
      if (newValue.length >= data.max || newValue.length <= data.min) {
        throw new Error(`${memberName} must be within ${data.min} and ${data.max} characters.`)
      }
      return newValue;
    }
    Object.assign(validators, { stringLength: rule });
    Reflect.defineMetadata('validators', validators, target, memberName);
  }
};