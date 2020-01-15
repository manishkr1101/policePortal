const db = require("./db");

module.exports = {
  getAllFirByPS: async function(psid) {
    const firNos = await (
      await db.ref(`police-station/${psid}/fir`).once("value")
    ).val();
    let firs = [];
    for (let firNo in firNos) {
      let fir = await (await db.ref(`fir/${firNo}`).once("value")).val();
      firs.push(fir);
    }
    return firs;
  },
  getFirById: async function(firNo) {
    try {
      let fir = await (await db.ref(`fir/${firNo}`).once("value")).val();
      return fir;
    } catch (exc) {
      throw exc;
    }
  }
};
