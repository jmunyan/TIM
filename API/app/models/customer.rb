class Customer < ApplicationRecord
  belongs_to :organization

  has_many :jobs
  has_many :colors

  validates :name, presence: true
end
