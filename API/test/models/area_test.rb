require "test_helper"

class AreaTest < ActiveSupport::TestCase
  test "valid fixture" do
    assert areas(:main_shop).valid?
  end

  test "requires a name" do
    area = Area.new(organization: organizations(:acme), name: nil)
    assert_not area.valid?
    assert_includes area.errors[:name], "can't be blank"
  end

  test "requires an organization" do
    area = Area.new(name: "Orphan Shop")
    assert_not area.valid?
    assert_includes area.errors[:organization], "must exist"
  end

  test "has many task_types and jobs" do
    main_shop = areas(:main_shop)
    assert_includes main_shop.task_types, task_types(:blast)
    assert_includes main_shop.jobs, jobs(:first_job)
  end

  test "has many links through areas_links" do
    assert_includes areas(:main_shop).links, links(:spec_sheet)
    assert_includes areas(:main_shop).links, links(:safety_data)
  end
end
