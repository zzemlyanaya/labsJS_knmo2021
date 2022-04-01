const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите выражение:\n', (expression) => {
    rl.close()
    let tokens = expression.replace(/\s+/g, "").split(/([+\-])/);
    let a = parseFloat(tokens[0]);
    let b = parseFloat(tokens[2]);
    let operator = tokens[1];

    let aBin = float32ToBinaryString(a);
    let bBin = float32ToBinaryString(b);

    console.log(a, ' = ', getFormattedBinary(aBin));
    console.log(b, ' = ', getFormattedBinary(bBin));

    let res = '';
    switch (operator) {
        case '+':
            res = binaryAddition(a, b);
            break;
        case '-':
            res = binarySubstruction(a, b);
            break;
    }
    console.log(a, operator, b, ' = ', getFormattedBinary(res));
    console.log(a, operator, b, ' = ', binaryStringToFloat32(res));
});

function binaryAddition(a, b) {
    if (a === 0) return float32ToBinaryString(b);
    if (b === 0) return float32ToBinaryString(a);

    if (a < b) [b, a] = [a, b];

    let sumSign = "0";
    if (a < 0) return binarySubstruction(b, -a);

    let expA = Math.floor(Math.log2(a));
    let expB = Math.floor(Math.log2(b));
    let expRes = Math.abs(expB - expA);
    let exp = Math.max(expA, expB);

    a = float32ToBinaryString(a);
    b = float32ToBinaryString(b);

    let mA = a.slice(9, 32);
    let mB = b.slice(9, 32);

    if (expB === expA) {
        let smRes  = bitSum2(mA.padEnd(23, "0"), mB.padEnd(23, "0"));
        let sy = smRes[1];
        let mRes = smRes[0];
        return "0" + int32ToBinaryString(127 + exp + 1).padStart(8, "0") + sy + mRes.slice(0, 22);
    }

    mB = "0".repeat(expRes - 1) + "1" + b.slice(9, 32 - expRes);
    mA = a.slice(9, 32);

    let smRes = bitSum(mA, mB);
    let add = parseInt(smRes[1]);
    return sumSign + int32ToBinaryString(127 + exp + add).padStart(8, "0") + smRes[0];
}

function binarySubstruction(a, b) {
    if (b === 0) return float32ToBinaryString(a);
    if (a === 0) return float32ToBinaryString(-b);
    if (a === b) return "".padEnd(32, "0");

    let sign = a > b ? '0' : '1';
    if (a < b) [b, a] = [a, b];

    let expA = Math.floor(Math.log2(a));
    let expB = Math.floor(Math.log2(b));

    a = float32ToBinaryString(a);
    b = float32ToBinaryString(b);

    let bias = -1;
    let sub = '';
    if (expA !== expB) {
        let exp = expA - expB;
        b = a.slice(0,9) + '0'.repeat(exp - 1) + '1' + b.slice(9, 32 - exp);
        bias = 0;
    }

    let add = 0;
    for (let i = 31; i >= 9; i--) {
        let diff = parseInt(a[i]) - parseInt(b[i]);
        sub = ((Math.abs(diff - add)) % 2).toString() + sub;
        add = ((diff + add) >= 0) ? 0 : -1;
    }

    if (bias === -1 || (bias === 0 && add === -1)) {
        let i;
        for (i = 0; sub[i] === '0'; i++) bias--;

        if (add === -1) {
            i++;
            bias--;
        }
        if (expA === expB) {
            i++;
        }

        sub = sub.slice(i, 31).padEnd(32, "0");

    }

    let newExp = int32ToBinaryString(parseInt(a.slice(1, 9), 2) + bias);
    return sign + newExp.padStart(8, "0") + sub;
}

function bitSum(bin1, bin2) {
    bin1 = "1" + bin1;
    bin2 = "0" + bin2;
    let res = "";
    let carry = "0";
    for (let i = 23; i > -1; i--) {
        let cur;
        if (bin1[i] === "1" && bin2[i] === "1") {
            if (carry === "1") cur = "1";
            else {
                cur = "0"
                carry = "1"
            }
        }
        else if (bin1[i] === "1" || bin2[i] === "1") {
            if (carry === "1") cur = "0";
            else cur = "1";
        }
        else {
            if (carry === "1") {
                cur = "1";
                carry = "0";
            }
            else cur = "0";
        }
        res = cur + res;
    }
    if (res[0] === "0") return [res.slice(0, 23), carry];
    else return [res.slice(1, 24), carry];
}

function bitSum2(bin1, bin2) {
    let res = "";
    let carry = "0";
    for (let i = 22; i > -1; i--) {
        let cur;
        if (bin1[i] === "1" && bin2[i] === "1") {
            if (carry === "1") cur = "1";
            else {
                cur = "0";
                carry = "1";
            }
        }
        else if (bin1[i] === "1" || bin2[i] === "1") {
            if (carry === "1") cur = "0";
            else cur = "1";
        }
        else {
            if (carry === "1") {
                cur = "1";
                carry = "0";
            }
            else cur = "0";
        }
        res = cur + res;
    }

    return [res, carry];
}

function float32ToBinaryString(n) {
    if (n === 0) return "".padEnd(32, "0");

    let sign = n > 0 ? "0" : "1";
    n = Math.abs(n);
    let exp = Math.floor(Math.log2(n));
    n /=  Math.pow(2, exp);
    let m = n % 1;
    let second = "";
    for (let i = 0; i < 23; i++) {
        m *= 2;
        second += Math.floor(m);
        m %= 1;
    }
    return sign + int32ToBinaryString(127 + exp).padStart(8, "0") + second.padEnd(23, "0")
}

function int32ToBinaryString(n) {
    if (n < 2) return "" + n;

    let i = n % 2;
    let j = (n - i) / 2;
    return int32ToBinaryString(j) + i;
}

function binaryStringToFloat32(bin) {
    if (bin ===  "".padEnd(32, "0")) return 0;

    let sign = bin[0] === "0" ? 1 : -1;
    let mBits = bin.slice(9, 32);
    let exp = parseInt(bin.slice(1, 9), 2);

    let mVal = 0;
    let k = 2;
    for (let i = 0; i < mBits.length; i++) {
        mVal += parseInt(mBits[i]) / k;
        k *= 2;
    }
    return sign * (mVal + 1) * Math.pow(2, exp - 127);
}

function getFormattedBinary(n) {
    return n[0] + " " + n.slice(1, 9) + " " + n.slice(9);
}