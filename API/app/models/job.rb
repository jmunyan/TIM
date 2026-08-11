class Job < ApplicationRecord
  belongs_to :customer
  belongs_to :area

  has_many :tasks
  has_many :colors

  validates :ticket_no, presence: true
end
