let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split("\r\n");
let txt = lines[0]; let pat = lines[1];
let res = '';

let N = txt.length; let M = pat.length;
let i;

for(i = 0; i <= N-M; i++) {
    let j = 0;
    while (txt[i+j] === pat[j] && j<M) j++;
    if (j===M) res += i+1 + " ";
}

fs.writeFileSync('output.txt', res);