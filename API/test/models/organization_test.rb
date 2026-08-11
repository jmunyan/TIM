require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  test "valid fixture" do
    assert organizations(:acme).valid?
  end

  test "requires a name" do
    organization = Organization.new(name: nil)
    assert_not organization.valid?
    assert_includes organization.errors[:name], "can't be blank"
  end

  test "has many areas, users, and customers" do
    acme = organizations(:acme)
    assert_includes acme.areas, areas(:main_shop)
    assert_includes acme.users, users(:alice)
    assert_includes acme.customers, customers(:acme_customer)
  end
end
