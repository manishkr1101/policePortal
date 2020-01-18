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
  },
  acceptFir: async function(firNo){
    try {
      let fir = await this.getFirById(firNo)
      if(fir.status == 'pending'){
        fir.status = 'accepted'
        fir.accepted = 1
        await this.updateFir(firNo, fir)
      }
    } catch (error) {
      throw error
    }
  },
  updateFir: async function(firNo, fir){
    await db.ref(`fir/${firNo}`).update(fir)
  },
  rejectFir: async function(firNo){
    try {
      let fir = await this.getFirById(firNo)
      if(fir.status == 'pending'){
        fir.status = 'rejected'
        fir.accepted = 0
        await this.updateFir(firNo, fir)
      }
    } catch (error) {
      throw error
    }
  }
};
