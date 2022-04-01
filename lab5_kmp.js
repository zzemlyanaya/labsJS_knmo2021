let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split("\r\n");

let txt = lines[0]; let pat = lines[1];
let res = '';

let M = pat.length;
let N = txt.length;

let P = [];
for (let i = 0; i < M; i++) {
    P[i] = 0;
}

let k = 0;
for(let i = 1; i < pat.length; i++) {
    while ((k > 0) && (pat[k] !== pat[i]))
        k = P[k - 1];
    if (pat[k] === pat[i]) k++;
    P[i] = k;
}

k = 0;
for (let i = 0; i < txt.length; i++) {
    while ((k > 0) && (pat[k] !== txt[i]))
        k = P[k - 1];
    if (pat[k] === txt[i]) k++;

    if (k === pat.length) {
        res += i - k + " ";
        k = P[k-1];
    }
}

fs.writeFileSync('output.txt', res);