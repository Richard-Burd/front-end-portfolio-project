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

  let palletBuilder8 = document.createElement('div')
      palletBuilder8.setAttribute('class', 'pallet-weight')
      palletBuilder8.innerText = weight

  // if hazerdous (hazmat) materials are present, the hazmat icon will appear
  if (hazmat == true) {
    let palletBuilder9 = document.createElement('img')
        palletBuilder9.setAttribute('class', 'hazmat-icon')
        palletBuilder9.setAttribute('src', 'HAZMAT.svg')
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
      insertPoint.appendChild(palletBuilder1)
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
      dashNRegex = singleConcearn.replace(/\s+/g, '-').toLowerCase()
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
      newPalletFormBuilder16.setAttribute('name', '1st-content')

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
      newPalletFormBuilder21.setAttribute('name', '2nd-content')

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
      newPalletFormBuilder25.setAttribute('name', '3rd-content')

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

  let newPalletFormBuilder35 = document.createElement('input')
      newPalletFormBuilder35.setAttribute('class', 'master')
      newPalletFormBuilder35.setAttribute('type', 'submit')
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
function removeDeleteButtonFromStorageArea(storageAreaID){
  const startpoint = document.querySelector(`[data-storage-area-id="${storageAreaID}"]`);
  if (startpoint.querySelector('div.pallet-box') != null){
    let target = startpoint.querySelector('#delete-area');
    let parent = target.parentNode;
    parent.removeChild(target);
  }
}

function removeDeleteButtonsWhereNecessary(){
  let panelArray = document.querySelectorAll('div.panel');
  for (let e = 1; e < panelArray.length - 1; e++) {
    removeDeleteButtonFromStorageArea(e);
  }
}

function totalNumberOfPallets(){
  value = document.querySelectorAll('div.pallet-box').length
  document.querySelector('span.pallet-count#total-value').innerText = value;
}
// <div class="pallet-weight">124</div>
function totalPalletWeight(){

}

function totalSquareFootage(){

}


// The following is seed data:
createStorageArea("North Tarmac", "1", "12,300")
createStorageArea("Clamshell", "2", "8,500")
createStorageArea("West Lot", "3", "15,700")
createStorageArea("Old Storage", "4", "3,000")
createStorageArea("Connex Yard", "5", "6,700")

createPallet(1, 1, "436L-1", "green", "lightweight", "Bottled Water", "Rice Bags", "Cooking Oil", "724", false)
createPallet(1, 2, "436L-4", "amber", "lightweight", "Wheat", "Barley", "Hopps", "424", false)
createPallet(1, 3, "436L-12", "green", "heavyweight", "Buckwheat", "Salt", " ", "124", true)
createPallet(1, 4, "436L-15", "red", "middleweight", "Tooth paste", "Gause", "Rice", "724", true)
createPallet(1, 5, "436L-5W", "red", "lightweight", "Farrekeh", "Cloth diapers", "misc. clothes", "724", false)
createPallet(1, 6, "436L-G2", "amber", "middleweight", "Soyeans", "Bottled Water", "My New Pallet", "724", false)
createPallet(2, 7, "436L-PQ", "red", "middleweight", "Bleach", "2nd Item", "Bandages", "724", false)
createPallet(2, 8, "436L-16", "green", "lightweight", "Fenoa", "IV dripps", "Construction tools", "724", true)
createPallet(2, 9, "436L-M1", "amber", "middleweight", "Flour", "Vaccines", "Misc. shoes for adults", "724", false)
createPallet(5, 10, "436L-12A", "red", "heavyweight", "Maze", "Rice", "My New Pallet", "724", false)
createPallet(5, 11, "436L-4E", "red", "lightweight", "1st Item", "2nd Item", "Towels", "724", false)
createPallet(5, 12, "436L-J9", "amber", "lightweight", "Kid's shoes", "Towels", "WD-40", "394", true)
createPallet(5, 13, "436L-54", "red", "lightweight", "Medical supplies", "Dried figs", "toddler clothes", "724", true)
createPallet(5, 13, "436L-22", "green", "heavyweight", "School supplies", " ", "Dried cans of Tuna", "724", true)

removeDeleteButtonsWhereNecessary()

totalNumberOfPallets()

// This is needed to query the data sets in the HTML:
// https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
