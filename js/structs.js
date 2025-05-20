import {sanitizeName} from './utilities.js';

export class Struct {
    /**
     * A class representing a struct/class
     * @param {string} structID The UUID of the struct
     * @param {string} name The name of the struct
     * @param {[]Attribute} attributes The list of attributes for the struct
    */
    constructor(structID, name, attributes){
        this.structID = structID;
        this.name = sanitizeName(name);
        this.attributes = attributes;
    }
}

/**
 * The current list of Struct
 * @type {Map<string, Struct>}
*/
export const currentStructs = new Map();
