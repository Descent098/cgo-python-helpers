import { Struct } from './structs.js';
import { sanitizeName } from './utilities.js';

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
        if (this.type == "string" || this.type == "str"){
            goType = "string"
        } else if (this.type == "float" || this.type=="float32"){
            goType = "float32"
        }else if (this.type ==  "int"){
            goType = "int"
        } else if (this.type == ArrayType){
            return `[]${this.type.getGoType()}`
        }
        return goType
    }

    getGoVariable(){
        `${this.name} ${getGoType()}`
    }

    getPythonType(){
        let innerType = ""
        if (this.type == ArrayType){
            innerType = this.type.getPythonType()
        } else if (this.type == "string" || this.type =="str"){
            innerType = "str"
        } else{
            innerType = this.type
        }
        return `list[${innerType}]`
    }

    getPythonVariable(){
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
        if (this.type == "string" | "str"){
            goType = "string"
        } else if (this.type == "float" | "float32"){
            goType = "float32"
        } else if (this.type ==  "int"){
            goType = this.type
        } else if (this.type == ArrayType){
            return this.type.getGoType()
        } else if ([null|undefined|""].includes(this.type)){
            return ""
        }
        return goType
    }

    getGoVariable(){
        // Gets the python representation to use in function signature/class definition
        return `${this.name} ${this.getGoType()}`
    }

    getPythonType(){
        let pythonType = ""

        if (this.type == "string" | "str"){
            pythonType = "str"
        } else if (this.type ==  "int" | "float"){
            pythonType = this.type
        } else if (this.type == ArrayType){
            return this.type.getPythonType()
        } else if ([null|undefined|""].includes(this.type)){
            return "None"
        }
        return pythonType
    }

    getPythonVariable(){
        // Gets the python representation to use in function signature/class definition
        return `${this.name}:${this.getPythonType()}`
    }
}

/**
 * @typedef {"string" | "int" | "float" | ArrayType | Struct} AttributeType
 * @type {{str: AttributeType, int: AttributeType, float: AttributeType, array: ArrayType, struct:Struct, none:null|undefined|""}}
 */
export const AttributeTypes = Object.freeze({
    str: "string",
    int: "int",
    float: "float",
    array: ArrayType,
    struct: Struct,
    none: null|undefined|""
});