const db = require("./db");
const mailer = require('./mailer')

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
        mailer.sendMail(
          fir.complainant.email,
          'Acceptance of FIR',
          `Your FIR ${fir['fir-no']} has been accepted. Kindly Check in your app.\n\nRegards, NCRA.`
        )
        await this.updateFir(firNo, fir)
      }
    } catch (error) {
      throw error
    }
  },
  updateFir: async function(firNo, fir){
    await db.ref(`fir/${firNo}`).update(fir)
  },
  rejectFir: async function(firNo, rejectMsg){
    try {
      let fir = await this.getFirById(firNo)
      if(fir.status == 'pending'){
        fir.status = 'rejected'
        fir.accepted = 0
        fir.rejctMsg = rejectMsg
        mailer.sendMail(
          fir.complainant.email, 
          'Rejection Of you Fir', 
          `Your Fir ${fir['fir-no']} has been rejected. Kindly Check in your app.\nCause of rejection: ${rejectMsg}\n\nRegards, NCRA.`
        )
        await this.updateFir(firNo, fir)
      }
    } catch (error) {
      throw error
    }
  }
};
