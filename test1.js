function StrokeWithWords(stroke) {
    this.words = stroke.split(/[ ,.!-]+/)

    this.update_words = function (stroke) { this.words = stroke.split(" ") }

    this.count = function() { return this.words.length }

    this.find_with_first_literal = function () {
        let res = []
        for (let i = 0; i < this.words.length; i++) {
            let w = this.words[i][0].toUpperCase()+this.words[i].substr(1)
            res.push(w)
        }
        return res
    }

    this.is_palindrome = function () {
        let txt = this.words.join("").toLowerCase()
        let N = txt.length
        let n = Math.floor(txt.length/2)
        for (let i = 0; i < n; i++)
            if (txt[i] !== txt[N-i-1]) return false;
        return true;
    }
}

let readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите строку:\n', (txt) => {
    rl.close()
    let o1 = new StrokeWithWords(txt)
    console.log("Words: ", o1.words)
    console.log("Amount: ", o1.count())
    console.log("With first letter in upper case: ", o1.find_with_first_literal())
    console.log("Is palindrome: ", o1.is_palindrome())
})

/** tests:
 // Искать такси
 // Avid diva
 // race car
 // Hello, World, what a beautiful day!
***/