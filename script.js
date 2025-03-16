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
    const getArrayProperties = manageCars.returnArray();

    manageCars.pushCarsInArray(createCars);
    pushCarsOnScreen(getArrayProperties[i].getId(), getArrayProperties[i].getName(), getArrayProperties[i].getBrand(), getArrayProperties[i].getManufacturedYear(), getArrayProperties[i].getDoorsNumber(), getArrayProperties[i].getPrice(), getArrayProperties[i].isAvailable(), getArrayProperties[i].getImg());   
}
function backgroundColor(available) {
    if(available == 'yes'){
        return 'rgb(128, 255, 128)';
    }
    if(available == 'no') {
        return 'rgb(240, 61, 61)';
    }
   
}

function pushCarsOnScreen(id, name, brand, manufacturedYear, doors, price, available, img ) {
    const html = 
    `
    <div class="car-content" id="${id}">
            <div>
                <h1>${name}</h1>
                <img src="${img}">
            </div>
            <div class="car-description">
                <h3>Brand: ${brand}</h3>
                <h3>Manufactured year: ${manufacturedYear}</h3>
                <h3>Doors: ${doors}</h3>
                <h3>Price: $${price}</h3>
            </div>
            <div class="available-info" style="background-color: ${backgroundColor(available)};">
                <h3>Available: ${available}</h3>
            </div>
            <button>Delete</button>
    </div>
    `
    carsOnScreenDiv.insertAdjacentHTML('beforeend', html);
}
console.log(manageCars.returnArray())