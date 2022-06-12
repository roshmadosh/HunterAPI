import "reflect-metadata";

/**
 *  Decorator must precede all other validation decorators. Allows for multiple property decorators.
 */

export const validate = function(target: any, memberName: string) {
  const fieldKey = `_${memberName}`;
  const validators = Reflect.getOwnMetadata('validators', target, memberName);
  const composite = (newValue: any) => {
    // if parameter not provided, check if it's required
    if (newValue == undefined) {
      return validators.required(newValue);
    }
    return Object.entries(validators).map((entry: any) => entry[1]).reduce((prev: any, curr: (arg: any) => any) => curr(prev), newValue); 
  }
  Object.defineProperty(target, memberName, {
    set: function(newValue: any) {
      this[fieldKey] = composite(newValue);
    },
    get: function() { return this[fieldKey]; }
  });
}

/**
 *  Required decorator for any class that uses property validation.
 *  It's only purpose is to remove the underscore from properties
 *  that have been validated.
 */

export function validateClass(constructor: any) {
  const original = constructor;
  const f: any = function(...args: any[]) {
    const instanceOriginal =  new original(...args);
    const removedUnderscore = Object.fromEntries(Object.entries(instanceOriginal)
      .map(entry => {
        if (entry[0].startsWith('_')) {
          return [ entry[0].substring(1), entry[1] ]
        }
        return entry;
      }));
    return removedUnderscore;
  }
  // ensures instanceof works
  f.prototype = original.prototype;
  return f;
}