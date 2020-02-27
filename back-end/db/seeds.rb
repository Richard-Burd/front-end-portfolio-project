# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

StorageArea.create!(name: "South Park", area: 12000)
StorageArea.create!(name: "North Tarmac", area: 7000)
StorageArea.create!(name: "Clamshell", area: 7000)
StorageArea.create!(name: "East-End", area: 7000)
StorageArea.create!(name: "West-Village", area: 7000)

Pallet.create!(name:"436L-01", priority: "first-priority", first_content: "Bottled Water", second_content: "Rice", third_content: "Sugar", weight: 198, hazmat:false, storage_area_id: 1)
Pallet.create!(name:"436L-02", priority: "second-priority", first_content: "Canola Oil", second_content: "Craked Wheat", third_content: "WD-40", weight: 115, hazmat:true, storage_area_id: 1)
Pallet.create!(name:"436L-03", priority: "fifth-priority", first_content: "Coils", second_content: "Sprok0ets", third_content: "Seeds", weight: 100, hazmat:false, storage_area_id: 1)
Pallet.create!(name:"436L-04", priority: "third-priority", first_content: "Matches", second_content: "Dried Beans", third_content: "Oil", weight: 132, hazmat:true, storage_area_id: 1)
Pallet.create!(name:"436L-05", priority: "first-priority", first_content: "Bottled Water", second_content: "Rice", third_content: "Sugar", weight: 278, hazmat:false, storage_area_id: 1)
Pallet.create!(name:"436L-06", priority: "sixth-priority", first_content: "Canola Oil", second_content: "Craked Whe0at", third_content: "WD-40", weight: 125, hazmat:true, storage_area_id: 1)
Pallet.create!(name:"436L-07", priority: "first-priority", first_content: "Coils", second_content: "Sprokets", third_content: "Seeds", weight: 118, hazmat:false, storage_area_id: 1)
Pallet.create!(name:"436L-08", priority: "third-priority", first_content: "Matches", second_content: "Dried Beans", third_content: "Oil", weight: 153, hazmat:true, storage_area_id: 1)
Pallet.create!(name:"436L-09", priority: "first-priority", first_content: "Bottled Water", second_content: "Rice", third_content: "Sugar", weight: 251, hazmat:false, storage_area_id: 1)
Pallet.create!(name:"436L-10", priority: "second-priority", first_content: "Canola Oil", second_content: "Craked Wheat", third_content: "WD-40", weight: 243, hazmat:true, storage_area_id: 1)
Pallet.create!(name:"436L-11", priority: "first-priority", first_content: "Coils", second_content: "Sprokets", third_content: "Seeds", weight: 118, hazmat:false, storage_area_id: 1)

Pallet.create!(name:"436L-12", priority: "first-priority", first_content: "Coils", second_content: "Sprokets", third_content: "Seeds", weight: 150, hazmat:false, storage_area_id: 2, weight_category: "amber")
Pallet.create!(name:"436L-13", priority: "third-priority", first_content: "Matches", second_content: "Dried Beans", third_content: "Oil", weight: 150, hazmat:true, storage_area_id: 2, weight_category: "green")
Pallet.create!(name:"436L-14", priority: "first-priority", first_content: "Bottled Water", second_content: "Rice", third_content: "Sugar", weight: 150, hazmat:false, storage_area_id: 2, weight_category: "green")
Pallet.create!(name:"436L-15", priority: "second-priority", first_content: "Canola Oil", second_content: "Craked Wheat", third_content: "WD-40", weight: 100, hazmat:true, storage_area_id: 2, weight_category: "green")
Pallet.create!(name:"436L-16", priority: "first-priority", first_content: "Coils", second_content: "Sprokets", third_content: "Seeds", weight: 231, hazmat:false, storage_area_id: 2, weight_category: "amber")
