# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_25_221159) do

  create_table "pallets", force: :cascade do |t|
    t.string "name"
    t.string "priority"
    t.string "first_content"
    t.string "second_content"
    t.string "third_content"
    t.integer "weight"
    t.boolean "hazmat"
    t.integer "storage_area_id"
    t.string "weight_category"
    t.string "priority_category"
  end

  create_table "storage_areas", force: :cascade do |t|
    t.string "name"
    t.integer "area"
  end

end
