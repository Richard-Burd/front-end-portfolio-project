function importStorageAreasFromRailsAPItoJsClassObject(){
fetch(STORAGE_AREAS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    for (const element of json) {
      // This code below is easier, but it would skip creating Javascript model
      // objects per the following specific project requirement @ Flatiron School:
      // "Translate JSON responses into JavaScript model objects using ES6 class or constructor function syntax."
      // createStorageArea(element.name, element.id, element.area)
      let newArea = new StorageArea(element.name, element.id, element.area)
      StorageArea.instances.push(newArea);
    }
  })
  .then(function(json) {
    transferStorageAreaObjectInstancesToDOM();
    totalSquareFootage();
  })
}

function importPalletsFromRailsAPItoDOM(retries = 10){
  async function getPalletsWithAsyncAwait(){
    let response = await fetch(PALLETS_URL);
    let data = await response.json()
    return data;
  }

  getPalletsWithAsyncAwait()
    .then(function(json) {
      for (const element of json) {
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

    // This is required because the pallets fail to load into the DOM about
    // every 18 to 25 times or so...implementing the 10 retries requirement
    // has fixed this problem.
    .catch(error => {
      if (retries <= 0) {
        throw error;
      }
      return importPalletsFromRailsAPItoDOM(retries - 1);
    })
}

function createANewPallet(palletData){
 fetch(PALLETS_URL, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Accept: "application/json"
     },
     body: JSON.stringify({
       "java_script_name": palletData.name.value,
       "java_script_weight": palletData.weight.value,
       "java_script_priority": palletData.priority.value,
       "java_script_first_content": palletData.first_content.value,
       "java_script_second_content": palletData.second_content.value,
       "java_script_third_content": palletData.third_content.value,
       "java_script_hazmat": palletData.hazmat.value,
       "java_script_storage_area_id": palletData.storage_area_id.value
     })
   })
   .then(function(json) {
     console.log(json);
     updateAStorageArea(pallet_data.storage_area_id.value) // this will reload the page
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
// re-colors the pallet backgrounds according to their relative weight when
// compared to other pallets inside the same storage area.  Whenever a pallet is
// added to or deleted from a storage area, all pallet background color values
// assigned to that storage area will be re-calculated.
function updateAStorageArea(storageAreaId){
  return fetch(`${STORAGE_AREAS_URL}/${storageAreaId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
    }),
  document.location.reload(true); // This will reload the page
}

function deleteASpecifiedPallet(palletId, storageAreaID){
 fetch(`${PALLETS_URL}/${palletId}`, {
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json',
       Accept: "application/json"
     },
   })
   .then(function(json) {
     console.log(json);
     updateAStorageArea(storageAreaID); // this will reload the page
   });
}

function deleteASpecifiedStorageArea(storageAreaId) {
  return fetch(`${STORAGE_AREAS_URL}/${storageAreaId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
    }),
 window.location.reload(); // alternative => document.location.reload(true);
}
