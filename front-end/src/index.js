//////////////////////// LEFT OFF HERE ////////////////////////////////////////

// 1.) When a storage area is deleted, the storage area below it will gain a "delete" button
//     even if the storage area is not empty...the storage area will also loose the ability to
//     detect that it is full and not allow you to add a apllet to it.

// 2.) - done
// 3.)



// 4.) create a graphic for the post-it note that looks cool & has a bent corner-background icon
// 5.) the post-it note has a place for you to add text to it and that is all
// 6.) refreshing the page delete all post-it notes, they are not saved to the database


///////////////////////////////////////////////////////////////////////////////
/*
class PostItNote {
  constructor(text, backgroundColor) {
    this.text = text;
    this.backgroundColor = backgroundColor;
  }
  generateRandomColor() {
    let selector = Math.floor(Math.random() * 4)
    switch(selector) {
      case 0:
        return "#FF7C7C";
        break;
      case 1:
        return "#FFF77CF";
        break;
      case 2:
        return "#7CFF7E";
        break;
      case 3:
        return "#7CE5FF";
        break;
      case 4:
        return "#D97CFF";
        break;
    }
  }
}

evan = new PostItNote("This is my message", 1)
evan.backgroundColor = evan.generateRandomColor()
evan.backgroundColor

evan = new PostItNote("This is my message", 1)
evan.backgroundColor = evan.generateRandomColor()
evan.backgroundColor
*/
const BASE_URL = "http://localhost:3000"
const PALLETS_URL = `${BASE_URL}/pallets`
const STORAGE_AREAS_URL = `${BASE_URL}/storage_areas`

function importStorageAreasFromRailsAPItoDOM(){
fetch(STORAGE_AREAS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    for (const element of json) {
      createStorageArea(element.name, element.id, element.area)
    }
  })
  .then(function(json) {
    totalSquareFootage();
  })
}

function importPalletsFromRailsAPItoDOM(){
fetch(PALLETS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    for (const element of json) {
  // createPallet(1, 1, "436L-1", "green", "lightweight", "Bottled Water", "Rice Bags", "Cooking Oil", "224", false)
  // createPallet(storageAreaID, palletId, palletName, timeScale, weightScale, firstItem, secondItem, thirdItem, weight, hazmat )
      createPallet(
        element.storage_area_id,
        element.id,
        element.name,
        element.priority_category,
        element.weight_category,
        element.first_content,
        element.second_content,
        element.third_content,
        element.weight,
        element.hazmat)
    }
  })
  .then(function(json) {
    console.log("pallet has been added");
    removeDeleteButtonsWhereNecessary();
    labelButtonForStorageAreasThatAreFull();
    totalNumberOfPallets();
    totalPalletWeight();
  })
}



function createANewPallet(pallet_data){
 fetch(PALLETS_URL, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Accept: "application/json"
     },
     body: JSON.stringify({
       "java_script_name": pallet_data.name.value,
       "java_script_weight": pallet_data.weight.value,
       "java_script_priority": pallet_data.priority.value,
       "java_script_first_content": pallet_data.first_content.value,
       "java_script_second_content": pallet_data.second_content.value,
       "java_script_third_content": pallet_data.third_content.value,
       "java_script_hazmat": pallet_data.hazmat.value,
       "java_script_storage_area_id": pallet_data.storage_area_id.value
     })
   })
   .then(function(json) {
     console.log(json);
     updateAStorageArea(pallet_data.storage_area_id.value) // this will reload the page
     // document.location.reload(true);
     // some action will go here involving a page re-load
   });
}

function createANewStorageArea(storage_area_data){
  fetch(STORAGE_AREAS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "java_script_name": storage_area_data.name.value,
      "java_script_area": storage_area_data.area.value,
    })
  })
  .then(function(json) {
    document.location.reload(true);
  });
}

// NOTE: this doesn't change the storage areas themselves, but rather, it
// re-colors the pallets accordith to their relative weight compared to other
// pallets inside the same storage area when a pallet is added to
// or deleted from that same storage area
function updateAStorageArea(storageAreaId){
  return fetch(`${STORAGE_AREAS_URL}/${storageAreaId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
    }),
  // This will refresh the page
  document.location.reload(true);
}

function deleteASpecifiedPallet(palletId, storageAreaID) {
  return fetch(`${PALLETS_URL}/${palletId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
  }),
  updateAStorageArea(storageAreaID); // this will reload the page like
  // document.location.reload(true);
}

