const db = require("./db");
module.exports = {
  getAllLostVehicles: async function(vehicleId) {
    const lostVehicles = await (
      await db.ref(`Vehicle Lost`).once("value")
    ).val();
    let vehicles = [];
    for (let vehicle in lostVehicles) {
      let lostVehicle = await await db.ref(``);
    }
  }
};
