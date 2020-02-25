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

  def destroy
    storage_area = StorageArea.find_by(:id => params[:id])
    if storage_area.present?
        StorageArea.destroy(pallet.id)
        head :no_content
    end
  end
end
