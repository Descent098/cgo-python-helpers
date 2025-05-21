import {sanitizeName, checkNameIsUniqueInMap} from './utilities.js';
import {goFuncTemplate, pyFunctionTemplate, functionUI} from './templates.js';
import {Attribute, AttributeTypes} from './attributes.js'

/**
 * @typedef {"string" | "int" | "float" | ArrayType | Struct| null | undefined | ""} AttributeType
 */

export class Function{
    /**
     * A class representing a struct/class
     * @param {string} name The name of the struct
     * @param {[]Attribute} parameters The list of attributes for the struct
     * @param {AttributeType?} returnType The return Type of the function
    */
    constructor(name, parameters, returnType = new Attribute("","")){
        this.id = crypto.randomUUID()
        this.name = sanitizeName(name)
        this.parameters = parameters
        this.returnType = returnType
    }

    getPythonFunction(){
        let paramText = ""
        if (this.parameters){
            for (const currentAttribute of this.parameters){
                paramText += `${currentAttribute.getPythonVariable()},`
            }
            if (paramText.endsWith(",")){ 
                // Remove trailing comma
                paramText = paramText.replace(/,$/, '')
            }
        }

        let returnTypeText = "";
        if (this.returnType.getPythonType()??false){
            returnTypeText = `->${this.returnType.getPythonType()}`
        }

        return nunjucks.renderString(
            pyFunctionTemplate, 
            {
                name:this.name, 
                paramText:paramText,
                returnTypeText:returnTypeText
            }

        )
    }

    getGoFunction(){
        let paramText = ""
        if (this.parameters){
            for (const currentAttribute of this.parameters){
                paramText += `${currentAttribute.getGoVariable()},`
            }
            if (paramText.endsWith(",")){
                // Remove trailing comma
                paramText = paramText.replace(/,$/, '')
            }
        }

        let returnTypeText = "";
        if (this.returnType.getGoType()??false){
            returnTypeText = `${this.returnType.getGoType()}`
        }

        return nunjucks.renderString(
            goFuncTemplate, 
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

// ============== Function UI functions ================ \\

export function addFunc() {
    const newFunc = new Function("MyFunc", [new Attribute("MyAttribute", "string")])
    currentFunctions.set(newFunc.id, newFunc);
    renderFunctions(); // Re-render functions
    return newFunc
}

export function removeFunc(funcID) {
    currentFunctions.delete(funcID);
    document.getElementById(`func-${funcID}`)?.remove();
}

export function updateFunctionName(funcID) {
    // Get state values
    let value = document.getElementById(`func-name-input-${funcID}`).value
    const func = currentFunctions.get(funcID);
    let name = sanitizeName(value);
    let isUnique = checkNameIsUniqueInMap(name, currentFunctions)

    // Update state + UI
    func.name = name;
    document.getElementById(`func-name-input-${funcID}`).value = name;
    document.getElementById(`func-name-${funcID}`).innerHTML = name;

    // Disable export if duplicate function names
    currentFunctions.forEach(
        (currentFunc, key, map) =>{
            if (currentFunc.name.length <1 || !isUnique){
                document.getElementById("export-button").disabled = true
            } else{
                document.getElementById("export-button").disabled = false
            }
        }
    )
}

export function updateFunctionParameters(fieldsetElement, functionID) {
    // TODO
}


/**
 * Render/re-renders currentFunctions in the UI
 *
 * @export
 */
export function renderFunctions() {
    const functionsElement = document.getElementById("functions");
    
    // Generate new HTML
    let newHTML = "";
    for (const [id, func] of currentFunctions.entries()){
        let funcLabel = (func.name !== "MyFunc") ? func.name : `MyFunc-${func.id}`;

        newHTML += nunjucks.renderString(functionUI, {functionId:id, functionLabel:funcLabel})

    }
    // Replace existing HTML with new HTML
    functionsElement.innerHTML = newHTML;
    
    for (const [id, _] of currentFunctions.entries()){
        let parametersContainer = document.getElementById(`func-parameters-${id}`)
        let nameContainer = document.getElementById(`func-name-input-${id}`)
        parametersContainer.onchange = () => {updateFunctionParameters(parametersContainer,id)}
        nameContainer.oninput = ()=>{updateFunctionName(id)}
    }
    
    // Attach remove event listener for each func
    document.querySelectorAll(".remove-func").forEach(btn => {
        btn.onclick = () => removeFunc(btn.dataset.id);
    });

    // Attach remove event listener to add params for each func
    document.querySelectorAll(".add-param").forEach(btn => {
        btn.onclick = () => addParameter(btn.dataset.id);
    });

}
