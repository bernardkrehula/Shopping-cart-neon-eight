import { cars } from "./carArray.js";

const carsOnScreenDiv = document.querySelector('.cars');
const availabilityBtn = document.querySelector('.availability');
const sortOptions = document.querySelector('.sortOptions');

const carCreator = (carId, carName, carBrand, carManufacturedYear, carDoors, carPrice, carAvailable, carImage) => {
    let id = carId;
    let name = carName;
    let brand = carBrand;
    let manufacturedYear = carManufacturedYear;
    let doors = carDoors;
    let price = carPrice;
    let available = carAvailable;
    let image = carImage;

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
    const filterCars = (key, value) => {
        carsArray.length = 0;
        let filter = cars.filter(car => car[key] == value);
        return filter;
    }
    const sortArrayFromAtoZ = () => {
        carsArray.sort((a, b) => a.getName().localeCompare(b.getName()));
    }
    const sortArrayFromZtoA = () => {
        carsArray.sort((a, b) => b.getName().localeCompare(a.getName()));
    }
    const sortArrayByLowestPrice = () => {
        carsArray.sort((a, b) => a.getPrice() - b.getPrice());
    }
    const sortArrayByHighestPrice = () => {
        carsArray.sort((a, b) => b.getPrice() - a.getPrice());
    }
    const showCarsOnScreen = () => {
        carsArray.map(car => pushCarsOnScreen(car));
    }

    const returnArray = () => { return carsArray };

    return { pushCarsInArray, sortArrayFromAtoZ, sortArrayFromZtoA, returnArray, showCarsOnScreen, sortArrayByLowestPrice, sortArrayByHighestPrice, filterCars }
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

availabilityBtn.addEventListener('change', (event) => {
    const availabilityOption = event.target.value;
    const [key, value] = availabilityOption.split('-');
    const filteredCars = manageCars.filterCars(key, value);
    carsOnScreenDiv.innerHTML = '';
    filteredCars.forEach(car => pushCarsOnScreen(carCreator(car.id, car.name, car.brand, car.manufacturedYear , car.doors , car.price , car.available, car.image)));
})

sortOptions.addEventListener('change', () => {
    const sort = sortOptions.value;

    if(sort == 'sort-a-z' ){
        carsOnScreenDiv.innerHTML = '';
        manageCars.sortArrayFromAtoZ();
        manageCars.showCarsOnScreen();
    }
    if(sort == 'sort-z-a'){
        carsOnScreenDiv.innerHTML = '';
        manageCars.sortArrayFromZtoA();
        manageCars.showCarsOnScreen();
    }
    if(sort == 'lowest-price'){
        carsOnScreenDiv.innerHTML = '';
        manageCars.sortArrayByLowestPrice();
        manageCars.showCarsOnScreen();
    }
    if(sort == 'highest-price'){
        carsOnScreenDiv.innerHTML = '';
        manageCars.sortArrayByHighestPrice();
        manageCars.showCarsOnScreen();
    }
})

carsOnScreenDiv.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('button');
    const div = e.target.closest('div');
    
    if(deleteBtn){
        carsOnScreenDiv.removeChild(div);
    }
})
