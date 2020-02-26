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
      # storage_area_id: params[:java_script_storage_area_id], # This code will be introduced after a name & weight are successfully transfered from front-end to back-end
      weight: params[:java_script_weight]
    }
    Pallet.create(palletData) # this will be removed when the code below is ready to be introduced


#################LEFT OFF HERE########################
# so this is fundementally wrong; the storage area actually needs to be updated in the
# storage area update action, not here.  Javascript needs to update when it creates this new pallet


    # # All pallets in the storage area will need to be re-colored when a new pallet is introduced
    # # The following code will be run once I can get a new pallet to be simply created with a new name & weight
    # pallet = Pallet.create(palletData)
    # if pallet.storage_area.pallets.count = 1
    #   pallet.storage_area.calculate_weight_for_1_pallet
    # elsif pallet.storage_area.pallets.count = 2
    #   pallet.storage_area.calculate_weight_for_2_pallets
    #   pallet.storage_area.duplicate_pallet_weight_values_have_same_weight_category
    # elsif pallet.storage_area.pallets.count = 3
    #   pallet.storage_area.calculate_weight_for_3_pallets
    #   pallet.storage_area.duplicate_pallet_weight_values_have_same_weight_category
    # else
    #   pallet.storage_area.calculate_weight_for_3_plus_pallets
    #   pallet.storage_area.duplicate_pallet_weight_values_have_same_weight_category
    #   pallet.storage_area.single_lightest_pallet_set_to_green
    #   pallet.storage_area.single_heaviest_pallet_set_to_red
    # end

    # NOTE: some code need to specifically update the storage area so that it's changes are sent to the database
    # pallet.storage_area.save
  end

  def destroy
    pallet = Pallet.find_by(:id => params[:id])
    if pallet.present?
        Pallet.destroy(pallet.id)
        head :no_content
    end
  end
end
