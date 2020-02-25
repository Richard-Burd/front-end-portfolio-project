class PalletsController < ApplicationController
  def index
    pallets = Pallet.all
    render json: pallets
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
