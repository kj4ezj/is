/* eslint {no-undef:0} */
module.exports.nullOrEmpty = thing => thing === null || thing === undefined || (Array.isArray(thing) && thing.length === 0) || (thing.constructor === Object && objectIsEmpty(thing)) || /^\s*$/.test(thing);
objectIsEmpty = obj => { for (const prop in obj) if (obj.hasOwnProperty(prop)) return false; return true; };
