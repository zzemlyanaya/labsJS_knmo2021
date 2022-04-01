compute(1, 2, 10)

factorial_for();
factorial_while();
factorial_do_while();

draw_fir();

compute_set();

// const readline = require('readline');
//
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
//
// rl.on('line', (input) => {
//   var temp = input.split(' ');
//   var a = 0; var b = 0; var c = 0;
//   a = temp[0]; b = temp[1]; c = temp[2];
//   rl.close();
//   compute(a, b, c);
// });

function compute(a, b, c) {
  var x1 = 0; var x2 = 0;
  var t = false
  var D = b*b-4*a*c;
  if (D >= 0) {
    x1 = (-b + Math.sqrt(D))/(2*a);
    x2 = (-b - Math.sqrt(D))/(2*a);
    t = true;
  }
  if(t) {
    console.log(x1, x2);
  } else {
    console.log("No roots!")
  }

}

function factorial_for() {
  var fact = 1;
  for (var i = 1; i <= 10; i++) fact *= i;
  console.log(fact);
}

function factorial_while() {
  var fact = 1;
  var i = 1;
  while (i++ < 10) {
    fact *= i;
  }
  console.log(fact);
}

function factorial_do_while() {
  var fact = 1;
  var i = 1;
  do {
    fact *= i;
    i += 1;
  } while (i <= 10);
  console.log(fact);
}

function draw_fir() {
  var a = Math.floor(Math.random() * (100 - 3)) + 3;
  var i = 1; var counter = 1;
  var input = '';
  while (i <= a-2) {
    for (var j = 1; j <= counter; j++) { input += i++ + ' '; }
    counter += 1;
    input += "\n";
  }
  console.log(input);
  console.log(i, i+1);
}

function compute_set() {
  var s = 0; var b = 2; var c1 = 1; var c2 = 2; var d = 3; var z = 1; var a = 1;
  while (Math.abs(a) > 0.001) {
    console.log(a);
    s += a;
    a = (z*b)/(c2*d);
    b += 2; d *= 3; z *= -1;
    var temp = c1;
    c1 = c2; c2 += temp;
  }
  console.log(s);
}
