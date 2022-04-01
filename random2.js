class Node {
    constructor() {
        this.weight = 0;
        this.c = '';
        this.left = this.right = null;
    }
}

let readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите строку:\n', (txt) => {
    // data preprocessing
    let chars = [];
    let freqs = [];
    let m = 0;
    for (let i = 0; i < txt.length; i++) {
        let index = chars.indexOf(txt[i]);
        if (index === -1) {
            chars[m] = txt[i];
            freqs[m] = 1;
            m++;
        } else {
            freqs[index] += 1;
        }
    }

    let tbl = [];
    for (let i = 0; i < m; i++) tbl.push({"char": chars[i], "freq": freqs[i]});
    console.table(tbl);

    // main part
    let tree = [];

    for (let i = 0; i < m; i++) {
        let hn = new Node();
        hn.c = chars[i];
        hn.weight = freqs[i];
        hn.left = null;
        hn.right = null;

        tree.push(hn);
    }

    let root = null;
    tree.sort((a, b) => a.weight - b.weight);

    while (tree.length > 1) {
        let fme = tree[0]; // first min extract.
        tree.shift();

        let sme = tree[0]; // second min extract.
        tree.shift();

        let f = new Node();
        f.weight = fme.weight + sme.weight;
        f.c = '-';
        f.left = fme;
        f.right = sme;

        root = f;

        tree.push(f);
        tree.sort((a, b) => a.weight - b.weight);
    }

    let codes = [];
    obtainCodes(codes, root, "");
    console.table(codes);

    let encoded = "";
    for (let i = 0; i < txt.length; i++) {
        encoded += codes.find(item => item.char === txt[i]).code;
    }
    console.log(`Encoded string: ${encoded}`);

    rl.question('Введите строку:\n', (txt) => {
        rl.close();
        console.log(decode(root, txt));
    });
});

function obtainCodes(codes, root, s) {
    if (root.left == null && root.right == null && (root.c).toLowerCase() !== (root.c).toUpperCase()) {
        codes.push({"char": root.c, "code": s})
        return;
    }

    // if we go to left then add "0" to the code.
    // if we go to the right add"1" to the code.
    obtainCodes(codes, root.left, s + "0");
    obtainCodes(codes, root.right, s + "1");
}

function decode(root, s) {
    let ans = "";
    let cur = root;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '0') cur = cur.left;
        else cur = cur.right;

        if (cur.left === null && cur.right === null) {
            ans += cur.c;
            cur = root;
        }
    }

    return ans;
}