import { cars } from "./carArray.js";

const carContent = document.querySelector('.car-content');

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
}
console.log(manageCars.returnArray())