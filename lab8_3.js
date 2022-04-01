function Cone(radii, height) {
    this.radii = radii
    this.height = height

    this.volume = function volume() {
        return 1/3*Math.PI*this.radii*this.radii*this.height
    }

    this.base_square = function base_square() {
        return Math.PI*this.radii*this.radii
    }

    this.surface_square = function surface_square() {
        return Math.PI*this.radii*Math.sqrt(radii*radii + height*height)
    }

    this.full_square = function full_square() {
        return this.base_square()+this.surface_square()
    }
}

let cone1 = new Cone(8, 6);
console.log(`Конус 1: объём ${cone1.volume()}, площадь основания ${cone1.base_square()}, площадь боковой поверхности ${cone1.surface_square()}`);
cone1.height = 5;
console.log(cone1.surface_square())
let cone2 = new Cone(9, 12);
console.log(`Конус 2: объём ${cone2.volume()}, площадь основания ${cone2.base_square()}, площадь боковой поверхности ${cone2.surface_square()}`);

let cone3 = new Cone(30, 16);
console.log(`Конус 3: объём ${cone3.volume()}, площадь основания ${cone3.base_square()}, площадь боковой поверхности ${cone3.surface_square()}`);