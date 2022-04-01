let fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
let lines = input.split("\r\n");

let txt = lines[0]; let pat = lines[1];
let res = '';
let mod = 1e5+7;

let N = txt.length; let M = pat.length;
let i = 0, j = 0;

let hashP = 0; let hashT = 0;
let h = 1;

for(i = 0; i < M - 1; i++)
    h = (h * 2) % mod;


for(i = 0; i < M; i++){
    hashP = (2 * hashP + pat.charCodeAt(i)) % mod;
    hashT = (2 * hashT + txt.charCodeAt(i)) % mod;
}

for(i = 0; i <= N - M; i++) {
    if (hashP === hashT) {
        j = 0;
        while (txt[i+j] === pat[j] && j<M) j++;
        if (j === M) res += i+1 + " ";
    }
    if (i < N-M) {
        hashT = (2 * (hashT - txt.charCodeAt(i) * h) +
            txt.charCodeAt(i+M)) % mod;
        if (hashT < 0)
            hashT = (hashT + mod);
    }
}

fs.writeFileSync('output.txt', res);