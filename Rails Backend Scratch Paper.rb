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

  def total_pallet_order # StorageArea.all[0].total_pallet_order
    self.pallets.sort_by(&:weight)
  end

  # do division & round to the closest integer
  def round_div(x,y)
    (x + y / 2) / y
  end

  def calculate_weight_for_1_pallet
    self.pallets.each do |pallet|
      pallet.weight_category = "green"
    end
  end

  def calculate_weight_for_2_pallets
    total_pallet_order.first.weight_category = "green"
    total_pallet_order.first.weight_category = "amber"
  end

  def calculate_weight_for_3_pallets # StorageArea.all[0].calculate_weight_for_3_pallets
    total_pallet_order.first.weight_category = "green"
    total_pallet_order.second.weight_category = "amber"
    total_pallet_order.last.weight_category = "red"
    #binding.pry
  end

  def check_for_pallets_with_same_weight_values # StorageArea.all[0].check_for_pallets_with_same_weight_values

######### LEFT OFF HERE
#### with this google search: rails activerecord find duplicate records


    #total_pallet_order.select(:weight).group(:weight).having("count(*) > 1")
    binding.pry
  end

  def calculate_weight_for_3_plus_pallets # StorageArea.all[0].calculate_weight_for_3_plus_pallets
    mean_average = total_pallet_weight / total_pallets # my_var_1

    pallets_below_mean_average = self.pallets.where("weight <= ?", mean_average)
    ordered_pallets_below_mean_average = pallets_below_mean_average.sort_by(&:weight)
    # index_pallet = ordered_pallets_below_mean_average.last #my_var_2 ... currently unused

    # One-third of all pallets should be Amber, but that one-third will be offset to the mean average
    one_third_of_pallets = round_div(total_pallets, 3) # my_var_3
    half_of_that_one_third = round_div(one_third_of_pallets, 2) # my_var_4

    lower_value_amber_pallets = self.pallets.order(weight: :desc).where("weight <= ?", mean_average).limit(half_of_that_one_third) # my_var_5
    higher_value_amber_pallets = self.pallets.order(weight: :asc).where("weight >= ?", mean_average).limit(half_of_that_one_third) # my_var_6
    green_pallets = self.pallets.where("weight < ?", lower_value_amber_pallets.last.weight).sort_by(&:weight) # my_var_7
    red_pallets = self.pallets.where("weight > ?", higher_value_amber_pallets.last.weight).sort_by(&:weight) # my_var_8

    lightest_pallet = total_pallet_order = self.pallets.sort_by(&:weight).first # my_var_9
    heaviest_pallet = total_pallet_order = self.pallets.sort_by(&:weight).last # my_var_10
    higher_value_amber_pallets.last # my_var_11
    lower_value_amber_pallets.last # my_var_12

    # Methods to assign amber values

    # Method to assign red values

    # Method to assign green values

    # Method that checks all pallet weights and  assigns all pallets the same color that have the same exact weight



    #binding.pry
  end
end
