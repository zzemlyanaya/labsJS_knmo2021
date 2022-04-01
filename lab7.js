function brute_force(txt, pat) {
    let start = new Date();

    let res = '';
    let N = txt.length; let M = pat.length;

    for(let i = 0; i <= N-M; i++) {
        let j = 0;
        while (txt[i+j] === pat[j] && j<M) j++;
        if (j===M) res += i+1 + " ";
    }

    let finish = new Date();
    console.log("Found", pat, "at positions ", res.toString(), "for ", finish-start);
}

function simple_hash(txt, pat) {
    let start = new Date();

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

    let finish = new Date();
    console.log("Found", pat, "at positions ", res.toString(), "for ", finish-start);
}

function robin_karp(txt, pat) {
    let start = new Date();

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

    let finish = new Date();
    console.log("Found", pat, "at positions ", res.toString(), "for ", finish-start);
}

function kmp(txt, pat) {
    let start = new Date();
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
    let finish = new Date();
    console.log("Found", pat, "at positions ", res.toString(), "for ", finish-start);
}

function automanton(txt, pat) {
    let start = new Date();

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

    let finish = new Date();
    console.log("Found", pat, "at positions ", res.toString(), "for ", finish-start);
}

function bmh(txt, pat) {
    let start = new Date();

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

    let finish = new Date();
    console.log("Found", pat, "at positions ", res.toString(), "for ", finish-start);
}

function bm(txt, pat) {
    let start = new Date();

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

    let finish = new Date();
    console.log("Found", pat, "at positions ", res.toString(), "for ", finish-start);
}

const fs = require('fs');
const txt = fs.readFileSync('Chto_skazal_pokoinik.txt').toString();
let patterns = ["енгаген", "автомобиль", "сто сорок восемь от семи, тысяча двест"];
for (let i = 0; i < 3; i++) {
    brute_force(txt, patterns[i]);
    simple_hash(txt, patterns[i]);
    robin_karp(txt, patterns[i]);
    kmp(txt, patterns[i]);
    automanton(txt, patterns[i]);
    bmh(txt, patterns[i]);
    bm(txt, patterns[i]);
    console.log()
}