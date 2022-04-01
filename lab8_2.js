function AddString(obj) {
    for (let key in obj) {
        if (typeof obj[key] == "string") {
            obj[key] += " Это строка.";
        }
    }
}

let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};
AddString (menu);

let computer = {
    type: "Laptop",
    model: "Lenovo",
    name: "Lenovo X520-S14"
};
AddString(computer);

console.log(menu)
console.log(computer)