import {Attribute} from './attributes.js'

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

/**
 * Check that a name is unique in map, used to make sure structs/function names are unique
 *
 * @param {string} name The name that you want to check
 * @param {Map<string, Object>} map The Map to check inside
 * @returns {boolean} True if it's unique, False otherwise
 */
export function checkNameIsUniqueInMap(name, map){
    for (const id of map.keys()){
        let currentName = map.get(id).name
        if (name === currentName){
            return false
        }
    }
    return true
}
