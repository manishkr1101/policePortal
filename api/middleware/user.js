const db = require('./db')
class User{
    constructor(user){
        this.name = user.Name,
        this.dob = user.DOB,
        this.address = user.Address,
        this.district = user.District,
        this.gender = user.Gender,
        this.state = user.State,
        this.city = user.city,
        this.email = user.email,
        this.phone = user.mobileNo
    }
}

module.exports = {
    User: User,
    getUser: async function(uid){
        const user = await (await db.ref('USERS/'+uid).once('value')).val()
        const u = new User(user)
        console.log(u)
        return u;
    }
}