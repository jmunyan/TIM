class Organization < ApplicationRecord
  has_many :areas
  has_many :users
  has_many :customers

  validates :name, presence: true
end
