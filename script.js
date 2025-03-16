import { cars } from "./carArray.js";

const carContent = document.querySelector('.car-content');
const main = document.querySelector('.main');
const carsOnScreenDiv = document.querySelector('.cars');
const availabilityBtn = document.querySelector('.availability');
const sortOptions = document.querySelector('.sortOptions');

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
        carsArray.push(car);
    }
    const sortArrayFromAtoZ = () => {
        carsArray.sort((a, b) => a.getName().localeCompare(b.getName()));
    }
    const sortArrayFromZtoA = () => {
        carsArray.sort((a, b) => b.getName().localeCompare(a.getName()));
    }
    const showCardsOnScreen = () => {
        carsArray.map(car => pushCarsOnScreen(car));
    }

    const returnArray = () => { return carsArray };

    return { pushCarsInArray, sortArrayFromAtoZ, sortArrayFromZtoA, returnArray, showCardsOnScreen}
}

const manageCars = manageCarArray();

for(let i = 0; i < cars.length; i++){
    const createCars = carCreator(cars[i].id, cars[i].name, cars[i].brand, cars[i].manufacturedYear , cars[i].doors , cars[i].price , cars[i].available, cars[i].image);

    manageCars.pushCarsInArray(createCars);
    pushCarsOnScreen(createCars);
}
function backgroundColor(available) {
    if(available == 'yes'){
        return 'rgb(128, 255, 128)';
    }
    if(available == 'no') {
        return 'rgb(240, 61, 61)';
    }
   
}

function pushCarsOnScreen(car) {
    const html = 
    `
    <div class="car-content" id="${car.getId()}">
            <div>
                <h1>${car.getName()}</h1>
                <img src="${car.getImg()}">
            </div>
            <div class="car-description">
                <h3>Brand: ${car.getBrand()}</h3>
                <h3>Manufactured year: ${car.getManufacturedYear()}</h3>
                <h3>Doors: ${car.getDoorsNumber()}</h3>
                <h3>Price: $${car.getPrice()}</h3>
            </div>
            <div class="available-info" style="background-color: ${backgroundColor(car.isAvailable())};">
                <h3>Available: ${car.isAvailable()}</h3>
            </div>
            <button>Delete</button>
    </div>
    `
    carsOnScreenDiv.insertAdjacentHTML('beforeend', html);
}

sortOptions.addEventListener('change', () => {
    const az = sortOptions.value;

    if(az == 'sort-a-z' ){
        carsOnScreenDiv.innerHTML = '';
        manageCars.sortArrayFromAtoZ();
        manageCars.showCardsOnScreen();
    }
    if(az == 'sort-z-a'){
        carsOnScreenDiv.innerHTML = '';
        manageCars.sortArrayFromZtoA();
        manageCars.showCardsOnScreen();
    }
    
})
carsOnScreenDiv.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('button');
    const div = e.target.closest('div');
    
    if(deleteBtn){
        carsOnScreenDiv.removeChild(div);
    }
})
console.log(manageCars.returnArray())