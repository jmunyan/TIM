class TaskType < ApplicationRecord
  belongs_to :area

  has_many :tasks

  validates :name, presence: true
end
