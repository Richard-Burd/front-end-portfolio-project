class Pallet < ApplicationRecord
  belongs_to :storage_area

  # Unlike the pallet weight categories, the pallet priority categories are not
  # calculated relative to all of the other pallets in the same storage area.
  # Therefore, the weight category [calculation] methods are located in the
  # StorageArea object model instead of in this Pallet object model.
  def assign_priority_category
    if self.priority == "Low impact" || self.priority == "Least concearn"
      self.priority_category = "green"
    elsif self.priority == "Sustainment" || self.priority == "Medium"
      self.priority_category = "amber"
    else
      self.priority_category = "red"
    end
    self.save
  end
end
