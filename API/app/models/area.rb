class Area < ApplicationRecord
  belongs_to :organization

  has_many :task_types
  has_many :jobs
  has_many :users
  has_many :areas_links
  has_many :links, through: :areas_links

  validates :name, presence: true
end
