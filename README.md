# Front-end Portfolio Project
This is a portfolio project submittal for Module 14 of the Full-Stack Web Development program at Flatiron School.  This project is a Single Page Application (SPA) that uses a Rails API back-end and a Javascript + HTML + CSS front-end per assignment specifications.

This app is designed for military & humanitarian logisticians working in an expeditionary environment with airborne-pallets like the ones shown below:
<a href="https://cdn10.picryl.com/photo/2003/03/18/at-charleston-air-force-base-afb-south-carolina-sc-numerous-cargo-pallets-and-a3f710-1600.jpg"><img src="https://cdn10.picryl.com/photo/2003/03/18/at-charleston-air-force-base-afb-south-carolina-sc-numerous-cargo-pallets-and-a3f710-1600.jpg"/></a>
These pallets are actually made up of several sub components that are bundled together under a sort-of net, then the net is clipped on to a base board (pallet) made of wood or aluminum.  These wood or aluminum pallets are then loaded onto aircraft for transport around the world.  NATO military forces use the standard [436L Master Pallet](https://en.wikipedia.org/wiki/463L_master_pallet) as do several other entities.  


<a href="https://i.imgur.com/42TjmBm"><img src="https://i.imgur.com/42TjmBm.jpg" title="source: imgur.com" /></a>
<br><br><br>
### What Exactly Is This Application Supposed to Accomplish for the User!?
There are several variables in play when considering what pallets go on what aircraft:

 1. How much space is available on the next airplane going to a given destination you want to ship a pallet to?
 2. How much extra weight can an airplane carry to that next destination vs. the weight of a pallet you want to load onto that plane?
 3. Is the aircraft authorized or capable of transporting hazardous materials (HAZMAT) that may be on your pallet?
 4. How important is the pallet you want to ship in terms of its overall priority?
 5. Should you ship a smaller (or lighter) high-priority pallet or a larger (heavier) pallet with lower priority contents?  Which would save more lives or have the greatest cost-benefit reward?
 6. The airfield you're working at has given you one or more locations to stage your pallets (storage areas) - usually you will put all pallets going to destination **x** in one storage area, and all pallets going to destination **y** in another etc.  Do you have enough space in the storage areas to store all of their respective pallets or do you need to offset pallet storage?

Although this single page application does not attempt to answer most of those questions, it gives the decision-maker a visual map of pallets on hand for when they do.  Most of these decision makers currently use Microsoft Excel spreadsheets which make visualization of the variables difficult.  Additionally, this app is setup to be expanded down the road into something that could begin to prioritize pallets more thoroughly and start to answer some of the questions above.


<br><br>
### Project File Structure
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
│   │   └── index.js
│   ├── index.html  
│   └── styles.css
└── README.md
