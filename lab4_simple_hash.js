let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split("\r\n");

let txt = lines[0]; let pat = lines[1];
let res = '';

let N = txt.length; let M = pat.length;
let i = 0, j = 0;

let hashT = 0; let hashP = 0;

for(i = 0; i < M; i++) {
    hashT += txt.charCodeAt(i);
    hashP += pat.charCodeAt(i);
}

for(i = 0; i <= N-M; i++) {
    if (hashP === hashT) {
        j = 0;
        while (txt[i+j] === pat[j] && j<M) j++;
        if (j === M) res += i+1 + " ";
    }
    if (i < N-M)
        hashT = hashT - txt.charCodeAt(i) + txt.charCodeAt(i+M);
}

fs.writeFileSync('output.txt', res);