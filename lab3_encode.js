let fs = require('fs');
str = fs.readFileSync('input.txt');

alph=[];
let amount=0;
for(let i=0; i < str.length; i++) {
    if (!alph[str[i]]) {
        alph[str[i]] = 1
        amount++
    } else
        alph[str[i]]++
}

let code = "";
for(let sym in alph) {
    amount = alph[sym]
    let char = String.fromCharCode(sym);
    if (amount === 1 || amount === 2) {
        code += char
    }
    else  {
        code += amount
        code += char
    }
}
let koef = str.length / code.length
console.log(koef)
fs.writeFileSync('code.txt', code)

