let readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Введите строку:\n', (txt) => {
    let alphabet = [];
    let m = 0;
    for (let i = 0; i < txt.length; i++) {
        if (!alphabet.find(item => item.symbol === txt[i])) {
            alphabet.push({'symbol':txt[i], 'code':m})
            m++;
        }
    }

    let n = Math.floor(Math.log2(m))+1;

    for (let i = 0; i < m; i++) {
        let item = alphabet[i];
        let cur = (item.code).toString(2);
        if (cur.length < n) {
            cur = '0'.repeat(n-cur.length)+cur;
        }
        item.code = cur;
        alphabet[i] = item;
    }

    console.table(alphabet);

    let res = "";
    for (let i = 0; i < txt.length; i++) {
        res += alphabet.find(item => item.symbol === txt[i]).code;
    }

    console.log(res);

    rl.question('Введите строку:\n', (txt) => {
        rl.close();
        let res = "";
        for (let i = 0; i < txt.length; i+=n) {
            let code = txt.substr(i, n);
            res += alphabet.find(item => item.code === code).symbol;
        }

        console.log(res);
    });
});