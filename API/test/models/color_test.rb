require "test_helper"

class ColorTest < ActiveSupport::TestCase
  test "valid fixture" do
    assert colors(:matte_black).valid?
  end

  test "requires a name" do
    color = Color.new(name: nil)
    assert_not color.valid?
    assert_includes color.errors[:name], "can't be blank"
  end

  test "customer and job are optional" do
    color = Color.new(name: "Unassigned Color")
    assert color.valid?
  end
end
