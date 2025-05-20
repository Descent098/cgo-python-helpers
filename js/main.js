import {Attribute, AttributeTypes, sanitizeName, checkNameIsUniqueInMap} from './utilities.js';
import {Struct, currentStructs} from './structs.js';
import {goTemplate, pyTemplate, env} from "./templates.js";



// ============== Struct UI functions ================ \\

/**
 * Allows you to add a struct to the UI and global currentStructs
 *
 * @returns {Struct} the struct instance created 
 */
function addStruct(){
    // Create struct data
    const structElement = document.getElementById("structs");
    const structID = crypto.randomUUID();
    const structInstance = new Struct(structID, "MyStruct", [new Attribute("myAttribute", AttributeTypes.str)]);

    // Add struct to global mapping
    currentStructs.set(structID, structInstance);

    // Generate new HTML
    let newHTML = "";
    for (const [id, struct] of currentStructs.entries()){
        let structLabel = (struct.name !== "MyStruct") ? struct.name : `Struct (${struct.structID})`;

        newHTML += `
            <article id="struct-${id}">
                <div class="struct-bar">
                    <div><h4 id="struct-name-${id}">${structLabel}</h4></div>
                    <div><button data-id="${id}" class="remove-struct" style="background:transparent;border-color:transparent;">❌</button></div>
                </div>
                <form id="struct-data-${id}" action="">
                    <input id="struct-name-input-${id}" value="${struct.name}" type="text" name="name" placeholder="Struct Name" required>
                    <small>If your struct doesn't start with a capital, Go will consider it to be private</small>
                    <article>
                        <details><summary>Attributes</summary>
                            <fieldset id="struct-attributes-${id}">
                                <input type="text" name="name" placeholder="Attribute Name" value="myAttribute">
                                <select name="type" aria-label="Select" required>
                                    <option disabled value="">Select Attribute Type</option>
                                    <option selected value="string">String</option>
                                    <option value="int">Int</option>
                                    <option value="float">Float</option>
                                    <option value="array">Array</option>
                                </select>
                            </fieldset>
                        </details>
                    </article>
                </form>
            </article>
        `;
    }
    // Replace existing HTML with new HTML
    structElement.innerHTML = newHTML;

    for (const [id, _] of currentStructs.entries()){
        let attributesContainer = document.getElementById(`struct-attributes-${id}`)
        let nameContainer = document.getElementById(`struct-name-input-${id}`)
        attributesContainer.onchange = () => {updateStructAttributes(attributesContainer,id)}
        nameContainer.oninput = ()=>{updateStructName(id)}
    }

    // Attach remove event listener for each struct
    document.querySelectorAll(".remove-struct").forEach(btn => {
        btn.onclick = () => removeStruct(btn.dataset.id);
    });

    return structInstance;
}

/**
 * Removes a struct
 * @param {string} structID The UUID of the struct
 */
function removeStruct(structID){
    currentStructs.delete(structID);
    const element = document.getElementById(`struct-${structID}`);
    if (element) element.remove();
}

/**
 * Takes in a struct ID and updates it's values based on the UI state
 *
 * @param {string} structID 
 */
function updateStructName(structID){
    let value = document.getElementById(`struct-name-input-${structID}`).value
    const struct = currentStructs.get(structID);
    let name = sanitizeName(value);
    let isUnique = checkNameIsUniqueInMap(name, currentStructs)
    struct.name = name;

    document.getElementById(`struct-name-input-${structID}`).value = name;
    document.getElementById(`struct-name-${structID}`).textContent = name;
    currentStructs.forEach(
        (currentStruct, key, map) =>{
            if (currentStruct.name.length <1 || !isUnique){
                document.getElementById("export-button").disabled = true
            } else{
                document.getElementById("export-button").disabled = false
            }
        }
    )
    
}

/**
 * Updates the struct attributes of specified struct
 * @param {HTMLFieldSetElement} fieldSetElement The element that contains the attributes
 * @param {string} structID The ID of the struct
 */
function updateStructAttributes(fieldSetElement, structID){
    let structInstance = currentStructs.get(structID)
    console.log(structInstance, fieldSetElement.elements)
    let newHTML = ""
    let name = fieldSetElement.elements[0].value ?? "myAttribute"
    let type = fieldSetElement.elements[1].value ?? "string"

    
    if (name.length < 1){
        name = "myAttribute"
    }

    if (type.length < 1){
        type = "string"
    }

    let arrayType = ""
    if (type==="array"){
        if (fieldSetElement.elements.length > 2){
            arrayType = fieldSetElement.elements[2].value ?? "string"
        } else{
            arrayType = "string"
        }
    }

    // Update class

    // Re-render
    // Utility to mark selected option
    function getSelectedOption(value, label) {
        return `<option value="${value}"${value === type ? ' selected' : ''}>${label}</option>`;
    }

    newHTML = `
    <input type="text" name="name" placeholder="Attribute Name" value="${name}">
    <select name="type" aria-label="Select" required>
        <option disabled value="">Select Attribute Type</option>
        ${getSelectedOption("string", "String")}
        ${getSelectedOption("int", "Int")}
        ${getSelectedOption("float", "Float")}
        ${getSelectedOption("array", "Array")}
    </select>
    `;

    // Handle array subtype if needed
    console.log(type==="array")
    if (type === "array") {
        const subtypeOptions = ["String", "Int", "Float"];
        newHTML += `<select name="subtype" aria-label="Select" required>
            <option disabled value="">Select Array Type</option>
            ${subtypeOptions.map(opt => `<option${opt.toLowerCase() === arrayType ? ' selected' : ''}>${opt}</option>`).join("")}
        </select>`;
    } 

    fieldSetElement.innerHTML = newHTML
}

// ============== Data export functions ================ \\

function exportData() {
    const structs = [...currentStructs.values()];

    const goOutput = env.renderString(goTemplate, { structs: structs });
    console.log("go", goOutput);
    
    const pythonOutput = env.renderString(pyTemplate, { classes: structs });
    console.log("python", pythonOutput);
    
}

function exportFile(data){
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'structs.go';
    a.click();
    URL.revokeObjectURL(url);
}

// ============== Initialize Listeners ================ \\
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-struct-button');
    const exportButton = document.getElementById('export-button');
    
    const initialStruct = addStruct();
    updateStructName(initialStruct.structID, "MyStruct");

    addButton.addEventListener('click', () => {
        const s = addStruct();
        updateStructName(s.structID, "MyStruct");
    });

    exportButton.addEventListener('click', exportData);

});



