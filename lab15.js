let readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/** RPN tests
 * 3 4 + 5 * -> 35
 * 3 4 + 2 * 1 + -> 15
 * 2 50 3 4 + 5 * - * -> 30
 * 10 6 9 3 + -11 * / * 17 + 5 + -> 22
 * 10 6 9 3 + -11 * / * 17 + 5 + 9 - -> 13
 */

/** Shunting-Yard tests
 * 3 + 4 -> 3 4 + -> 7
 * (3 + 5 ) * 7 -> 3 5 + 7 * -> 56
 * 3 + 4 * 5 / (3 + 2) -> 3 4 5 * 3 2 + / + -> 7
 * 5 + 3 * 6 - ( 5 / 3 ) + 7 -> 5 3 6 * + 5 3 / - 7 + -> 29
 * (8+2*5)/(1+3*2-4)-5+(9/(1+2)+1)*3 -> ... -> 13
 * ((7-6.35)/6.5+9.9)/((1.2/36+1.2/0.25-21/16)/(169/24)) -> ... -> 20
 * ((13.75+9+1/6)*1.2)/((10.3-8-1/2)*(5/9))+((6.8-3-3/5)*(35/6))/((3+2/3-3-1/6)*56)-27-1/6 -> ... -> 1
 */

rl.question('Введите выражение для вычисления:\n', (txt) => {
    rl.close();
    let rpn = infixToPostfix(txt);
    console.log('Reverse Polish Notation: ', rpn);
    console.log('Calculation result: ', evalRPN(rpn));
});

const infixToPostfix = function(expression){
    let outQueue = [];
    let opStack = [];

    let tokens = expression.replace(/\s+/g, "").split(/([+\-*\/^()])/).clean();
    let top;
    const prec = {
        "*": "left",
        "/": "left",
        "+": "left",
        "-": "left"
    };
    const assoc = {
        "*": 3,
        "/": 3,
        "+": 2,
        "-": 2
    };

    tokens.forEach(token => {
        if (isNumber(token)) { outQueue.push(token); }
        else if (isOperator(token)) {
            if (opStack.peek()) {
                top = opStack.peek();

                while(isOperator(token)
                    && ((prec[token] === 'left' && assoc[token] <= assoc[top])
                        || (prec[token] === "right" && assoc[token] < assoc[top]))) {
                    outQueue.push(opStack.pop());
                    top = opStack.peek();
                }
            }
            opStack.push(token);
        }
        else if (token === '(') { opStack.push(token); }
        else if (token === ')') {
            while(opStack.peek() !== '(') outQueue.push(opStack.pop());
            opStack.pop();
        }
    });

    return outQueue.concat(opStack.reverse()).join(" ");
};

let evalRPN = function(expression) {
    if (expression === '') return 0;

    let stack = expression.split(' ');

    let i = 0;
    while(stack.length > 1) {
        if (isOperator(stack[i+2])) {
            const result = calculate(parseFloat(stack[i]), parseFloat(stack[i+1]), stack[i+2]);
            stack.splice(i, 3, result);
            i = 0;
        } else
            i++;
    }

    return stack[0];
};

const calculate = (left, right, operator) => {
    let res;
    switch(operator) {
        case '+':
            res = left + right;
            break;
        case '-':
            res = left - right;
            break;
        case '*':
            res = left * right;
            break;
        case '/':
            res = left / right;
            break;
    }

    return res;
}

Array.prototype.clean = function() {
    for(let i = 0; i < this.length; i++) {
        if(this[i] === "") {
            this.splice(i, 1);
        }
    }
    return this;
}

Array.prototype.peek = function() {
    return this.slice(-1)[0];
};

const isOperator = function (char) {
    const operators = new Set(['+', '-', '*', '/', '^']);
    return operators.has(char);
}
const isNumber = function(char) {
    return !isNaN(parseFloat(char)) && isFinite(char);
}