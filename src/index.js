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

function createStorageArea(){
  let storageAreaBuilder1 = document.createElement('div')
      storageAreaBuilder1.setAttribute('class', 'panel')
      storageAreaBuilder1.setAttribute('data-storage-area-id', "3")

  let storageAreaBuilder2 = document.createElement('div')
      storageAreaBuilder2.setAttribute('class', 'storage-area')

  let storageAreaBuilder3 = document.createElement('span')
      storageAreaBuilder3.setAttribute('class', 'storage-area-name')
      storageAreaBuilder3.innerText = "My New Storage Area Name"

  let storageAreaBuilder4 = document.createElement('span')
      storageAreaBuilder4.setAttribute('class', 'storage-area-value')

  let storageAreaBuilder5 = document.createElement('button')
      storageAreaBuilder5.setAttribute('class', 'master')
      storageAreaBuilder5.setAttribute('id', 'create-pallet')

  let storageAreaBuilder6 = document.createElement('button')
      storageAreaBuilder6.setAttribute('class', 'master')
      storageAreaBuilder6.setAttribute('id', 'delete-area')

  let storageAreaBuilder7 = document.createElement('div')
      storageAreaBuilder7.setAttribute('class', 'pallets')
      storageAreaBuilder7.setAttribute('data-pallet-group', '2')

  // NEXT STEP: the "appendChild" elements need to be made
  
}
// This is needed to query the data sets in the HTML:
// https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
