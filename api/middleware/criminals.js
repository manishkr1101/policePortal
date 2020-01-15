const db = require('./db')

module.exports = {
    getAllCriminals: async function(){
        try{
            let obj = await (await db.ref('/criminals').once('value')).val()
            // return obj
            let criminals = []
            for(let key in obj){
                criminals.push(obj[key])
            }
            return criminals
        }
        catch(exc){
            throw exc
        }
    },
    getCriminalById: async function(criminalId){
        try{
            let obj = await (await db.ref('/criminals').once('value')).val()
            // return obj
            let criminals = []
            for(let key in obj){
                criminals.push(obj[key])
            }
            return criminals
        }
        catch(exc){
            throw exc
        }
    }
}