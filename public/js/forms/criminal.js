
let elems = {
    sex: document.querySelector('select[name=sex]'),
    state: document.querySelector('select[name=state]'),
    district: document.querySelector('select[name=district]'),
    permState: document.querySelector('select[name=permState]'),
    permDistrict: document.querySelector('select[name=permDistrict]'),
    natureOfComplaint: document.querySelector('select[name=type]'),
    crimeSubtype: document.querySelector('select[name=sub-type]')
    
}
let ins = {}




document.addEventListener('DOMContentLoaded', async function() {
    await loadStates();
    await loadNatureOfComplaint();

    for(let el in elems){
        ins[el] = M.FormSelect.init(elems[el])
    }
});

elems.state.addEventListener('change', loadDistrict)
elems.natureOfComplaint.addEventListener('change', loadCrimeSubtype)


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









async function loadNatureOfComplaint(){
    const res = await fetch('/nature-of-complaint')
    const data = await res.json()
    const complaints = data;

    $(elems.natureOfComplaint).empty().append(`<option value="" disabled selected>Choose your complaint</option>`)
    for(let complaint of complaints){
        
        $(elems.natureOfComplaint).append(`<option value="${complaint}">${complaint.replace('-','/')}</option>`)
    }
}

async function loadCrimeSubtype(){
    // alert('ch')
    ins.crimeSubtype.destroy();
    $(elems.crimeSubtype).empty().append(`<option value="" disabled selected>Choose your crime subtype</option>`)
    let noc = $(elems.natureOfComplaint).val()
    
    const res = await fetch(`/nature-of-complaint/${noc}`)
    const data = await res.json()
    const crimeSubtypes = data;
    // console.log(data)
    for(let crimeSubtype of crimeSubtypes){
        $(elems.crimeSubtype).append(`<option value="${crimeSubtype}">${crimeSubtype}</option>`)
    }
    ins.crimeSubtype = M.FormSelect.init(elems.crimeSubtype)
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