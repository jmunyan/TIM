require "test_helper"

class LinkTest < ActiveSupport::TestCase
  test "valid fixture" do
    assert links(:spec_sheet).valid?
  end

  test "requires a name" do
    link = Link.new(name: nil)
    assert_not link.valid?
    assert_includes link.errors[:name], "can't be blank"
  end

  test "has many areas through areas_links" do
    assert_includes links(:spec_sheet).areas, areas(:main_shop)
  end
end
