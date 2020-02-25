class CreateStorageAreas < ActiveRecord::Migration[6.0]
  def change
    create_table :storage_areas do |t|
      t.string :name
      t.integer :area
    end
  end
end
