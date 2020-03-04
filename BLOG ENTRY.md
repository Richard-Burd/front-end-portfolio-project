# Organizing DOM Manipulation

One of the most frustrating aspects of this module (14) in the Flatiron curriculum was the total lack of any framework around Document Object Model (DOM) manipulation.&nbsp;  The adding & removing of DOM elements seemed to exist in a vacuum with no rhyme or reason to it.&nbsp;  This is either how things are done in the real world, or I assume there is some framework that solves this problem which I have not yet encountered.  Either way, I came up with my own system of adding & deleting DOM elements that I'll just call the **builder-method.**  and used it on my front-end portfolio project [here](https://github.com/Richard-Burd/front-end-portfolio-project).  
<br><br><br>
In my protfolio project, I have a DOM element called "pallet," let's look at the code for generating a single pallet in the DOM from this file [here](https://github.com/Richard-Burd/front-end-portfolio-project/blob/master/front-end/src/index.js):
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
This code looks quite cumbersome & odd, but there are just a few simple rules being followed here:

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
Here I've added the ```palletBuilder``` numbering on the right-hand side of the HTML, and once I have this on one of my computer monitors, I can use the other monitor to fill out each ```palletBuilder```variable in the Javascript file so it has everything it needs to properly render.

Because I am new to Javascript DOM manipulation, I don't know if there is a convention that is used to do something similiar to my newfound "*builder-method*" or if there is some sort of framework that can organize these elements in a way that makes writing Javascript easier.&nbsp;  When I study different labs in Module 14 of the Flatiron Curriculum, I find Javascript files that seem to have no organization.  In example, we can compare my early solution to the Flatiron solution in the Dog Fetch CEO Challenge lab below:
<a href="https://imgur.com/Gp7XTqb"><img src="https://i.imgur.com/Gp7XTqb.jpg" title="source: imgur.com" /></a>
You can see here that fetching functions are interspersed with functions that build DOM elements.  There is no correlation to where the DOM elements occur in the code vs. where they occur in the rendered browser.  Additionally, the elements that *are* created have no class or id properties assigned to them, and this will make functionality expansion difficult down the road.&nbsp;  To be sure, this is a practice lab not meant for production, but adding additional properties will make the code more difficult to read&nbsp;  Compare that to the ```palletBuilder``` variables above, and how they are arranged&nbsp;  You could tack on an extra 20 properties to say, for example, ```palletBuilder9``` and you would have code just as readable.

Now let's check out the illustration for the Front-End Portfolio Project below:
///////////////////////////////////// THIS ILLUSTRATION IS UNDER CONSTRUCTION ////////////////////////////////////////
