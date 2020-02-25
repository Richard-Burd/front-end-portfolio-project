require 'pry'

class StorageArea < ApplicationRecord
  has_many :pallets

  def total_pallet_weight
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

  def calculate_weight_for_1_pallet # StorageArea.all[0].calculate_weight_for_1_pallet
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
  end

  def duplicate_pallet_weight_values_have_same_weight_category # StorageArea.all[1].duplicate_pallet_weight_values_have_same_weight_category
    total_pallet_order.each_with_index do |element, index |
      if element.weight == total_pallet_order[index-1].weight
        # puts "This one is: #{element.weight}, the previous one is #{total_pallet_order[index-1].weight}"
        element.weight_category = total_pallet_order[index-1].weight_category
      end
    end
  end

  def single_lightest_pallet_set_to_green # StorageArea.all[1].single_lightest_pallet_set_to_green
    if total_pallet_order.first.weight < total_pallet_order.second.weight
      total_pallet_order.first.weight_category = "green"
    end
  end

  def single_heaviest_pallet_set_to_red # StorageArea.all[1].single_heaviest_pallet_set_to_red
    if total_pallet_order.last.weight > total_pallet_order[-2].weight
      total_pallet_order.last.weight_category = "red"
    end
  end

  def calculate_weight_for_3_plus_pallets # StorageArea.all[0].calculate_weight_for_3_plus_pallets
    mean_average = total_pallet_weight / total_pallets # my_var_1

    pallets_below_mean_average = self.pallets.where("weight <= ?", mean_average)
    ordered_pallets_below_mean_average = pallets_below_mean_average.sort_by(&:weight)
    # index_pallet = ordered_pallets_below_mean_average.last #my_var_2 ... this is currently unused and will be deleted

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
    def assign_weight_categories(pallet_set, color_value)
      pallet_set.each do |pallet|
        pallet.weight_category = color_value
      end
    end

    assign_weight_categories(lower_value_amber_pallets, "amber")
    assign_weight_categories(higher_value_amber_pallets, "amber")
    assign_weight_categories(green_pallets, "green")
    assign_weight_categories(red_pallets, "red")
    final_pallet_weight_category_assignment = green_pallets + lower_value_amber_pallets.reverse + higher_value_amber_pallets + red_pallets
  end
end
