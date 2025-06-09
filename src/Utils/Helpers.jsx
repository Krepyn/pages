/**
 * Turns given number to scientific or engineering notation string.
 * @param {number} n to be formatted
 * @param {char} typeOverride (optional) Default notation is scientific notation, but this can be overridden with an 'e' input for engineering notation
 */
export function scientificNotation(n, typeOverride = 0) {
    var tempNumber = n;
    var numberString = n+'';
    var exponent = 0;
    var typeB = 10;

    if(typeOverride == 'e')
        typeB = 1000;

    if(n >= 1000000){
        for(let i = 0, j = 0; j != -1; i++) {
            tempNumber = tempNumber / 10;
            exponent++;
            if(tempNumber < typeB)
                j = -1;
        }
        numberString = tempNumber.toFixed(2) + 'e' + exponent;
    }
    return numberString; 
}

/**
 * Floors given number to 0 by default or floorN and doesn't let it go under the value.
 * @param {number} n Number to be floored.
 * @param {number} floorN Floor number. Default = 0.
 */
export function floor(n, floorN = 0){
    if(n <= floorN)
        return floorN;    
    return n;
}