import { Converter } from "./Converter.js";

const $ = document.querySelector.bind(document);

const textarea = $('.textarea-numbers');
const form = $('.form');
const del = $('.delete'); 

const tdModa = $('.td-moda');
const tdDesvio = $('.td-desvio');

const subtitle = $('.before');

form.addEventListener('submit', event => {
    event.preventDefault();
     
    if(!textarea.value == "") {
        const strNumbers = textarea.value;
        const numbers = Converter.strToInt(strNumbers);

        subtitle.style.display = 'none';
        moda(numbers)
        desvio(numbers)
    }
})

del.addEventListener('click', () => {
    textarea.value = "";
})


function moda(numbers) {
    let moda = [];
    let highestQuantity = 0;
    const passou = [];
    const frequencias = [];

    numbers.forEach(number => {
        if(!passou.includes(number) ) {
            let quantity = numbers.filter( element => element === number).length;
            frequencias.push(quantity)
            if(!moda.includes(number)) {
                if(quantity === highestQuantity){
                    moda.push(number);
                    highestQuantity = quantity;
                } else if (quantity > highestQuantity){
                    moda = [];
                    moda.push(number);
                    highestQuantity = quantity;
                }
            }
            
        }
    });

    const isModal = frequencias.filter(frequencia => frequencia == highestQuantity).length;

    isModal == frequencias.length ? tdModa.textContent = "Não existe moda"  : tdModa.textContent = moda;
}


function desvio(numbers) {
    const sum = numbers.reduce((total, number) => {
        return total + number;
    }, 0);

    const x = sum / numbers.length;

    const sigma = numbers.reduce((total, number) => {
        return total + ((number - x) ** 2);
    }, 0)

    // const sigma = numbers.reduce((total, number) => {
    //     return total + (((number - x) ** 2) * fi);
    // }, 0)

    const s2 = sigma / (numbers.length - 1);

    tdDesvio.textContent = Math.sqrt(s2).toFixed(2);
}
