const $ = document.querySelector.bind(document);

const inputXi = $('.input-xi');
const inputFi = $('.input-fi');
const add = $('.add');
const tableData = $('.table-data');
const form = $('.form');
const tdModa = $('.td-moda');
const tdDesvio = $('.td-desvio');
const msg = $('.before');

let numbers = []

add.addEventListener('click', () => {
    tableData.innerHTML += `<tr>
                                <td>${inputXi.value}</td>
                                <td>${inputFi.value}</td>
                            </tr>`

    numbers.push({
        xi: parseInt(inputXi.value),
        fi: parseInt(inputFi.value)
    })

    inputFi.value = "";
    inputXi.value = ""; 
});

form.addEventListener('submit', event => {
    event.preventDefault();
    render(mode(), standartDeviation(average()));
    msg.style.display = 'none';
});

function mode() {
    let mode = [];
    let highest = 0;

    const sum = numbers.reduce((total, number) => {
        return total + number.fi;
    }, 0);

    numbers.forEach(element => {
        if(element.fi === highest) {
            highest = element.fi;
            mode.push(element.xi);
        } else if(element.fi > highest) {
            mode = [];
            highest = element.fi;
            mode.push(element.xi);
        }
    });

    return sum / (highest * numbers.length) === 1 ? "Não possui moda" : mode;
}

function standartDeviation(x) {
    const n = numbers.reduce((total, number) => {
        return total + number.fi;
    }, 0);

    const sigma = numbers.reduce((total, number) => {
        let res = ((number.xi - x) ** 2) * number.fi
        return total + res;
    }, 0);

    const s2 = sigma / (n - 1);
    const s = Math.sqrt(s2)

    return s.toFixed(2);
}

function average()  {
    const fi = numbers.reduce((total, number) => {
        return total + number.fi;
    }, 0);
    
    const xifi = numbers.reduce((total, number) => {
        return total + (number.xi * number.fi);
    }, 0);

    const x = xifi / fi;

    return x;
}

function render(mode, standartDeviation) {
    tdModa.textContent = mode;
    tdDesvio.textContent = standartDeviation;
}