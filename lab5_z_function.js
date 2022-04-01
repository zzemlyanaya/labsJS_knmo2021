let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split("\r\n");

let txt = lines[0]; let pat = lines[1];
let res = '';
let concat = pat + "$" + txt;

let m = concat.length;
let L = 0; let R = 0;

let Z = [];
for (let i = 0; i < m; i++) {
    Z[i] = 0;
}

for (let i = 1; i < m; i++) {
    if (i <= R) Z[i] = Math.min(R - i + 1, Z[i - L]);
    while (i + Z[i] < m && concat[Z[i]] === concat[i + Z[i]]) Z[i]++;
    if (i + Z[i] - 1 > R) {
        L = i;
        R = i + Z[i] - 1;
    }
}

for (let i = pat.length + 1; i < m; i++) {
    if (Z[i] === pat.length)
        res += i - pat.length - 1 + " ";
}

fs.writeFileSync('output.txt', res);