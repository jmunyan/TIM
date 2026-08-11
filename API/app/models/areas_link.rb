class AreasLink < ApplicationRecord
  belongs_to :area
  belongs_to :link

  validates :area_id, uniqueness: { scope: :link_id }
end
