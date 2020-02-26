require 'pry'

class PalletsController < ApplicationController
  def index
    pallets = Pallet.all
    render json: pallets
  end

  def show
    pallet = Pallet.find_by(id: params[:id])
    render json: pallet
  end

  def create
    palletData = {
      name: params[:java_script_name],
      weight: params[:java_script_weight]
    }
    Pallet.create(palletData)
  end

  def destroy
    pallet = Pallet.find_by(:id => params[:id])
    if pallet.present?
        Pallet.destroy(pallet.id)
        head :no_content
    end
  end
end