function deleteASpecifiedStorageArea(storageAreaId) {
  return fetch(`${STORAGE_AREAS_URL}/${storageAreaId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
    }),
 // This will refresh the page
 window.location.reload(); // alternative => document.location.reload(true);
}

function createPallet(storageAreaID, palletId, palletName, timeScale, weightScale, firstItem, secondItem, thirdItem, weight, hazmat ){

  let palletBuilder1 = document.createElement('div')
      palletBuilder1.setAttribute('class', `pallet-box ${timeScale}-timescale ${weightScale}`)
      palletBuilder1.setAttribute('data-pallet-id', palletId )

  let palletBuilder2 = document.createElement('div')
      palletBuilder2.setAttribute('class', 'pallet-name')
      palletBuilder2.innerText = palletName

  let palletBuilder3 = document.createElement('ul')
      palletBuilder3.setAttribute('class', 'pallet-contents-displayed-in-pallet-box')

  let palletBuilder4 = document.createElement('li')
      palletBuilder4.innerText = firstItem

  let palletBuilder5 = document.createElement('li')
      palletBuilder5.innerText = secondItem

  let palletBuilder6 = document.createElement('li')
      palletBuilder6.innerText = thirdItem

  let palletBuilder7 = document.createElement('button')
      palletBuilder7.setAttribute('class', 'delete-pallet')
      palletBuilder7.innerText = "Delete"
      palletBuilder7.addEventListener('click', event => {
        deleteASpecifiedPallet(palletId, storageAreaID)
        event.preventDefault()
      })

  let palletBuilder8 = document.createElement('div')
      palletBuilder8.setAttribute('class', 'pallet-weight')
      palletBuilder8.innerText = weight

  // if hazerdous (hazmat) materials are present, the hazmat icon will appear
  if (hazmat == true) {
    let palletBuilder9 = document.createElement('img')
        palletBuilder9.setAttribute('class', 'hazmat-icon')
        palletBuilder9.setAttribute('src', 'src/images/HAZMAT.svg')
        palletBuilder9.setAttribute('title', 'hazmat-icon')

        palletBuilder1.appendChild(palletBuilder9) // arranging subcomponents
  }
      // first the inner scope gets built
      palletBuilder3.appendChild(palletBuilder4) // arranging subcomponents
      palletBuilder3.appendChild(palletBuilder5) // arranging subcomponents
      palletBuilder3.appendChild(palletBuilder6) // arranging subcomponents

      // then the outer scope gets built
      palletBuilder1.appendChild(palletBuilder2) // arranging subcomponents
      palletBuilder1.appendChild(palletBuilder3) // arranging subcomponents
      palletBuilder1.appendChild(palletBuilder7) // arranging subcomponents
      palletBuilder1.appendChild(palletBuilder8) // arranging subcomponents

  // this takes the completed pallet and places it into the correct node ont the DOM
  let insertPoint = document.querySelector(`[data-pallet-group="${storageAreaID}"]`)
      insertPoint.appendChild(palletBuilder1)///////////////////////////////////////////////////////////THIS IS CAUSING A BUG
}

function createStorageArea(storageAreaName, storageAreaID, squareFootage){
  let storageAreaBuilder1 = document.createElement('div')
      storageAreaBuilder1.setAttribute('class', 'panel')
      storageAreaBuilder1.setAttribute('data-storage-area-id', storageAreaID)

  let storageAreaBuilder2 = document.createElement('div')
      storageAreaBuilder2.setAttribute('class', 'storage-area')

  let storageAreaBuilder3 = document.createElement('span')
      storageAreaBuilder3.setAttribute('class', 'storage-area-name')
      storageAreaBuilder3.innerText = storageAreaName

  let storageAreaBuilder4 = document.createElement('span')
      storageAreaBuilder4.setAttribute('class', 'storage-area-value')
      storageAreaBuilder4.innerText = squareFootage

  let storageAreaBuilder5 = document.createElement('button')
      storageAreaBuilder5.setAttribute('class', 'master')
      storageAreaBuilder5.setAttribute('id', 'create-pallet')
      storageAreaBuilder5.innerText = 'Create a pallet in this storage area'
      storageAreaBuilder5.addEventListener('click', event => {
        if (storageAreaBuilder5.innerText == 'Create a pallet in this storage area') {
          createNewPalletForm(storageAreaID);
          storageAreaBuilder5.innerText = 'Remove New Pallet Form'
        } else {
          removeNewPalletForm(storageAreaID);
          storageAreaBuilder5.innerText = 'Create a pallet in this storage area'
        }
      })

      // this the the delete button for empty areas:
  let storageAreaBuilder6 = document.createElement('button')
      storageAreaBuilder6.setAttribute('class', 'master')
      storageAreaBuilder6.setAttribute('id', 'delete-area')
      storageAreaBuilder6.innerText = 'Delete this empty area'
      storageAreaBuilder6.addEventListener('click', event => {
        deleteASpecifiedStorageArea(storageAreaID)
        event.preventDefault()
        //deleteASpecifiedStorageArea(storageAreaID)
      })

  let storageAreaBuilder6B = document.createElement('div')
      storageAreaBuilder6B.setAttribute('class', 'new-pallet-form-placeholder')
      storageAreaBuilder6B.setAttribute('data-new-pallet-form-storage-area-id', storageAreaID)

  let storageAreaBuilder7 = document.createElement('div')
      storageAreaBuilder7.setAttribute('class', 'pallets')
      storageAreaBuilder7.setAttribute('data-pallet-group', storageAreaID)

      storageAreaBuilder1.appendChild(storageAreaBuilder2) // arranging subcomponents
      storageAreaBuilder2.appendChild(storageAreaBuilder3) // arranging subcomponents
      storageAreaBuilder2.appendChild(storageAreaBuilder4) // arranging subcomponents
      storageAreaBuilder1.appendChild(storageAreaBuilder5) // arranging subcomponents
      storageAreaBuilder1.appendChild(storageAreaBuilder6) // arranging subcomponents
      storageAreaBuilder1.appendChild(storageAreaBuilder6B) // arranging subcomponents
      storageAreaBuilder1.appendChild(storageAreaBuilder7) // arranging subcomponents

      // this takes the completed storage area and places it into the correct node ont the DOM
      // this will select the scope we want to insert the element into
      let insertScope = document.querySelector('main')

      // we want to insert it before this node
      let insertBeforeMe = insertScope.lastElementChild

          // here we execute the final placement on the DOM
          insertScope.insertBefore(storageAreaBuilder1, insertBeforeMe)

}

function createNewPalletForm(storageAreaID){
  let newPalletFormBuilder1 = document.createElement('form')
      newPalletFormBuilder1.setAttribute('class', 'new-pallet-form')
      newPalletFormBuilder1.addEventListener('submit', event => {
        event.preventDefault()
        createANewPallet(event.target)
      })

  let newPalletFormBuilder2 = document.createElement('div')
      newPalletFormBuilder2.setAttribute('class', 'form-title')
      newPalletFormBuilder2.innerText = 'Add a pallet to this storage area'

  let newPalletFormBuilder3 = document.createElement('label')
      newPalletFormBuilder3.setAttribute('class', 'new-pallet-fields')
      newPalletFormBuilder3.setAttribute('id', 'name')
      newPalletFormBuilder3.innerText = 'Name: '

  let newPalletFormBuilder4 = document.createElement('input')
      newPalletFormBuilder4.setAttribute('class', 'new-pallet-input')
      newPalletFormBuilder4.setAttribute('id', 'name')
      newPalletFormBuilder4.setAttribute('type', 'text')
      newPalletFormBuilder4.setAttribute('name', 'name')

  let newPalletFormBuilder5 = document.createElement('div')
      newPalletFormBuilder5.setAttribute('class', 'priority-section')

  let newPalletFormBuilder6 = document.createElement('label')
      newPalletFormBuilder6.setAttribute('class', 'new-pallet-fields')
      newPalletFormBuilder6.setAttribute('id', 'priority')
      newPalletFormBuilder6.innerText = "Priority:"

  let newPalletFormBuilder7 = document.createElement('div')
      newPalletFormBuilder7.setAttribute('class', 'radio-buttons')
      newPalletFormBuilder7.setAttribute('id', 'priorties')

      // building out the first section before getting to the table further below
      newPalletFormBuilder1.appendChild(newPalletFormBuilder2) // arranging subcomponents
      newPalletFormBuilder1.appendChild(newPalletFormBuilder3) // arranging subcomponents
      newPalletFormBuilder1.appendChild(newPalletFormBuilder4) // arranging subcomponents
      newPalletFormBuilder1.appendChild(newPalletFormBuilder5) // arranging subcomponents
      newPalletFormBuilder5.appendChild(newPalletFormBuilder6) // arranging subcomponents
      newPalletFormBuilder5.appendChild(newPalletFormBuilder7) // arranging subcomponents

  // These are the different categories of concearns that the buttons will be generated for:
  let arrayOfConcearns = ["Life Saving", "Urgent care", "Medium", "Sustainment", "Low impact", "Least concearn"]

  // Iterates over the arrayOfConcearns and generates HTML for each element.
  for (const singleConcearn of arrayOfConcearns){
      dashNRegex = singleConcearn // .replace(/\s+/g, '-').toLowerCase() /////////////////////this prevents the form from pushing data to the rails api...apparently dashes are a no-go
      let newPalletFormBuilder8 = document.createElement('div')
          newPalletFormBuilder8.setAttribute('class', `${dashNRegex}-input-n-label`)
          newPalletFormBuilder8.setAttribute('id', `${arrayOfConcearns.indexOf(singleConcearn)+1}`)

      let newPalletFormBuilder9 = document.createElement('input')
          newPalletFormBuilder9.setAttribute('class', 'push')
          newPalletFormBuilder9.setAttribute('type', 'radio')
          newPalletFormBuilder9.setAttribute('name', 'priority')
          newPalletFormBuilder9.setAttribute('value', `${dashNRegex}`)
          newPalletFormBuilder9.setAttribute('id', `${arrayOfConcearns.indexOf(singleConcearn)+1}`)

      let newPalletFormBuilder10 = document.createElement('label')
          newPalletFormBuilder10.setAttribute('for', `${dashNRegex}`)
          newPalletFormBuilder10.innerText = singleConcearn
          newPalletFormBuilder10.setAttribute('id', `${arrayOfConcearns.indexOf(singleConcearn)+1}`)

          newPalletFormBuilder8.appendChild(newPalletFormBuilder9)  // arranging subcomponents
          newPalletFormBuilder8.appendChild(newPalletFormBuilder10) // arranging subcomponents

      // <div class="radio-buttons" id="priorties">
      let insertPoint = newPalletFormBuilder7
          insertPoint.appendChild(newPalletFormBuilder8)
  }

  // The beginning of the table starts on the next line below:
  let newPalletFormBuilder11 = document.createElement('table')

      newPalletFormBuilder12 = document.createElement('label')
      newPalletFormBuilder12.setAttribute('class', 'new-pallet-fields')
      newPalletFormBuilder12.innerText = "Contents:"

  let newPalletFormBuilder13 = document.createElement('tr')
      newPalletFormBuilder13.setAttribute('class', 'contents')
      newPalletFormBuilder13.setAttribute('id', 'first-content')

  let newPalletFormBuilder14 = document.createElement('td')
      newPalletFormBuilder14.setAttribute('class', 'table-labels')
      newPalletFormBuilder14.innerText = "1.)"

  let newPalletFormBuilder15 = document.createElement('td')

  let newPalletFormBuilder16 = document.createElement('input')
      newPalletFormBuilder16.setAttribute('class', 'new-pallet-input')
      newPalletFormBuilder16.setAttribute('type', 'text')
      newPalletFormBuilder16.setAttribute('name', 'first_content')

  //  note that newPalletFormBuilder17 has been deleted

  let newPalletFormBuilder18 = document.createElement('tr')
      newPalletFormBuilder18.setAttribute('class', 'contents')
      newPalletFormBuilder18.setAttribute('id', 'second-content')

  let newPalletFormBuilder19 = document.createElement('td')
      newPalletFormBuilder19.setAttribute('class', 'table-labels')
      newPalletFormBuilder19.innerText = "2.)"

  let newPalletFormBuilder20 = document.createElement('td')

  let newPalletFormBuilder21 = document.createElement('input')
      newPalletFormBuilder21.setAttribute('class', 'new-pallet-input')
      newPalletFormBuilder21.setAttribute('type', 'text')
      newPalletFormBuilder21.setAttribute('name', 'second_content')

  let newPalletFormBuilder22 = document.createElement('tr')
      newPalletFormBuilder22.setAttribute('class', 'contents')
      newPalletFormBuilder22.setAttribute('id', 'third-content')

  let newPalletFormBuilder23 = document.createElement('td')
      newPalletFormBuilder23.setAttribute('class', 'table-labels')
      newPalletFormBuilder23.innerText = "3.)"

  let newPalletFormBuilder24 = document.createElement('td')

  let newPalletFormBuilder25 = document.createElement('input')
      newPalletFormBuilder25.setAttribute('class', 'new-pallet-input')
      newPalletFormBuilder25.setAttribute('type', 'text')
      newPalletFormBuilder25.setAttribute('name', 'third_content')

      // first the inner-most scope gets built in the table
      newPalletFormBuilder15.appendChild(newPalletFormBuilder16) // arranging subcomponents
      newPalletFormBuilder20.appendChild(newPalletFormBuilder21) // arranging subcomponents
      newPalletFormBuilder24.appendChild(newPalletFormBuilder25) // arranging subcomponents

      // then the middle scope gets built in the table
      newPalletFormBuilder13.appendChild(newPalletFormBuilder14) // arranging subcomponents
      newPalletFormBuilder13.appendChild(newPalletFormBuilder15) // arranging subcomponents
      newPalletFormBuilder18.appendChild(newPalletFormBuilder19) // arranging subcomponents
      newPalletFormBuilder18.appendChild(newPalletFormBuilder20) // arranging subcomponents
      newPalletFormBuilder22.appendChild(newPalletFormBuilder23) // arranging subcomponents
      newPalletFormBuilder22.appendChild(newPalletFormBuilder24) // arranging subcomponents

      // then the outer-most scope gets built in the table
      newPalletFormBuilder11.appendChild(newPalletFormBuilder12) // arranging subcomponents
      newPalletFormBuilder11.appendChild(newPalletFormBuilder13) // arranging subcomponents
      newPalletFormBuilder11.appendChild(newPalletFormBuilder18) // arranging subcomponents
      newPalletFormBuilder11.appendChild(newPalletFormBuilder22) // arranging subcomponents
      newPalletFormBuilder1.appendChild(newPalletFormBuilder11) // arranging subcomponents
      // The section on the table ends on the line above
      // newPalletFormBuilder1.appendChild(newPalletFormBuilder11) // arranging subcomponents

      // now the rest of the form has to be made; left off on
      // the HAZMAT section of the new pallet form.
  let newPalletFormBuilder26 = document.createElement('div')
      newPalletFormBuilder26.setAttribute('class', 'new-pallet-fields')
      newPalletFormBuilder26.setAttribute('id', 'hazmat')

  let newPalletFormBuilder27 = document.createElement('label')
      newPalletFormBuilder27.setAttribute('class', 'new-pallet-fields')
      newPalletFormBuilder27.setAttribute('id', 'hazmat')
      newPalletFormBuilder27.innerText = "HAZMAT:"

  let newPalletFormBuilder28 = document.createElement('div')
      newPalletFormBuilder28.setAttribute('class', 'radio-buttons')
      newPalletFormBuilder28.setAttribute('id', 'hazmat')

  let newPalletFormBuilder29 = document.createElement('div')

  let newPalletFormBuilder30 = document.createElement('input')
      newPalletFormBuilder30.setAttribute('class', 'push')
      newPalletFormBuilder30.setAttribute('type', 'radio')
      newPalletFormBuilder30.setAttribute('id', 'true')
      newPalletFormBuilder30.setAttribute('name', 'hazmat')
      newPalletFormBuilder30.setAttribute('value', 'true')

  let newPalletFormBuilder31 = document.createElement('label')
      newPalletFormBuilder31.setAttribute('for', 'true')
      newPalletFormBuilder31.innerText = "yes"

  let newPalletFormBuilder32 = document.createElement('div')

  let newPalletFormBuilder33 = document.createElement('input')
      newPalletFormBuilder33.setAttribute('class', 'push')
      newPalletFormBuilder33.setAttribute('type', 'radio')
      newPalletFormBuilder33.setAttribute('id', 'false')
      newPalletFormBuilder33.setAttribute('name', 'hazmat')
      newPalletFormBuilder33.setAttribute('value', 'false')

  let newPalletFormBuilder34 = document.createElement('label')
      newPalletFormBuilder34.setAttribute('for', 'false')
      newPalletFormBuilder34.innerText = "no"

  let newPalletFormBuilder34A = document.createElement('div')
      newPalletFormBuilder34A.setAttribute('class', 'new-pallet-fields')
      newPalletFormBuilder34A.setAttribute('id', 'weight')

  let newPalletFormBuilder34C = document.createElement('label')
      newPalletFormBuilder34C.setAttribute('class', 'new-pallet-fields')
      newPalletFormBuilder34C.setAttribute('id', 'weight')
      newPalletFormBuilder34C.innerText = 'Weight: '

  let newPalletFormBuilder34D = document.createElement('input')
      newPalletFormBuilder34D.setAttribute('class', 'new-pallet-input')
      newPalletFormBuilder34D.setAttribute('id', 'weight')
      newPalletFormBuilder34D.setAttribute('type', 'text')
      newPalletFormBuilder34D.setAttribute('name', 'weight')

  let newPalletFormBuilder34E = document.createElement('input')
      newPalletFormBuilder34E.setAttribute('name', 'storage_area_id')
      newPalletFormBuilder34E.setAttribute('value', `${storageAreaID}`)

  // This is the submit button for the new pallet form
  let newPalletFormBuilder35 = document.createElement('input')
      newPalletFormBuilder35.setAttribute('class', 'master')
      newPalletFormBuilder35.setAttribute('type', 'submit')
      newPalletFormBuilder35.setAttribute('name', 'submit') /////////////////////////////////////////// This may or not be required to get the form to submit properly
      newPalletFormBuilder35.setAttribute('value', 'Create a new pallet')

      newPalletFormBuilder1.appendChild(newPalletFormBuilder26) // arranging subcomponents
      newPalletFormBuilder26.appendChild(newPalletFormBuilder27) // arranging subcomponents
      newPalletFormBuilder26.appendChild(newPalletFormBuilder28) // arranging subcomponents
      newPalletFormBuilder28.appendChild(newPalletFormBuilder29) // arranging subcomponents
      newPalletFormBuilder29.appendChild(newPalletFormBuilder30) // arranging subcomponents
      newPalletFormBuilder29.appendChild(newPalletFormBuilder31) // arranging subcomponents
      newPalletFormBuilder28.appendChild(newPalletFormBuilder32) // arranging subcomponents
      newPalletFormBuilder32.appendChild(newPalletFormBuilder33) // arranging subcomponents
      newPalletFormBuilder32.appendChild(newPalletFormBuilder34) // arranging subcomponents

      newPalletFormBuilder1.appendChild(newPalletFormBuilder34A) // arranging subcomponents
      newPalletFormBuilder34A.appendChild(newPalletFormBuilder34C) // arranging subcomponents
      newPalletFormBuilder34A.appendChild(newPalletFormBuilder34D) // arranging subcomponents
      newPalletFormBuilder34A.appendChild(newPalletFormBuilder34E) // arranging subcomponents

      newPalletFormBuilder1.appendChild(newPalletFormBuilder35) // arranging subcomponents

  // this takes the completed new pallet form and places it into a main directory
  let insertPoint = document.querySelector(`[data-new-pallet-form-storage-area-id="${storageAreaID}"]`)
      insertPoint.appendChild(newPalletFormBuilder1)

}
// <div class="new-pallet-form-placeholder" data-new-pallet-form-storage-area-id="1">
function removeNewPalletForm(storageAreaID){
  parent = document.querySelector(`[data-new-pallet-form-storage-area-id="${storageAreaID}"]`)
  target = parent.querySelector('form.new-pallet-form');
  parent.removeChild(target);
}

// You can only delete an area that is empty & doesn't have any pallets in it.
// This function iterates over all areas & removes the delete button from those containing pallets
// function removeDeleteButtonFromStorageArea(storageAreaID){
//   const startPoint = document.querySelector(`[data-storage-area-id="${storageAreaID}"]`);
//   if (startPoint.querySelector('div.pallet-box') != null){
//     let target = startPoint.querySelector('#delete-area');
//     let parent = target.parentNode;
//     parent.removeChild(target);
//   }
// }

// function removeDeleteButtonsWhereNecessary(){
//   let panelArray = document.querySelectorAll('div.panel');
//   for (let e = 1; e < panelArray.length - 1; e++) {
//     removeDeleteButtonFromStorageArea(e); //////////////// This bug is that this won't work when the "e"
//   }
// }
function removeDeleteButtonsWhereNecessary(){
  let panelArray = document.querySelectorAll('div.panel');
  panelArray.forEach(function(panelArray) {

    if (panelArray.querySelector('div.pallets') != null){

      if (panelArray.querySelector('div.pallet-box') != null){
        let target = panelArray.querySelector('#delete-area');
        let parent = target.parentNode; ///////////////////////////////////////////THIS IS CAUSING A BUG
        parent.removeChild(target);
      }

    }

  });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function totalNumberOfPallets(){
  let value = document.querySelectorAll('div.pallet-box').length
  document.querySelector('span.pallet-count#total-value').innerText = value;
}

function totalPalletWeight(){
  let weightValues = []
  let palletWeights = document.querySelectorAll('div.pallet-weight');
  for (const singleWeight of palletWeights) {
    //console.log(parseInt(singleWeight.innerText.replace(/\,/g, '')))
    weightValues.push(parseInt(singleWeight.innerText.replace(/\,/g, '')))
  }
  calcOutput = numberWithCommas(weightValues.reduce((a, b) => a + b, 0))
  document.querySelector('span.gross-weight#total-value').innerText = calcOutput;
}

function totalSquareFootage(){
  let areaValues = []
  // <span class="storage-area-value">12,300</span>
  let areaSpaces = document.querySelectorAll('span.storage-area-value');
  for (const singleSpace of areaSpaces) {
    areaValues.push(parseInt(singleSpace.innerText.replace(/\,/g, '')))
  }
  calcOutput = numberWithCommas(areaValues.reduce((a, b) => a + b, 0))
  document.querySelector('span.gross-area#total-value').innerText = calcOutput;
}

// function checkToSeeIfStorageAreaIsFull(storageAreaID){
//   const startPoint = document.querySelector(`[data-storage-area-id="${storageAreaID}"]`);
//   // this code hardwires the space required for each pallet to be 103 square feet
//   // this is based on the size of a 436L pallet (88in x 108in) with 24 inches of clearance around each pallet
//   let squareFootageRequiredForPallets = startPoint.querySelectorAll('div.pallet-box').length * 103;
//   let storageAreaValue = startPoint.querySelector('span.storage-area-value').innerText;
//   // transform the string to an integer
//   let realStorageAreaValue = parseInt(storageAreaValue.replace(/,/g, ''), 10);
//
//   if (realStorageAreaValue <= squareFootageRequiredForPallets){
//     // This button currently has an event listener on it; the only way to get rid of the eventListener
//     // is to remove the button and re-create it.
//     let target = startPoint.querySelector('button.master#create-pallet')
//     let parent = target.parentNode;
//         parent.removeChild(target)
//
//     let replacementButton = document.createElement('button')
//         replacementButton.setAttribute('class', 'master')
//         replacementButton.setAttribute('id', 'create-pallet')
//         replacementButton.innerText = "Storage Area Full"
//
//         let insertScope = startPoint
//         let insertBeforeMe = startPoint.querySelector('div.new-pallet-form-placeholder')
//             insertScope.insertBefore(replacementButton, insertBeforeMe)
//   }
// }

// function labelButtonForStorageAreasThatAreFull(){
//   let panelArray = document.querySelectorAll('div.panel');
//   for (let e = 1; e < panelArray.length - 1; e++) {
//     checkToSeeIfStorageAreaIsFull(e);
//   }
// }

function labelButtonForStorageAreasThatAreFull(){
  let deleteButtonArray = document.querySelectorAll('div.storage-area');
  deleteButtonArray.forEach(function(deleteButtonArray) {
  let palletCollectionParent = deleteButtonArray.parentNode;
  let palletsArray = palletCollectionParent.querySelectorAll('div.pallet-box')
  let squareFootageRequiredForPallets = palletsArray.length * 103;
  let storageAreaValue = palletCollectionParent.querySelector('span.storage-area-value').innerText;
  let realStorageAreaValue = parseInt(storageAreaValue.replace(/,/g, ''), 10);
    if (realStorageAreaValue <= squareFootageRequiredForPallets){
      // This button currently has an event listener on it; the only way to get rid of the eventListener
      // is to remove the button and re-create it.
      let theParent = deleteButtonArray.parentNode;





      let target = theParent.querySelector('button.master#create-pallet')
      let parent = target.parentNode;
          parent.removeChild(target)

      let replacementButton = document.createElement('button')
          replacementButton.setAttribute('class', 'master')
          replacementButton.setAttribute('id', 'create-pallet')
          replacementButton.innerText = "Storage Area Full"

          let insertScope = theParent
          let insertBeforeMe = theParent.querySelector('div.new-pallet-form-placeholder')
              insertScope.insertBefore(replacementButton, insertBeforeMe)
    }
  });
}

function listenForNewStorageAreaFormSubmittal(){
  let newStorageAreaForm = document.querySelector("form.new-storage-area-form")
      newStorageAreaForm.addEventListener('submit', event => {
        event.preventDefault()
        createANewStorageArea(event.target)
  })
}

// The following is seed data:
/*
createStorageArea("North Tarmac", "1", "12,300")
createStorageArea("Clamshell", "2", "8,500")
createStorageArea("West Lot", "3", "15,700")
createStorageArea("Old Storage", "4", "3,000")
createStorageArea("Connex Yard", "5", "500")

createPallet(1, 1, "436L-1", "green", "lightweight", "Bottled Water", "Rice Bags", "Cooking Oil", "224", false)
createPallet(1, 2, "436L-4", "amber", "lightweight", "Wheat", "Barley", "Hopps", "424", false)
createPallet(1, 3, "436L-12", "green", "heavyweight", "Buckwheat", "Salt", " ", "1,024", true)
createPallet(1, 4, "436L-15", "red", "middleweight", "Tooth paste", "Gause", "Rice", "704", true)
createPallet(1, 5, "436L-5W", "red", "lightweight", "Farrekeh", "Cloth diapers", "misc. clothes", "509", false)
createPallet(1, 6, "436L-G2", "amber", "middleweight", "Soyeans", "Bottled Water", "My New Pallet", "724", false)
createPallet(2, 7, "436L-PQ", "red", "middleweight", "Bleach", "2nd Item", "Bandages", "720", false)
createPallet(2, 8, "436L-16", "green", "lightweight", "Fenoa", "IV dripps", "Construction tools", "203", true)
createPallet(2, 9, "436L-M1", "amber", "middleweight", "Flour", "Vaccines", "Misc. shoes for adults", "264", false)
createPallet(5, 10, "436L-12A", "red", "heavyweight", "Maze", "Rice", "My New Pallet", "702", false)
createPallet(5, 11, "436L-4E", "red", "lightweight", "1st Item", "2nd Item", "Towels", "1,000", false)
createPallet(5, 12, "436L-J9", "amber", "lightweight", "Kid's shoes", "Towels", "WD-40", "394", true)
createPallet(5, 13, "436L-54", "red", "lightweight", "Medical supplies", "Dried figs", "toddler clothes", "777", true)
createPallet(5, 13, "436L-22", "green", "heavyweight", "School supplies", " ", "Dried cans of Tuna", "430", true)
*/
importStorageAreasFromRailsAPItoDOM()
importPalletsFromRailsAPItoDOM()
removeDeleteButtonsWhereNecessary()

// totalNumberOfPallets()

// totalPalletWeight()

// totalSquareFootage()

// labelButtonForStorageAreasThatAreFull()

listenForNewStorageAreaFormSubmittal()

// This is needed to query the data sets in the HTML:
// https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
