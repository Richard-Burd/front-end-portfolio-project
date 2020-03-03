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

  def total_pallet_order
    self.pallets.sort_by(&:weight)
  end

  # do division & round to the closest integer
  def round_div(x,y)
    (x + y / 2) / y
  end

  def calculate_weight_for_1_pallet
    self.pallets.each do |pallet|
      pallet.weight_category = "lightweight"
      pallet.save
    end
  end

  def calculate_weight_for_2_pallets
    total_pallet_order.first.weight_category = "lightweight"
    total_pallet_order.second.weight_category = "middleweight"
    total_pallet_order.each{|pallet| pallet.save}
  end

  def calculate_weight_for_3_pallets
    total_pallet_order.first.weight_category = "lightweight"
    total_pallet_order.second.weight_category = "middleweight"
    total_pallet_order.last.weight_category = "heavyweight"
    total_pallet_order.each{|pallet| pallet.save}
  end

  def calculate_weight_for_3_plus_pallets
    mean_average = total_pallet_weight / total_pallets

    pallets_below_mean_average = self.pallets.where("weight <= ?", mean_average)

    one_third_of_pallets = round_div(total_pallets, 3)
    half_of_that_one_third = round_div(one_third_of_pallets, 2)

    lower_value_amber_pallets = self.pallets.order(weight: :desc).where("weight <= ?", mean_average).limit(half_of_that_one_third)
    higher_value_amber_pallets = self.pallets.order(weight: :asc).where("weight >= ?", mean_average).limit(half_of_that_one_third)
    green_pallets = self.pallets.where("weight < ?", lower_value_amber_pallets.last.weight).sort_by(&:weight)
    red_pallets = self.pallets.where("weight > ?", higher_value_amber_pallets.last.weight).sort_by(&:weight)
    super_heavy_pallet = self.pallets.where

    def assign_weight_categories(pallet_set, color_value)
      pallet_set.each do |pallet|
        pallet.weight_category = color_value
        pallet.save
      end
    end

    assign_weight_categories(lower_value_amber_pallets, "middleweight")
    assign_weight_categories(higher_value_amber_pallets, "middleweight")
    assign_weight_categories(green_pallets, "lightweight")
    assign_weight_categories(red_pallets, "heavyweight")
  end

  def duplicate_pallet_weight_values_have_same_weight_category # StorageArea.all[1].duplicate_pallet_weight_values_have_same_weight_category
    total_pallet_order.each_with_index do |element, index |
      if element.weight == total_pallet_order[index-1].weight && element !=  total_pallet_order.first # because then you'd loop back to the last pallet in the array
        # puts "This one is: #{element.weight}, the previous one is #{total_pallet_order[index-1].weight}"
        element.weight_category = total_pallet_order[index-1].weight_category
        element.save
      elsif total_pallet_order.first.weight_category == "lightweight" && total_pallet_order.first.weight == total_pallet_order.second.weight
        total_pallet_order.second.weight_category = "lightweight"
        total_pallet_order.second.save
      end
    end
  end

  def single_heaviest_pallet_set_to_red
    if total_pallet_order.last.weight > total_pallet_order[-2].weight
      total_pallet_order.last.weight_category = "heavyweight"
      total_pallet_order.last.save
    end
  end
end
