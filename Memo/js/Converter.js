export class Converter {
    constructor () {
        
        
    }

    static strToInt(value) {
        const numbers = value.split(" ");
        const newNumbers = numbers.map(number => parseInt(number));

        return newNumbers;
    }
}