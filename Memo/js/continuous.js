import { Converter } from "./Converter.js";

const $ = document.querySelector.bind(document);
const testnumber = '1 1 1 2 2 3 3 3 4 5 5 6 7 7 8 8';

const form = $('.form');
const textarea = $('.textarea-numbers');
const del = $('.delete');
const table = $('.table-data');
const msg = $('.before');

del.addEventListener('click', () => {textarea.value = ""});

form.addEventListener('submit',  event => {
    event.preventDefault();
    const numbers = Converter.strToInt(textarea.value);

    let tableContent = classes(numbers);
    tableContent = tableColumns(tableContent, numbers)
    msg.style.display = 'none';

    render(tableContent)

    console.log(tableContent)
});

function classes(numbers) {
    const ls = numbers.reduce((prev, number) => {
        return prev > number ? prev : number
    }, numbers[0]);

    const li = numbers.reduce((prev, number) => {
        return prev < number ? prev : number
    }, numbers[0]);

    const n = numbers.length
    const at = ls - li;
    const k = Math.sqrt(n);
    const c = Math.round(at / k);

    const classes = [];
    let newLi = li;
    let newLs = undefined;

    while(true) {
        newLs = newLi + c;

        classes.push({
            classe: {
                li: newLi,
                ls: newLs
            }
        });
        newLi = newLs;

        if(newLi == ls || newLs > ls || ls < newLi + c) {
            classes.push({
                classe: {
                    li: newLi,
                    ls: newLi + c
                }
            })
            break;
        }
    }

    return classes;
}

function tableColumns(tableContent, numbers) {
    
    for(let i = 0; i < tableContent.length; i++) {
        tableContent[i].xi =  (tableContent[i].classe.li + tableContent[i].classe.ls) / 2;
        tableContent[i].fi = frequency(tableContent[i].classe.li, tableContent[i].classe.ls, numbers);
        tableContent[i].xifi = tableContent[i].xi * tableContent[i].fi;
    }

    const x = average(tableContent, numbers);

    for(let i = 0; i < tableContent.length; i++) {
        tableContent[i].xixfi2 = (((tableContent[i].xi - x) ** 2) * tableContent[i].fi).toFixed(2);
    }

    return tableContent;
}


function frequency(li, ls, numbers) {
    let quantity = numbers.filter( element => (element >= li && element < ls)).length;

    return quantity;
}


function average(tableContent, numbers)  {
    const fi = numbers.length;

    const xifi = tableContent.reduce((total, element) => {
        return total + element.xifi
    }, 0);

    const x = xifi / fi;

    return x;
}

function render(tableContent) {
    
    for (var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    tableContent.forEach(element => {
        table.innerHTML += `<tr>
                                <td>${element.classe.li} |-- ${element.classe.ls}</td>
                                <td>${element.fi}</td>
                                <td>${element.xi}</td>
                                <td>${element.xifi}</td>
                                <td>${element.xixfi2}</td>
                            </tr>`
    });
}