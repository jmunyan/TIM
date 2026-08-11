require "test_helper"

class PunchTest < ActiveSupport::TestCase
  test "valid fixture" do
    assert punches(:first_job_blast_punch).valid?
  end

  test "requires a time" do
    punch = Punch.new(task: tasks(:first_job_blast), user: users(:alice), time: nil)
    assert_not punch.valid?
    assert_includes punch.errors[:time], "can't be blank"
  end

  test "requires a task and a user" do
    punch = Punch.new(time: Time.current)
    assert_not punch.valid?
    assert_includes punch.errors[:task], "must exist"
    assert_includes punch.errors[:user], "must exist"
  end
end
