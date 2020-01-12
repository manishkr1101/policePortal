const router = require('express').Router()

router.get('/states', (req, res) => {
    let state = 'Andhra Pradesh,Arunachal Pradesh,Assam,Bihar,Chhattisgarh,Goa,Gujarat,Haryana,Himachal Pradesh,Jammu and Kashmir,Jharkhand,Karnataka,Kerala,Madhya Pradesh,Maharashtra,Manipur,Meghalaya,Mizoram,Nagaland,Odisha,Punjab,Rajasthan,Sikkim,Tamil Nadu,Telangana,Tripura,Uttar Pradesh,Uttarakhand,West Bengal,Andaman and Nicobar,Chandigarh,Dadra, Nagar Haveli,Daman and Diu,Lakshadweep,Delhi,Puducherry';
    let states = state.split(',');
    res.status(200).json({
        states: states
    })
})

module.exports = router