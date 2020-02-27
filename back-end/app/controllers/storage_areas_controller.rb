require 'pry'

class StorageAreasController < ApplicationController
  def index
    storage_areas = StorageArea.all
    render json: storage_areas
  end

  def show
    storage_area = StorageArea.find_by(id: params[:id])
    render json: storage_area
  end

  def create
    storageAreaData = {
      name: params[:java_script_name],
      area: params[:java_script_area]
    }
    StorageArea.create(storageAreaData)
  end

  def update
    storage_area = StorageArea.find_by(id: params[:id])

    if storage_area.pallets.count == 1
      storage_area.calculate_weight_for_1_pallet
    elsif storage_area.pallets.count == 2
      storage_area.calculate_weight_for_2_pallets
      storage_area.duplicate_pallet_weight_values_have_same_weight_category
    elsif storage_area.pallets.count == 3
      storage_area.calculate_weight_for_3_pallets
      storage_area.single_heaviest_pallet_set_to_red
      storage_area.duplicate_pallet_weight_values_have_same_weight_category
    else
      storage_area.calculate_weight_for_3_plus_pallets
    end
    storage_area.assign_pallet_priority_categories
  end

  def destroy
    storage_area = StorageArea.find_by(:id => params[:id])
    if storage_area.present?
        StorageArea.destroy(storage_area.id)
        head :no_content
    end
  end
end
