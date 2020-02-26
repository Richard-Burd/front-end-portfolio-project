class CreatePallets < ActiveRecord::Migration[6.0]
  def change
    create_table :pallets do |t|
      t.string :name
      t.string :priority
      t.string :first_content
      t.string :second_content
      t.string :third_content
      t.integer :weight
      t.boolean :hazmat
      t.integer :storage_area_id
      t.string :weight_category
      t.string :priority_category
    end
  end
end
