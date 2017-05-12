class Elevator {
  constructor() {
    this.currentFloor = 0,
    this.currentRiders = [],
    this.motionStatus = 'idle' || 'moving' || 'broken',
    this.totalStops = 0,
    this.totalFloors = 0,
    this.goingUp = true,
    this.requests = []
  }

  pickUpPerson(person) {
    if(person.requestedFloor != this.currentFloor) {
      this.currentRiders.push(person)
      this.motionStatus = "moving"
    }

    if(this.currentRiders.length == 1) {
      if(person.currentFloor > this.currentFloor) {
        this.goingUp = false
      } else if (person.currentFloor > this.currentFloor) {
        this.goingUp = true
      }
    }
  }

  dropOffPerson(person) {
    var riderIndex = this.currentRiders.indexOf(person);
    this.currentRiders.splice(riderIndex, 1);
  }

  goToFloor() {
    var self = this

    while (this.currentRiders.length) {
      let stop = false;

      if (this.goingUp) {
        this.currentFloor++;
      } else {
        this.currentFloor--;
      }

      this.currentRiders.forEach(function(myRider, index, myArray) {
        myArray[index].currentFloor = self.currentFloor;
        if (myRider.requestedFloor == self.currentFloor) {
          self.dropOffPerson(myRider)
          stop = true;
        }
      })

      if (stop) {
        this.totalStops++;
      }

      this.totalFloors++

      if (this.goingUp) {
        if (!this.currentRiders.find(function(rider, index){
          return rider.requestedFloor > self.currentFloor
        })) {
          this.goingUp = false;
        }
      } else {
        if (!(this.currentRiders.find(function(rider, index){
          return (rider.requestedFloor < self.currentFloor)
        }))) {
          this.goingUp = true;
        }
      }
    }
    this.motionStatus = 'idle'
  }

  reset() {
    this.currentFloor = 0,
    this.motionStatus = 'idle'
    this.currentRiders = [],
    this.totalStops = [],
    this.totalFloors = 0,
    this.requests = []
  }

  currentFloor() {
    this.currentFloor
  }

}

class Person {
  constructor({name, currentFloor, requestedFloor}) {
    this.name = name,
    this.currentFloor = currentFloor,
    this.requestedFloor = requestedFloor
  }
}

module.exports = {Elevator, Person};
