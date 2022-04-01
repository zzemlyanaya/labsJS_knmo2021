const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const lines = input.split("\r\n");
const txt = lines[0]; const pat = lines[1];
let res = "";

let m = pat.length;
let n = txt.length;

let shift = [];
for (let i = 0; i < m - 1; i++)
    shift[pat[i]] = i+1;

let i = 0, j = 0;
while (i <= n-m) {
    j = 0;
    while (txt[i+j] === pat[j] && j<m) j++;
    if (j===m) res += i + " ";

    if (!shift[txt[i+m-1]])
        i += m
    else
        i += m - shift[txt[i+m-1]]
}
fs.writeFileSync('output.txt', res);
