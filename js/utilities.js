import { Struct } from './structs.js';

export class ArrayType {
    /**
     * A type of attribute that indicates an array of another type
     * @param {string} name The name of the array
     * @param {AttributeType} type 
    */
    constructor(name, type){
        this.name = sanitizeName(name);
        this.type = type;
    }

    getGoType(){
        let goType = ""
        if (this.type == "string"){
            goType = "str"
        } else if (this.type == "float"){
            goType = "float32"
        }else if (this.type ==  "int"){
            goType = this.type
        } else if (this.type == ArrayType){
            return `[]${this.type.getGoType()}`
        }
        return goType
    }

    getGoRepresentation(){
        `${this.name} ${getGoType()}`
    }

    getPythonType(){
        let innerType = ""
        if (this.type == ArrayType){
            innerType = this.type.getPythonType()
        } else if (this.type == "string"){
            innerType = "str"
        } else{
            innerType = this.type
        }
        return `list[${innerType}]`
    }

    getPythonRepresentation(){
        return `${this.name}:${getPythonType()}`
    }
}

export class Attribute {
    /**
     * An attribute for a struct object
     * @param {string} name The name of the attribute
     * @param {AttributeType} type The type of the attribute
    */
    constructor(name, type){
        this.name = sanitizeName(name);
        this.type = type;
    }

    getGoType(){
        let goType = ""
        if (this.type == "string"){
            goType = "str"
        } else if (this.type == "float"){
            goType = "float32"
        } else if (this.type ==  "int"){
            goType = this.type
        } else if (this.type == ArrayType){
            return this.type.getGoType()
        }
        return goType
    }

    getPythonType(){
        let pythonType = ""

        if (this.type == "string"){
            pythonType = "str"
        } else if (this.type ==  "int" | "float"){
            pythonType = this.type
        } else if (this.type == ArrayType){
            return this.type.getPythonType()
        }
        return pythonType
    }

    getPythonVariable(){
        // Gets the python representation to use in function signature/class definition
        return `${this.name}:${pythonType}`
    }
}

/**
 * @typedef {"string"|"int"|"float"|ArrayType|Struct} AttributeType
 * @type {{str: AttributeType, int: AttributeType, float: AttributeType, array: ArrayType, struct:Struct}}
 */
export const AttributeTypes = Object.freeze({
    str: "string",
    int: "int",
    float: "float",
    array: ArrayType,
    struct: Struct,
});

/**
 * The list of Struct name/attribute safe characters
 * @type {string[]}
*/
export const validCharacters = [
    '_', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A',
    'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
    'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
    'x', 'y', 'z'
];


/**
 * Sanitizes input to make sure it's class name/function name/variable name friendly
 *
 * @export
 * @param {string} input 
 * @returns {string} The sanitized input
 */
export function sanitizeName(input){
    let result = ""
    let firstChar = true
    for (const char of input){
        if (validCharacters.includes(char)){
            if (firstChar && ["0","1","2","3","4","5","6","7","8","9"].includes(char)){
                firstChar = false
                continue
            }
            result += char
            firstChar = false
        } else{
            firstChar = false
            result += ""
        }
    }

    return result ?? ""
}
