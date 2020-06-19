# Front-End Portfolio Project
This is a portfolio project submittal for Module 14 of the Full-Stack Web Development program at Flatiron School.&nbsp;  This project is a Single Page Application (SPA) that uses a Rails API back-end and a JavaScript + HTML + CSS front-end per assignment specifications.

## Getting Started
To run this app locally, you will need to have [Rails](https://rubyonrails.org/) installed.  Once you do, navigate to the Rails back end located at: `./front-end-portfolio-project/back-end` and run the following commands in terminal:
1. `$ rails db: migrate` to run the ActiveRecord migrations.
2. `$ rails db: seed` to seed the database.
3. `$ rails s` to boot up the Rails server.
With the Rails back end API server running, open a browser and navigate it to the following file location:
`front-end-portfolio-project/front-end/index.html` and the front end should automatically populate with data from the server.  The page should look similiar to the drawing below entitled: *Application Features*

## About This App
This app is designed for military & humanitarian logisticians working in an expeditionary environment with airborne-pallets like the ones shown below:
<a href="https://cdn10.picryl.com/photo/2003/03/18/at-charleston-air-force-base-afb-south-carolina-sc-numerous-cargo-pallets-and-a3f710-1600.jpg"><img src="https://cdn10.picryl.com/photo/2003/03/18/at-charleston-air-force-base-afb-south-carolina-sc-numerous-cargo-pallets-and-a3f710-1600.jpg"/></a>
These pallets are actually made up of several sub components that are bundled together under a sort-of net, then the net is clipped on to a base board (pallet) made of wood or aluminum.&nbsp;  These wood or aluminum pallets are then loaded onto aircraft for transport around the world.&nbsp;  NATO military forces use the standard [436L Master Pallet](https://en.wikipedia.org/wiki/463L_master_pallet) as do several other entities.  


<a href="https://i.imgur.com/42TjmBm"><img src="https://i.imgur.com/42TjmBm.jpg" title="source: imgur.com" /></a>


## What Exactly Is This Application Supposed to Accomplish for the User!?
There are several variables in play when considering what pallets go on what aircraft:

 1. How much space is available on the next airplane going to a given destination you want to ship a pallet to?
 2. How much extra weight can an airplane carry to that next destination vs. the weight of a pallet you want to load onto that plane.
 3. Is the aircraft authorized or capable of transporting hazardous materials (HAZMAT) that may be on your pallet?
 4. How important is the pallet you want to ship in terms of its overall priority?  Should you ship a smaller (or lighter) high-priority pallet or a larger (heavier) pallet with lower priority contents?  Which would save more lives or have the greatest cost-benefit reward?
 5. The airfield you're working at has given you one or more locations (i.e. storage areas) to stage your pallets - usually you will put all pallets going to destination **x** in one storage area, and all pallets going to destination **y** in another etc.  Do you have enough space in the storage areas to store all of their respective pallets or do you need to cross-stage pallet storage?

Although this single page application does not attempt to answer most of these questions above, it gives the decision-maker a visual map of pallets on hand for when they do.&nbsp;  Most of these decision makers currently use Microsoft Excel spreadsheets which make visualization of the variables difficult.&nbsp;  Additionally, this app is setup to be expanded down the road into something that could begin to prioritize pallets more thoroughly and start to answer more, if not all, the above questions.

## This is Pure JavaScript by Design
This app was designed for the the [Flatiron School's](https://flatironschool.com) *'Front-End Module'* that requires students to use JavaScript without a library such as React or a framework like Angular or Vue.&nbsp;  This meant having to create complex objects without the use of something like JavaScript XML (JSX) which in turn meant having to declare a ton of *'create'* statements followed by setting various attributes for each Document Object Model (DOM) element.&nbsp;  For this reason, I made up my own system of adding & deleting DOM elements that I'll just call the **builder-method.**&nbsp;  To see how it works, let's look at the code in *./front-end/src/index.js* for generating a single pallet in the DOM:
```javascript
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
      insertPoint.appendChild(palletBuilder1)
}
```
There are a few simple rules being followed here:

 1. The variable names are first declared, then when modified, they are indented so as to align with the declaration on the line above.
 2. There is a space between variables so as to see when one ends and the
   other begins
 3. The variable names end with a number and are ordered consecutively according to their physical location in the DOM.  In example, ```palletBuilder3``` will always be before (and above) ```palletBuilder4``` in terms of where it displays in the page
 4. Within a single function, the DOM elements are first created, and only after the creation of all DOM elements, are the DOM elements arranged into various scopes within the DOM.&nbsp;  These arrangements are always marked with the comment ```// arranging subcomponents``` so the human eye can easily catch where this is happening.&nbsp;  Sometimes the ```// arranging subcomponents``` will occur in different blocks separated by ```palletBuilder``` statements, but these are large enough blocks to catch with the human eye when scrolling through the code.
 5. Only after an element is made by a function, with all of its sub-components properly arranged within, is it added to the DOM.&nbsp;  This last step uses the variable name ```insertPoint```
 6. Event listeners are the last thing to be added to any single DOM element within a function.

Here are the ```palletBuilder``` variables from the code above and the corresponding elements they render:
<a href="https://imgur.com/qQ4WB6Y"><img src="https://i.imgur.com/qQ4WB6Y.jpg" title="source: imgur.com" /></a>
Everything used in the construction of a pallet is a ```palletBuilder``` variable.&nbsp;  The ```palletBuilder``` variables are numbered according to where they occur in the pallet...starting from the top and working down...then working from left to right.&nbsp;  Only after all ```palletBuilder``` variables are properly arranged is the pallet (as a whole) inserted into the DOM using the ```insertPoint``` variable at the bottom of the code snippet above.&nbsp; In order to set all this up, I first render the pallet's plain HTML in a scratch script and once I get the HTML & CSS to look the way I want it, I make something like this:
```html
<div class="pallet-box green-timescale lightweight" data-pallet-id="1"><!--.....(palletBuilder1) -->
   <div class="pallet-name">436L-01</div><!--...................................(palletBuilder2) -->
   <ul class="pallet-contents-displayed-in-pallet-box"><!--.....................(palletBuilder3) -->
      <li>Bottled Water</li><!--................................................(palletBuilder4) -->
      <li>Rice</li><!--.........................................................(palletBuilder5) -->
      <li>Sugar</li><!--........................................................(palletBuilder6) -->
   </ul>
   <button class="delete-pallet">Delete</button><!--............................(palletBuilder7) -->
   <div class="pallet-weight">400</div><!--.....................................(palletBuilder8) -->
   <img class="hazmat-icon" src="src/images/HAZMAT.svg" title="hazmat-icon"><!--(palletBuilder9) -->
</div>
```
Here I've added the ```palletBuilder``` numbering on the right-hand side of the HTML, and once I have this on one of my computer monitors, I can use the other monitor to fill out each ```palletBuilder```variable in the JavaScript file so it has everything it needs to properly render.

Here is a schematic diagram showing the architecture down to the Ruby method / JavaScript function level of detail:
<a href="https://imgur.com/8MgRbQK"><img src="https://i.imgur.com/8MgRbQK.jpg" title="source: imgur.com" /></a>
I've gone ahead and divided the JavaScript into three separate layers within the stack; a ***fetch*** layer for communicating with the Rails API, a ***DOM manipulation*** layer for rendering HTML into the browser, and an ***object models*** layer to act as an intermediary when necessary.&nbsp;Each layer has its own JavaScript file.

## Project File Structure
```
front-end-portfolio-project
├── back-end
│   ├── app
│   │   ├── controllers
│   │   │   ├── pallets_controller.rb
│   │   │   └── storage_areas_controller.rb
│   │   ├── models
│   │   │   ├── pallet.rb
│   │   │   └── storage_area.rb
│   │   └── views
│   └── db
│       ├── migrate
│       │   └── storage_area.rb
│       ├── 20200225220758_create_pallets.rb
│       └── 20200225221159_create_storage_areas.rb
├── front-end
│   ├── src
│   │   ├── images
│   │   ├── fetches.js
│   │   ├── index.js
│   │   └── objects.js
│   ├── index.html  
│   └── styles.css
└── README.md
```
