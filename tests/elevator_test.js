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

  it('should bring a rider to a floor above their current floor', () => {

    let person = new Person("staci", 5)

    assert.equal(elevator.currentFloor, 0)
    elevator.pickUpRider(person, 5);

    assert.deepEqual(elevator.currentRiders, [person])
    assert.equal(elevator.motionStatus, 'idle');
    assert.equal(elevator.currentFloor, 5)
    assert.equal(elevator.totalStops, 2)
    console.log(elevator.getStops());
    // assert(elevator.getStops()).equals([2, 5]);
    // assert.equal(elevator.addFloorTotal(5), 5)
  })

  it('should bring a rider to a floor below their current floor', () => {
    let person = new Person("Brittany", 5, 6)
    assert.equal(elevator.currentFloor, 0)

    elevator.floorRequest(person);
    elevator.pickUpRider(person)
    assert.equal(elevator.currentRiders[0].name, "Brittany")
    // assert.equal(elevator.currentFloor, 5)
    // assert(elevator.motionStatus).equals('idle');
    // assert(elevator.getStops()).equals([8, 3]);
  });

it('it should have a reset method', () => {
  let person = new Person("Brittany", 5)
  elevator.floorRequest(person,3)
  assert.equal(elevator.currentFloor, 0)
})

it('should have a currentFloor method', () => {
  let person = new Person("Brittany", 5)
  assert.equal(elevator.currentFloor, 0)
  elevator.floorRequest(person, 4)
})
});

describe('Person', function() {
    let person = new Person("Louisa", 7, 9)

    it('should have a person with a name and current floor', () => {
      assert.deepEqual(person.name, "Louisa")
      assert.equal(person.currentFloor, 7)
    })
})
