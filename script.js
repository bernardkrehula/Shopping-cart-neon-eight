import { cars } from "./carArray.js";

const carContent = document.querySelector('.car-content');
const main = document.querySelector('.main');
const carsOnScreenDiv = document.querySelector('.cars');

const carCreator = (id, name, brand, manufacturedYear, doors, price, available, image) => {
    const getId = () => { return id };
    const getName = () => { return name };
    const getBrand = () => { return brand };
    const getManufacturedYear = () => { return manufacturedYear };
    const getDoorsNumber = () => { return doors };
    const getPrice = () => { return price };
    const isAvailable = () => { return available };
    const getImg = () => { return image }; 
    return { getId, getName, getBrand, getManufacturedYear, getDoorsNumber, getPrice, isAvailable, getImg }
}

function manageCarArray() {
    const carsArray = [];

    const pushCarsInArray = (car) => {
        carsArray.push(car)
    }
    const returnArray = () => { return carsArray };

    return { pushCarsInArray, returnArray }
}
const manageCars = manageCarArray();

for(let i = 0; i < cars.length; i++){
    const createCars = carCreator(cars[i].id, cars[i].name, cars[i].brand, cars[i].manufacturedYear , cars[i].doors , cars[i].price , cars[i].available, cars[i].image);
    manageCars.pushCarsInArray(createCars);
    pushCarsOnScreen();
}

function pushCarsOnScreen() {
    const html = 
    `
    <div class="car-content">
            <div>
                <h1>Toyota Corrolla</h1>
                <img src="toyota-corrolla.png">
            </div>
            <div class="car-description">
                <h3>Brand: Toyota</h3>
                <h3>Manufactured year: 2019</h3>
                <h3>Doors: 4</h3>
                <h3>Price: $22000</h3>
            </div>
            <div class="available-info">
                <h3>Available: Yes</h3>
            </div>
            <button>Delete</button>
    </div>
    `
    carsOnScreenDiv.insertAdjacentHTML('beforeend', html);
}
console.log(manageCars.returnArray())