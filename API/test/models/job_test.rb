require "test_helper"

class JobTest < ActiveSupport::TestCase
  test "valid fixture" do
    assert jobs(:first_job).valid?
  end

  test "requires a ticket_no" do
    job = Job.new(customer: customers(:acme_customer), area: areas(:main_shop), ticket_no: nil)
    assert_not job.valid?
    assert_includes job.errors[:ticket_no], "can't be blank"
  end

  test "requires a customer and an area" do
    job = Job.new(ticket_no: 9999)
    assert_not job.valid?
    assert_includes job.errors[:customer], "must exist"
    assert_includes job.errors[:area], "must exist"
  end

  test "has many tasks and colors" do
    first_job = jobs(:first_job)
    assert_includes first_job.tasks, tasks(:first_job_blast)
    assert_includes first_job.colors, colors(:matte_black)
  end
end
