#NOTE: this is a backend script I've been working on in my private "rails sandbox" where I am testing out the functionality and seeing if this works.

require 'pry'

class StorageArea < ApplicationRecord
  has_many :pallets

  def total_pallet_weight
    puts "Triaging Pallets"
    total_weight = []
    self.pallets.each do |pallet|
      total_weight << pallet.weight
    end
    total_weight.sum
  end

  def total_pallets
    self.pallets.count
  end

  # do division & round to the closest integer
  def round_div(x,y)
    (x + y / 2) / y
  end

  def calculate_weight_for_3_plus_pallets # StorageArea.all[0].calculate_weight_for_3_plus_pallets
    total_pallet_order = self.pallets.sort_by(&:weight) # my_var_0
    mean_average = total_pallet_weight / total_pallets # my_var_1

    pallets_below_mean_average = self.pallets.where("weight <= ?", mean_average)
    ordered_pallets_below_mean_average = pallets_below_mean_average.sort_by(&:weight)
    index_pallet = ordered_pallets_below_mean_average.last #my_var_2

    one_third_of_pallets = round_div(total_pallets, 3) # my_var_3
    half_of_that_one_third = round_div(one_third_of_pallets, 2) # my_var_4

    lower_value_amber_pallets = self.pallets.order(weight: :desc).where("weight <= ?", mean_average).limit(half_of_that_one_third) # my_var_5
    higher_value_amber_pallets = self.pallets.order(weight: :asc).where("weight >= ?", mean_average).limit(half_of_that_one_third) # my_var_6
    green_pallets = self.pallets.where("weight < ?", lower_value_amber_pallets.last.weight) # my_var_7
    red_pallets = self.pallets.where("weight > ?", higher_value_amber_pallets.last.weight) # my_var_8

    # LEFT OFF HERE: We need two methods that ensure the first & last pallets are always green & red respectively regardless of other calcs.
    # my_var_9 = the lightest pallet
    # my_var_10 = the heaviest pallet

    # Now make the iterations that assign "weight_category" to each group of pallets

    binding.pry
  end
end
