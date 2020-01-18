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
  }
};
