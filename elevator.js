class Elevator {
  constructor(currentFloor) {
    this.currentFloor = 0,
    this.currentRiders = [],
    this.motionStatus = 'idle' || 'moving' || 'broken',
    this.requests = [],
    this.totalStops = 0,
    this.totalFloors = 0
  }


  currentFloor() {
    this.currentFloor
  }

  floorRequest(person) {
    this.requests.push({
      name: person.name,
      currentFloor: person.currentFloor,
      requestedFloor : person.requestedFloor
    })
    var floor = this.requests[0].requestedFloor

    this.addFloorTotal(floor)
    this.state = 'moving',
    this.addStop()
    this.currentFloor = floor
  }

  reset() {
    this.currentFloor = 0
    this.motionStatus = 'idle'
    this.currentRiders = []
  }

  pickUpRider(person, requestedFloor) {
    let floor = person.currentFloor
    this.addStop()
    this.status = 'moving'
    this.currentFloor = person.currentFloor
    this.currentRiders.push(person)
    this.floorRequest(person, requestedFloor)
    this.addFloorTotal(floor)
  }

  addStop() {
    this.motionStatus = 'idle'
    this.totalStops = this.totalStops +1
  }

  addFloorTotal(floor) {
    this.totalFloors += Math.abs(this.currentFloor - floor)
  }

  getStops(currentFloor, requestedFloor) {

  }

}

class Person {
  constructor(name, currentFloor, requestedFloor) {
    this.name = name,
    currentFloor = currentFloor,
    requestedFloor = requestedFloor
  }

}

module.exports = {Elevator, Person};


// Vending Machine Example
//setSelection(keycode) {
//selection = keycode
//}

//credits> inventory.keycode.cost

//insertCredits(amt)
//credits += amt

//vend(keycode)
//need a status method in the constructor
//check credits and inventory if they both pass vend otherwise display status code (not enough credit or out of stock)

//vend(keycode)
//selection = null
//inventory.keycode .shift()
//credit -= inventory.keycode.constructor
//credits > 0 return credits
