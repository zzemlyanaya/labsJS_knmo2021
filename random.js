let regs = [0, 0, 0, 0, 0, 0, 0, 0];
let stack = [];
let program = [];

let PC = 0;
let halted = false;
let res = "";

const instructions = {
    MOVR: 10,
    MOVV: 11,
    ADD: 20,
    SUB: 21,
    DIV: 22,
    MOD: 23,
    INC: 24,
    MUL: 25,
    PUSH: 30,
    POP: 31,
    JP: 40,
    JL: 41,
    JE: 43,
    CALL: 42,
    RND: 49,
    RET: 50,
    PRINT: 60,
    HALT: 255
};

const registers = {
    R0: 0,
    R1: 1,
    R2: 2,
    R3: 3,
    R4: 4,
    R5: 5,
    R6: 6,
    R7: 7
};

const RND_MAX = 2000000;
// Для второй задачи лучше использовать числа поменьше, иначе программа очень долго работает
// const RND_MAX = 10000;

function assemble(code) {
    return getBytecode(getTokens(code));
}

function getBytecode(tokens) {
    let bytes = [];

    for(let line of tokens) {
        for(let i = 0; i < line.length; i++) {
            let token = line[i].trim().toUpperCase();

            // First token is assumed to be an instruction
            if(i === 0) {
                token = instructions[token];
                bytes.push(token ? token : -1);
            }
            else {
                // If operand start with R is assumed to be a register
                if (token.startsWith("R")) token = registers[token];
                bytes.push(parseInt(token));
            }
        }
    }

    return bytes;
}

function getTokens(code) {
    const lines = code.split(/\r?\n/);

    // Remove comments and empty lines
    for(let i = lines.length - 1; i >= 0; i--) {
        let txt = lines[i].trim();
        if (!txt || txt.startsWith("//")) {
            lines.splice(i, 1);
            continue;
        }

        // Split each line by " " or ,
        lines[i] = txt.split(/[\s,]+/);
    }

    return lines;
}

function init(code) {
    program = assemble(code);
    PC = 0;
    halted = false;
    stack = [];

    loop();
}

function loop() {
    while(!halted) run();
}

function run() {
    if (halted) return;

    const instr = program[PC];

    let addr, r1, r2, val;

    switch(instr) {
        // movr r1, r2
        case 10:
            PC++;
            r1 = program[PC++];
            r2 = program[PC++];
            regs[r1] = regs[r2];
            break;

        // movv r1, val
        case 11:
            PC++;
            r1 = program[PC++];
            val = program[PC++];
            regs[r1] = val;
            break;

        // add r1, r2
        case 20:
            PC++;
            r1 = program[PC++];
            r2 = program[PC++];
            regs[r1] += regs[r2];
            break;

        // sub r1, r2
        case 21:
            PC++;
            r1 = program[PC++];
            r2 = program[PC++];
            regs[r1] -= regs[r2];
            break;

        // div r1, r2
        case 22:
            PC++;
            r1 = program[PC++];
            r2 = program[PC++];
            regs[r1] = Math.floor(regs[r1]/regs[r2]);
            break;

        // mod r1, r2
        case 23:
            PC++;
            r1 = program[PC++];
            r2 = program[PC++];
            regs[r1] %= regs[r2];
            break;

        // inc r1
        case 24:
            PC++;
            r1 = program[PC++];
            regs[r1]++;
            break;

        // mul r1 r2
        case 25:
            PC++;
            r1 = program[PC++];
            r2 = program[PC++];
            regs[r1] *= regs[r2];
            break;

        // push r2
        case 30:
            PC++;
            r2 = program[PC++];
            stack.push(regs[r2]);
            break;

        // pop r1
        case 31:
            PC++;
            r1 = program[PC++];
            regs[r1] = stack.pop();
            break;

        // jp addr
        case 40:
            PC++;
            addr = program[PC++];
            PC = addr;
            break;

        // jl r1, r2, addr
        case 41:
            PC++;
            r1 = program[PC++];
            r2 = program[PC++];
            addr = program[PC++];
            if (regs[r1] < regs[r2])
                PC = addr;
            break;

        // je r1, r2, addr
        case 43:
            PC++;
            r1 = program[PC++];
            r2 = program[PC++];
            addr = program[PC++];
            if (regs[r1] === regs[r2])
                PC = addr;
            break;

        // call addr
        case 42:
            PC++;
            addr = program[PC++];
            stack.push(PC);
            PC = addr;
            break;

        // rnd r1
        case 49:
            PC++;
            r1 = program[PC++];
            regs[r1] = Math.floor(Math.random() * RND_MAX);
            break;

        // ret
        case 50:
            PC++;
            addr = stack.pop();
            PC = addr;
            break;

        // print reg
        case 60:
            PC++;
            r1 = program[PC++];
            println(regs[r1]);
            break;

        // halt
        case 255:
            PC++;
            halted = true;
            break;

        default:
            println("PANIC: unknown instruction!");
            halted = true;
            break;
    }

    if (PC >= program.length) halted = true;
}

function println(txt) {
    res += txt + "\n";
}

let fs = require('fs');

let code = fs.readFileSync('lab17_1.txt').toString();
res += '==========1==========\n'
init(code);

code = fs.readFileSync('lab17_2.txt').toString();
res += '==========2==========\n'
init(code);

fs.writeFileSync('output.txt', res);
