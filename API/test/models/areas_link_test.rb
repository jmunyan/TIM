require "test_helper"

class AreasLinkTest < ActiveSupport::TestCase
  test "valid fixture" do
    assert areas_links(:main_shop_spec_sheet).valid?
  end

  test "requires an area and a link" do
    areas_link = AreasLink.new
    assert_not areas_link.valid?
    assert_includes areas_link.errors[:area], "must exist"
    assert_includes areas_link.errors[:link], "must exist"
  end

  test "does not allow duplicate area/link pairs" do
    duplicate = AreasLink.new(area: areas(:main_shop), link: links(:spec_sheet))
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:area_id], "has already been taken"
  end
end
