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

let stopTable = []
for (let i = 0; i < n - 1; i++) {
    if (shift[txt[i]])
        stopTable[txt[i]] = shift[txt[i]];
    else
        stopTable[txt[i]] = 0
}

let suffshift = []
let z=[]
let maxZidx = 0
let maxZ = 0;
for (let i = 0; i <= m; i++) {
    z[i] = 0
    suffshift[i] = m
}

for (let i = 1; i < m; i++) {
    if (i <= maxZ)
        z[i] = Math.min(maxZ - i + 1, z[i - maxZidx]);
    while (i+z[i] < m && pat[m-1-z[i]] === pat[m-1-(i + z[i])])
        z[i]++;
    if (i+z[i]-1 > maxZ) {
        maxZidx = i;
        maxZ = i + z[i] - 1;
    }
}
for (let i = m - 1; i > 0; i--) suffshift[m - z[i]] = i;

r = 0;
for (let i = 1; i <= m - 1; i++) {
    if ((i + z[i]) === m) {
        for (; r <= i; r++)
            if (suffshift[r] === m) suffshift[r] = i;
    }
}

// search
let i = 0;
let bound = 0;
while(i <= n - m) {
    let j = m-1;
    while(j >= bound && pat[j] === txt[i+j]) j--;
    if (j < bound) {
        res += i + " ";
        bound = m - suffshift[0]
        j = -1;
        i += suffshift[0];
    }
    else {
        bound = 0;
        i = Math.max(i + suffshift[j+1], i + j + 1 - stopTable[txt[i+j]]);
    }
}

fs.writeFileSync('output.txt', res);