import { cars } from "./carArray.js";

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
    const availableCars = () => {
        return carsArray.filter(car => car.isAvailable() != 'no'); 
    }
    const notAvailableCars = () => {
        return carsArray.filter(car => car.isAvailable() != 'yes');
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
    const showAvailableCars = () => {
        const showCars = availableCars();
        showCars.map((car) => pushCarsOnScreen(car));
    }
    const showNotAvailableCars = () => {
        const showCars = notAvailableCars();
        showCars.map((car) => pushCarsOnScreen(car));
    }

    const returnArray = () => { return carsArray };

    return { pushCarsInArray, sortArrayFromAtoZ, sortArrayFromZtoA, returnArray, showCarsOnScreen, sortArrayByLowestPrice, sortArrayByHighestPrice, availableCars, notAvailableCars, showAvailableCars, showNotAvailableCars }
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

availabilityBtn.addEventListener('change', () => {
    const availabilityOption = availabilityBtn.value;
 
    if(availabilityOption == 'all'){
        carsOnScreenDiv.innerHTML = '';
        manageCars.showCarsOnScreen();
    }
    if(availabilityOption == 'available-yes'){
        carsOnScreenDiv.innerHTML = '';
        manageCars.availableCars();
        manageCars.showAvailableCars();
        console.log(manageCars.returnArray())
    }
    if(availabilityOption == 'available-no'){
        carsOnScreenDiv.innerHTML = '';
        manageCars.notAvailableCars();
        manageCars.showNotAvailableCars();
    }
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
