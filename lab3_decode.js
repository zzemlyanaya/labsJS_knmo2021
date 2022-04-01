let fs = require('fs');
str = fs.readFileSync('code.txt');

var i = 0;
const nums = '0123456789';
var decode = '';
while(i < str.length) {
    var num_str = '';
    var amount = 1;
    while(nums.includes(String.fromCharCode(str[i]))) {
        num_str += String.fromCharCode(str[i]);
        i++;
    }

    if (num_str.length > 0)
        amount = parseInt(num_str);

    for(var j = 1; j <= amount; j++) {
        decode +=  String.fromCharCode(str[i]);
    }

    i++;
}

fs.writeFileSync('decode.txt', decode);