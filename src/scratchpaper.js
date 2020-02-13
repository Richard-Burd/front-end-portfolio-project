let palletbuilder1 = document.createElement('div')
    palletbuilder1.setAttribute('class', 'pallet-box red-timescale lightweight')
    palletbuilder1.setAttribute('data-pallet-id', 'X')

let palletbuilder2 = document.createElement('div')
    palletbuilder2.setAttribute('class', 'pallet-name')
    palletbuilder2.innerText = "JavPallet"

let palletbuilder3 = document.createElement('ul')
    palletbuilder3.setAttribute('class', 'pallet-contents-displayed-in-pallet-box')

let palletbuilder4 = document.createElement('li')
    palletbuilder4.innerText = "1st Item X"

let palletbuilder5 = document.createElement('li')
    palletbuilder5.innerText = "2nd Item X"

let palletbuilder6 = document.createElement('li')
    palletbuilder6.innerText = "3rd Item X"

let palletbuilder7 = document.createElement('button')
    palletbuilder7.setAttribute('class', 'delete-pallet')
    palletbuilder7.innerText = "Delete"

let palletbuilder8 = document.createElement('div')
    palletbuilder8.setAttribute('class', 'pallet-weight')
    palletbuilder8.innerText = "X,XXX"

let palletbuilder9 = document.createElement('img')
    palletbuilder9.setAttribute('class', 'hazmat-icon')
    palletbuilder9.setAttribute('src', 'HAZMAT.svg')
    palletbuilder9.setAttribute('title', 'hazmat-icon')

    // first the inner scope gets built
    palletbuilder3.appendChild(palletbuilder4)
    palletbuilder3.appendChild(palletbuilder5)
    palletbuilder3.appendChild(palletbuilder6)

    // then the outer scope gets built
    palletbuilder1.appendChild(palletbuilder2)
    palletbuilder1.appendChild(palletbuilder3)
    palletbuilder1.appendChild(palletbuilder7)
    palletbuilder1.appendChild(palletbuilder8)
    palletbuilder1.appendChild(palletbuilder9)

    let insertPoint = document.querySelector("div.pallets")
        insertPoint.appendChild(palletbuilder1)
