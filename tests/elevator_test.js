const assert = require('chai').assert

require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const { Elevator, Person } = require('../elevator');

describe('Elevator', function() {

  let elevator = new Elevator();

  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', (done) => {
    let person = new Person({ name: "Hilary", currentFloor: 4, requestedFloor: 5 })
    elevator.pickUpPerson(person);
    assert.equal(elevator.currentFloor, 4)
    elevator.goToFloor();
    assert.equal(person.currentFloor, 5)
    elevator.dropOffPerson(person)
    done()
  })

  it('should bring a rider to a floor below their current floor', (done) => {
    let person = new Person({ name: "Hilary", currentFloor: 4, requestedFloor: 1 })
    elevator.pickUpPerson(person);
    elevator.goToFloor()
    assert.equal(elevator.currentFloor, 1)
    done()
  });

it('it should have a reset method', () => {
  elevator.motionStatus = "moving"
  elevator.currentFloor = 20
  elevator.reset()
  assert.equal(elevator.currentFloor, 0)
})

it('should have a currentFloor method', () => {
  let person = new Person("Brittany", 5)
  assert.equal(elevator.currentFloor, 0)
})

it('should have a method called pickUpPerson that adds a rider to the array', () => {
  let person = new Person({ name: "Hilary", currentFloor: 4, requestedFloor: 1 })
  assert.deepEqual(elevator.currentRiders, [])
  elevator.pickUpPerson(person)
  assert.deepEqual(elevator.currentRiders[{ name: "Hilary", currentFloor: 4, requestedFloor: 1 }])
});

it('should have a method called dropOffPerson that removes a rider from the array', () => {
  let person = new Person({ name: "Hilary", currentFloor: 4, requestedFloor: 1 })
  elevator.pickUpPerson(person)
  elevator.dropOffPerson()
  assert.deepEqual(elevator.currentRiders, [])
})

it('should pickup a new person and go to their current floor', () => {
  let person1 = new Person({ name: "Chelsea", currentFloor: 2, dropOffFloor: 8 })
  let person2 = new Person({ name: "Hillary", currentFloor: 6, dropOffFloor: 0 })

  elevator.pickUpPerson(person1)
  elevator.pickUpPerson(person2)
  assert.equal(elevator.currentFloor, 6)
  assert.equal(elevator.currentRiders.length, 2)
  elevator.dropOffPerson(person1)
})

it('should have an attribute called totalStops that returns the total number of stops', () => {
  let chelsea = new Person({ name: "Chelsea", currentFloor: 2, requestedFloor: 5 })
  let hillary = new Person({ name: "Hillary", currentFloor: 4, requestedFloor: 1 })
  let bill = new Person({ name: "Bill", currentFloor: 3, requestedFloor: 1 })
  elevator.pickUpPerson(chelsea);
  elevator.pickUpPerson(hillary);
  elevator.pickUpPerson(bill);
  elevator.goToFloor()
  assert.equal(elevator.totalStops, 3)
})

it('should deliver two users going down', () => {
  let person1 = new Person({ name: "Chelsea", currentFloor: 2, dropOffFloor: 8 })
  let person2 = new Person({ name: "Hillary", currentFloor: 6, dropOffFloor: 0 })

  elevator.pickUpPerson(person1)
  elevator.pickUpPerson(person2)
  assert.equal(elevator.currentRiders.length, 2)
})



it('should instantiate a new person',() => {
  let chelsea = new Person({ name: "Chelsea", currentFloor: 2, requestedFloor: 5 })
  assert.deepEqual(chelsea, { name: "Chelsea", currentFloor: 2, requestedFloor: 5 })
})

});
