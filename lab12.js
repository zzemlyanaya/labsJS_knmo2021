function Node(lft, rgt, weight, chars) {
    this.left = lft;
    this.right = rgt;
    this.weight = weight;
    this.chars = chars;
    this.code = '';
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите строку:\n', (txt) => {
    let alphabet = {};
    for (let i = 0; i < txt.length; i++) {
        if (alphabet[txt[i]])
            alphabet[txt[i]]++;
        else
            alphabet[txt[i]] = 1;
    }
    let items = Object.entries(alphabet);

    let tree = buildTree(items);
    printFormattedTree(tree, '');

    let codes = {};
    obtainCodes(codes, tree, '');
    console.table(codes);

    let encoded = '';
    for (let c in txt) encoded += codes[txt[c]];
    console.log(`Encoded string: ${encoded}`);

    rl.question('Введите строку:\n', (txt) => {
        rl.close();

        let ans = '';
        let current = tree;

        for (let i = 0; i < txt.length; i++) {
            if (txt[i] === '0') current = current.left;
            else current = current.right;

            if (current.left === null && current.right === null) {
                ans += current.chars;
                current = tree;
            }
        }

        console.log(ans);
    });
})

function buildTree(alphabet) {
    if (alphabet.length <= 1)
        return new Node(null, null, getSum(alphabet), alphabet[0][0]);

    // split the alphabet
    let alph1 = [];
    let weight1 = 0;
    let alph2 = [];
    let weight2 = 0;

    alphabet.sort((first, second) => second[1] - first[1]);

    for (let item in alphabet) {
        item = alphabet[item];
        if (weight1 < weight2) {
            alph1.push(item);
            weight1 += item[1];
        }
        else {
            alph2.push(item);
            weight2 += item[1];
        }
    }

    let left = buildTree(alph1);
    left.code = 0;
    let right = buildTree(alph2);
    right.code = 1;

    return new Node(left, right, getSum(alphabet), alphabet.map(x => x[0]).join(''));
}


function obtainCodes(codes, root, s) {
    if (root.left == null && root.right == null && (root.chars).toLowerCase() !== (root.chars).toUpperCase()) {
        codes[root.chars] = s;
        return;
    }

    // if we go to left then add "0" to the code.
    // if we go to the right add"1" to the code.
    obtainCodes(codes, root.left, s + "0");
    obtainCodes(codes, root.right, s + "1");
}

function printFormattedTree(root, space) {
    if (root.left) {
        printFormattedTree(root.left, space + "\t");
        printFormattedTree(root.right, space + "\t");
        console.log(space + root.chars + " "  + root.weight);
    } else {
        console.log(space + root.chars + " "  + root.weight);
    }
}

function getSum(a) {
    return a.map(x => x[1]).reduce((sum, weight) => sum + weight, 0);
}
