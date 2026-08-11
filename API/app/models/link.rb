class Link < ApplicationRecord
  has_many :areas_links
  has_many :areas, through: :areas_links

  validates :name, presence: true
end
