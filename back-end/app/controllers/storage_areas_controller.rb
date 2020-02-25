class StorageAreasController < ApplicationController
  def index
    storage_area = StorageArea.all
    render json: storage_area
  end

  def show

  end

  def create

  end

  def destroy
    # pokemon = Pokemon.find_by(:id => params[:id])
    # if pokemon.present?
    #     Pokemon.destroy(pokemon.id)
    #     head :no_content
    # end
  end
end
