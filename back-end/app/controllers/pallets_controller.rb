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
      weight: params[:java_script_weight],
      priority: params[:java_script_priority],
      first_content: params[:java_script_first_content],
      second_content: params[:java_script_second_content],
      third_content: params[:java_script_third_content],
      hazmat: params[:java_script_hazmat],
      storage_area_id: params[:java_script_storage_area_id]
    }
    pallet = Pallet.new(palletData)
    pallet.assign_priority_category
    pallet.save
  end

  def destroy
    pallet = Pallet.find_by(:id => params[:id])
    if pallet.present?
        Pallet.destroy(pallet.id)
        head :no_content
    end
  end
end
