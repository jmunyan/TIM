class Punch < ApplicationRecord
  belongs_to :task
  belongs_to :user

  validates :time, presence: true
end
