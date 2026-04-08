class User < ApplicationRecord
  belongs_to :organization
  belongs_to :area, optional: true

  has_secure_password

  validates :name, presence: true
  validates :username, presence: true, uniqueness: { scope: :organization_id }
  validates :user_level, presence: true, inclusion: { in: %w[admin captain production] }

  def as_json(options = {})
    super(options.merge(except: [:password_digest]))
  end
end