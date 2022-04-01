let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split("\r\n");

let txt = lines[0]; let pat = lines[1];
let res = '';
let concat = pat + "$" + txt;

let P = []; P[0] = 0;
let k = 0;

for(let i = 1; i <= pat.length; i++) {
    k = P[i-1];
    while ((k > 0) && (pat[k] !== pat[i]))
        k = P[k - 1];
    if (pat[k] === pat[i]) k++;
    P[i] = k;
}

for (let i = pat.length + 1; i < concat.length; i++) {
    while ((k > 0) && (concat[k] !== concat[i]))
        k = P[k - 1];
    if (concat[k] === concat[i]) k++;

    if (k === pat.length)
        res += i - 2*pat.length + " ";
}

fs.writeFileSync('output.txt', res);