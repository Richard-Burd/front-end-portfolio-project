# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

StorageArea.create!(name: "Chișinău Intl. Bound", area: 1200)
StorageArea.create!(name: "Tiraspol Airport", area: 2000)
StorageArea.create!(name: "Lymanske Field", area: 1000)
StorageArea.create!(name: "South Tarmac", area: 1000)
StorageArea.create!(name: "Cold-Storage Facility", area: 200)

Pallet.create!(name:"436L-01", priority: "Low impact", first_content: "Bottled Water", second_content: "Rice", third_content: "Sugar", weight: 400, hazmat:false, storage_area_id: 1, weight_category: "lightweight", priority_category: "green")
Pallet.create!(name:"436L-02", priority: "Sustainment", first_content: "Canola Oil", second_content: "Bulgur Wheat", third_content: "Alfuzosin (Uroxatral)", weight: 810, hazmat:false, storage_area_id: 1, weight_category: "middleweight", priority_category: "amber")
Pallet.create!(name:"436L-03", priority: "Urgent care", first_content: "Penacilin", second_content: "Isopropyl Alcohol", third_content: "Fosfomycin", weight: 1200, hazmat:true, storage_area_id: 1, weight_category: "heavyweight", priority_category: "red")

Pallet.create!(name:"436L-04", priority: "Urgent care", first_content: "Nitrofurantoin", second_content: "Enfamil", third_content: "Durum Wheat", weight: 295, hazmat:false, storage_area_id: 2, weight_category: "lightweight", priority_category: "red")
Pallet.create!(name:"436L-05", priority: "Sustainment", first_content: "Gardasil-9 Vaccine", second_content: "Aestivum", third_content: "Canola Oil", weight: 740, hazmat:false, storage_area_id: 2, weight_category: "middleweight", priority_category: "amber")
Pallet.create!(name:"436L-06", priority: "Life Saving", first_content: "Water Purification Tablets", second_content: "Aestivum", third_content: "Sugar", weight: 320, hazmat:false, storage_area_id: 2, weight_category: "lightweight", priority_category: "red" )
Pallet.create!(name:"436L-07", priority: "Sustainment", first_content: "Powdered Milk", second_content: "Seed (Maze)", third_content: "", weight: 425, hazmat:false, storage_area_id: 2, weight_category: "lightweight", priority_category: "amber")
Pallet.create!(name:"436L-08", priority: "Low impact", first_content: "Provelactics", second_content: "Rice", third_content: "Enfamil", weight: 1000, hazmat:false, storage_area_id: 2, weight_category: "heavyweight", priority_category: "green")
Pallet.create!(name:"436L-09", priority: "Life Saving", first_content: "First Aid Kits", second_content: "Heimlich valves", third_content: "Chest Seals", weight: 460, hazmat:false, storage_area_id: 2, weight_category: "middleweight", priority_category: "red")
Pallet.create!(name:"436L-10", priority: "Medium", first_content: "Canned-Legumes", second_content: "Poultry Feed", third_content: "Bottled Water", weight: 750, hazmat:false, storage_area_id: 2, weight_category: "middleweight", priority_category: "amber")
Pallet.create!(name:"436L-11", priority: "Low impact", first_content: "Kerosene", second_content: "Fertilizer", third_content: "Olive-Oil", weight: 453, hazmat:true, storage_area_id: 2, weight_category: "lightweight", priority_category: "green")
Pallet.create!(name:"436L-12", priority: "Urgent care", first_content: "Tamsulosin (Flomax)", second_content: "Bottled Water", third_content: "", weight: 860, hazmat:false, storage_area_id: 2, weight_category: "heavyweight", priority_category: "red")
Pallet.create!(name:"436L-13", priority: "Low impact", first_content: "Clothing (Kids)", second_content: "Hand Sanitizer", third_content: "", weight: 1600, hazmat:false, storage_area_id: 2, weight_category: "heavyweight", priority_category: "green")
Pallet.create!(name:"436L-14", priority: "Least concearn", first_content: "Salt", second_content: "Sugar", third_content: "Hand Soap", weight: 390, hazmat:false, storage_area_id: 2, weight_category: "lightweight", priority_category: "green")
Pallet.create!(name:"436L-15", priority: "Medium", first_content: "MMR+DTaP Vaccine", second_content: "Bottled Water", third_content: "Isopropyl Alcohol", weight: 700, hazmat:true, storage_area_id: 2, weight_category: "middleweight", priority_category: "amber")

Pallet.create!(name:"436L-16", priority: "Life Saving", first_content: "Water Purification Tablets", second_content: "Silodosin (Rapaflo)", third_content: "Durum Wheat", weight: 250, hazmat:false, storage_area_id: 4, weight_category: "lightweight", priority_category: "red")
Pallet.create!(name:"436L-17", priority: "Medium", first_content: "Bottled Water", second_content: "Sugar", third_content: "Salt", weight: 370, hazmat:false, storage_area_id: 4, weight_category: "lightweight", priority_category: "amber")
Pallet.create!(name:"436L-18", priority: "Low impact", first_content: "Sugar", second_content: "Doxazosin (Cardura)", third_content: "", weight: 450, hazmat:false, storage_area_id: 4, weight_category: "middleweight", priority_category: "green")
Pallet.create!(name:"436L-19", priority: "Medium", first_content: "Olive-Oil", second_content: "Rice", third_content: "Isopropyl Alcohol", weight: 590, hazmat:true, storage_area_id: 4, weight_category: "middleweight", priority_category: "amber")
Pallet.create!(name:"436L-20", priority: "Urgent care", first_content: "Bottled Water", second_content: "Tea", third_content: "Powdered Milk", weight: 860, hazmat:false, storage_area_id: 4, weight_category: "heavyweight", priority_category: "red")

Pallet.create!(name:"436L-21", priority: "Urgent care", first_content: "Blood (O-)", second_content: "Adalimumab", third_content: "Amoxicillin", weight: 230, hazmat:true, storage_area_id: 5, weight_category: "lightweight", priority_category: "red")
Pallet.create!(name:"436L-22", priority: "Urgent care", first_content: "Epogen", second_content: "Rapamune", third_content: "Aranesp", weight: 320, hazmat:false, storage_area_id: 5, weight_category: "middleweight", priority_category: "red")
