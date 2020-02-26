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
    storage_area = StorageArea.find_by(:id => params[:id])
    if storage_area.present?
        StorageArea.destroy(pallet.id)
        head :no_content
    end
  end
end
