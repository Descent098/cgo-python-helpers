import {goTemplate, pyTemplate, env} from "./templates.js";
import {currentStructs, addStruct, updateStructName, renderStructs} from './structs.js';
import {addFunc, updateFunctionName, renderFunctions, currentFunctions} from "./functions.js";

// ============== Data export functions ================ \\

function exportData() {
    const structs = [...currentStructs.values()];
    const functions = [...currentFunctions.values()];

    const goOutput = env.renderString(goTemplate, { structs: structs , functions:functions});
    console.log("go", goOutput);
    
    const pythonOutput = env.renderString(pyTemplate, { classes: structs , functions:functions});
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

// ============== Initialize UI ================ \\

document.addEventListener('DOMContentLoaded', () => {
    const addStructButton = document.getElementById('add-struct-button');
    const addFunctionButton = document.getElementById('add-func-button');
    const exportButton = document.getElementById('export-button');
    
    const initialStruct = addStruct();
    updateStructName(initialStruct.structID);
    renderStructs()

    const initialFunc = addFunc();
    updateFunctionName(initialFunc.id);
    renderFunctions()

    addStructButton.addEventListener('click', () => {
        const s = addStruct();
        updateStructName(s.structID, "MyStruct");
    });

    addFunctionButton.addEventListener('click', () => {
        const s = addFunc();
        updateFunctionName(s.id, "MyFunc");
    });

    exportButton.addEventListener('click', exportData);
});

