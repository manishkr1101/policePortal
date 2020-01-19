const db = require("./db");
module.exports = {
  getAllLostVehicles: async function() {
    try {
      const lostVehicles = await (
        await db.ref(`/Vehicle Lost`).once("value")
      ).val();
      let vehicles = [];
      for (let vehicle in lostVehicles) {
        vehicles.push(lostVehicles[vehicle]);
      }
      return vehicles;
    } catch (exc) {
      throw exc;
    }
  },
  getVehicleByNo: async function(regNo) {
    try {
      console.log(regNo);
      let vehicle = await (
        await db.ref(`Vehicle Lost/${regNo}`).once("value")
      ).val();
      console.log(vehicle);
      if (vehicle) {
        return vehicle;
      } else {
        throw "Vehicle not found";
      }
    } catch (exc) {
      throw exc;
    }
  }
};
