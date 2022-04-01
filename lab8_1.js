function Group(number, spec, amount) {
    this.number = number;
    this.spec = spec;
    this.amount = amount;

    this.add_stud = function add_stud(k) {
        this.amount += k;
    }

    this.sub_stud = function sub_stud(k) {
        this.amount -= k
    }
}

let g1 = new Group(1, "Chem", 16);
g1.add_stud(3);
g1.sub_stud(8);

let g2 = new Group(2, "BioChem", 22);
g2.add_stud(5);
g2.sub_stud(2);

let g3 = new Group(3, "IT", 28);
g3.add_stud(8);
g3.sub_stud(9);

console.log(`В группе #${g1.number} ${g1.amount} студентов`);
console.log(`В группе #${g2.number} ${g2.amount} студентов`);
console.log(`В группе #${g3.number} ${g3.amount} студентов`);