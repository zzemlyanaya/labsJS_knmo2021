let readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Введите строку:\n', (txt) => {
    rl.close();

    let alphabet = [];
    const n = txt.length;
    let m = 0;
    for (let i = 0; i < n; i++) {
        if (alphabet[txt[i]]) alphabet[txt[i]]++;
        else alphabet[txt[i]] = 1;
    }
    for (let sym in alphabet) {
        alphabet[sym] /= n;
        m++;
    }
    console.table(alphabet);

    let entropy = 0;
    for (let sym in alphabet) {
        entropy += alphabet[sym] * (Math.log(alphabet[sym]) / Math.log(m));
    }
    entropy = -entropy;

    console.log(`Энтропия введённой строки = ${entropy || 0}`);

});