import {Attribute, AttributeTypes, sanitizeName} from './utilities.js';

export class Function{
    /**
     * A class representing a struct/class
     * @param {string} name The name of the struct
     * @param {[]Attribute} parameters The list of attributes for the struct
     * @param {AttributeType} returnType The return Type of the function
    */
    constructor(name, parameters, returnType = ""){
        this.name = sanitizeName(name)
        this.parameters = parameters
        this.returnType = returnType
    }

    getPythonFunction(){
        let paramText = ""

        for (const currentAttribute of this.parameters){
            paramText += `${currentAttribute.getPythonVariable()},`
        }
        if (paramText.endsWith(",")){ // Remove trailing comma

        }

        let returnTypeText = () => `->${this.returnType.getPythonType()}` || "";

        const template = `
        def {{name}}({{paramText}}){{returnTypeText}}:
            ...
        `

        nunjucks.renderString(
            template, 
            {
                name:this.name, 
                paramText:paramText,
                returnTypeText:returnTypeText
            }

        )
    }
}

/**
 * The current list of Functions
 * @type {Map<string, Function>}
*/
export const currentFunctions = new Map();
