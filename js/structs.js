export class Struct {
    constructor(structID, name, attributes){
        this.structID = structID;
        this.name = name;
        this.attributes = attributes;
    }
}

export class ArrayType {
    constructor(name, type){
        this.name = name;
        this.type = type;
    }
}

export class Attribute {
    constructor(name, type){
        this.name = name;
        this.type = type;
    }

    CToGoFunc(){}
    GoToCFunc(){}
    freeFunction(){}
}

export const AttributeTypes = Object.freeze({
    str: "string",
    int: "int",
    float: "float",
    array: ArrayType,
    struct: Struct,
});

export const validCharacters = [
    '_', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A',
    'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
    'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
    'x', 'y', 'z'
];

export const currentStructs = new Map();




















// class Struct{
//     /**
//      * ...
//      * @param {string} structID The UUID of the struct
//      * @param {string} name The name of the struct
//      * @param {[]Attributes} attributes The list of attributes for the struct
//      */
//     constructor(structID, name, attributes){
//         this.structID = structID
//         this.name = name
//         this.attributes = attributes
//     }
// }

// /**
//  * The current list of Struct
//  * @type {Map<string, Struct>}
//  */
// window.currentStructs = new Map();

// /**
//  * The list of Struct name/attribute safe characters
//  * @type {string[]}
//  */
// window.validCharacters = [
//     '_', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A',
//     'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
//     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
//     'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
//     'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
//     'x', 'y', 'z'
// ]

// // for (let i = 48; i < 58; i++){ // 0-9
// //     window.validCharacters.push(String.fromCharCode(i))
// // }

// // for (let i = 65; i < 91; i++){ // A-Z
// //     window.validCharacters.push(String.fromCharCode(i))
// // }

// // for (let i = 97; i < 123; i++){ // a-z
// //     window.validCharacters.push(String.fromCharCode(i))
// // }

// class ArrayType{
//     /**
//      * A type of attribute that indicates an array of another type
//      * @param {string} name The name of the array
//      * @param {AttributeType} type 
//      */
//     constructor(name, type){
//         this.name = name
//         this.type = type
//     }
// }

// /**
//  * @typedef {"string"|"int"|"float"|ArrayType|Struct} AttributeType
//  * @type {{str: AttributeType, int: AttributeType, float: AttributeType, array: ArrayType, struct:Struct}}
//  */
// const AttributeTypes = Object.freeze({
//     str: "string",
//     int: "int",
//     float: "float",
//     array: ArrayType,
//     struct:Struct,
// });
 

// class Attribute{
//     /**
//      * An attribute for a struct object
//      * @param {string} name The name of the attribute
//      * @param {AttributeType} type The type of the attribute
//      */
//     constructor(name, type){

//     }

//     CToGoFunc(){
//         // The line of code that takes the code from C to go
//     }
//     GoToCFunc(){
//         //
//     }
//     freeFunction(){
//         //
//     }
// }