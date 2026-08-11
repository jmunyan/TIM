class Color < ApplicationRecord
  belongs_to :customer, optional: true
  belongs_to :job, optional: true

  validates :name, presence: true
end
