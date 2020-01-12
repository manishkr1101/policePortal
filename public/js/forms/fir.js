
let elems = {
    sex: document.querySelector('select[name=sex]'),
    state: document.querySelector('select[name=state]'),
    district: document.querySelector('select[name=district]'),
    ps: document.querySelector('select[name=ps]'),
    permState: document.querySelector('select[name=permState]'),
    permDistrict: document.querySelector('select[name=permDistrict]'),
    permPs: document.querySelector('select[name=permPs]'),
    natureOfComplaint: document.querySelector('select[name=natureOfComplaint]'),
    crimeSubType: document.querySelector('select[name=crimeSubType]')
}
let ins = {}


document.addEventListener('DOMContentLoaded', async function() {
    await loadStates();
    // let elems = document.querySelectorAll('select');
    for(let el in elems){
        ins[el] = M.FormSelect.init(elems[el])
    }
    // var instances = M.FormSelect.init(elems, {});
    // ins = instances;
});

elems.state.addEventListener('change', loadDistrict)
elems.permState.addEventListener('change', loadPermDistrict)
elems.district.addEventListener('change', loadPs)
elems.permDistrict.addEventListener('change', loadPermPs)


async function loadStates(){
    
    const res = await fetch('/places/states')
    const data = await res.json()
    const states = data;

    $(elems.state).empty().append(`<option value="" disabled selected>Choose your state</option>`)
    for(let state of states){
        $(elems.state).append(`<option value="${state}">${state}</option>`)
    }
    $(elems.permState).empty().append(`<option value="" disabled selected>Choose your state</option>`)
    for(let state of states){
        $(elems.permState).append(`<option value="${state}">${state}</option>`)
    }
}

async function loadDistrict(){
    // alert('ch')
    ins.district.destroy();
    $(elems.district).empty().append(`<option value="" disabled selected>Choose your district</option>`)
    let state = $(elems.state).val()
    
    const res = await fetch('/places/'+state)
    const data = await res.json()
    const districts = data;
    // console.log(data)
    for(let district of districts){
        $(elems.district).append(`<option value="${district}">${district}</option>`)
    }
    ins.district = M.FormSelect.init(elems.district)
}



async function loadPermDistrict(){
    // alert('ch')
    ins.permDistrict.destroy();
    $(elems.permDistrict).empty().append(`<option value="" disabled selected>Choose your district</option>`)
    let state = $(elems.permState).val()
    
    const res = await fetch('/places/'+state)
    const data = await res.json()
    const districts = data;
    for(let district of districts){
        $(elems.permDistrict).append(`<option value="${district}">${district}</option>`)
    }
    ins.permDistrict = M.FormSelect.init(elems.permDistrict)
}

async function loadPs(){
    ins.ps.destroy()
    $(elems.ps).empty().append(`<option value="" disabled selected>Choose your Police Station</option>`)
    let state = $(elems.state).val()
    let dist = $(elems.district).val()

    const res = await fetch(`/places/${state}/${dist}`)
    const data = await res.json()
    const pss = data
    for(let ps of pss){
        $(elems.ps).append(`<option value="${ps}">${ps}</option>`)
    }
    ins.ps = M.FormSelect.init(elems.ps)
}

async function loadPermPs(){
    ins.permPs.destroy()
    $(elems.permPs).empty().append(`<option value="" disabled selected>Choose your Police Station</option>`)
    let state = $(elems.permState).val()
    let dist = $(elems.permDistrict).val()

    const res = await fetch(`/places/${state}/${dist}`)
    const data = await res.json()
    const pss = data
    for(let ps of pss){
        $(elems.ps).append(`<option value="${ps}">${ps}</option>`)
    }
    ins.permPs = M.FormSelect.init(elems.permPs)
}

$(document).ready(function () {
    
    
    const date = new Date();
    $('.datepicker').datepicker({
        autoClose: true,
        maxDate: date,
        setDefaultDate: true,
        defaultDate: date
    });

    
})