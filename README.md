# front-end-portfolio-project
This is my portfolio project for Module 14 of the Full-Stack Web Development program at Flatiron School.  This project is currently under construction.

This will be a small app to help air transport logisticians manage air pallets in an expeditionary environment...kinda like what you see here:
<a href="https://cdn10.picryl.com/photo/2003/03/18/at-charleston-air-force-base-afb-south-carolina-sc-numerous-cargo-pallets-and-a3f710-1600.jpg"><img src="https://cdn10.picryl.com/photo/2003/03/18/at-charleston-air-force-base-afb-south-carolina-sc-numerous-cargo-pallets-and-a3f710-1600.jpg"/></a>

Here is an early sketch of what the thing will look like:
<a href="https://imgur.com/y9pY91u"><img src="https://i.imgur.com/y9pY91u.png" title="source: imgur.com" /></a>

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
