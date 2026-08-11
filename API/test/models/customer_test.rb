require "test_helper"

class CustomerTest < ActiveSupport::TestCase
  test "valid fixture" do
    assert customers(:acme_customer).valid?
  end

  test "requires a name" do
    customer = Customer.new(organization: organizations(:acme), name: nil)
    assert_not customer.valid?
    assert_includes customer.errors[:name], "can't be blank"
  end

  test "requires an organization" do
    customer = Customer.new(name: "Orphan Customer")
    assert_not customer.valid?
    assert_includes customer.errors[:organization], "must exist"
  end

  test "has many jobs and colors" do
    acme_customer = customers(:acme_customer)
    assert_includes acme_customer.jobs, jobs(:first_job)
    assert_includes acme_customer.colors, colors(:matte_black)
  end
end
