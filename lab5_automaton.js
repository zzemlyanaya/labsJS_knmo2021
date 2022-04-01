const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const lines = input.split("\r\n");
const txt = lines[0]; const pat = lines[1];
let res = "";

alph = [];
let i, j;

for(i = 0; i < pat.length; i++)
    alph[pat.charCodeAt(i)] = 0;

let table = new Array(pat.length+1);
for(i = 0; i <= pat.length; i++) {
    table[i] = [];
    for (j in alph)
        table[i][j] = 0
}

let prev = 0;
for(i = 0; i < pat.length; i++){
    prev = table[i][pat.charCodeAt(i)]
    table[i][pat.charCodeAt(i)] = i+1
    for(j in alph)
        table[i+1][j] = table[prev][j]
}

let pref = 0
for (let i = 0; i < txt.length; i++) {
    if (pat.indexOf(txt[i]) !== -1) {
        pref = table[pref][txt.charCodeAt(i)]
    } else
        pref = 0
    if (pref === pat.length)
        res += i - pat.length + 1 + " ";
}

fs.writeFileSync('output.txt', res);