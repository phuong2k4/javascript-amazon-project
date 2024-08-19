class Car{
    #brand;
    #model;
    speed;
    isTrunkOpen;

    constructor(carDetails){
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
        this.speed = carDetails.speed;
        this.isTrunkOpen = carDetails.isTrunkOpen;
    }

    displayInfo(){
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed}km/h`)
    };

    go(){
        if(this.isTrunkOpen===true){
            console.log("Cant open the trunk because the car is moving!")
        }else{
            this.speed += 5
            return this.speed <= 200 ? console.log(`${this.speed}`) : this.speed = 200; 
        }
    }
    break(){
        this.speed -= 5;
        console.log(this.speed)
    }

    openTrunk(){
        this.isTrunkOpen = true;
    }
    closeTrunk(){
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car{
    acceleration;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go(){
        this.speed += this.acceleration;
        return this.speed <= 300 ? console.log(`${this.speed}`) : this.speed = 300; 
    }
    openTrunk(){
        this.isTrunkOpen = null
    }
    closeTrunk(){
        this.isTrunkOpen = null
    }
}

const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolla',
    speed: 0,
    isTrunkOpen: null, 
})

const car2 = new Car({
    brand: 'Tesla',
    model: 'Model 3',
    speed: 0,
    isTrunkOpen: null,
})

const car3 = new RaceCar({
    brand: 'Mclaren',
    model: 'F1',
    speed: 0,
    isTrunkOpen: null,
    acceleration: 20
})


car3.displayInfo()