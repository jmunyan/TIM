require "test_helper"

class TaskTest < ActiveSupport::TestCase
  test "valid fixture" do
    assert tasks(:first_job_blast).valid?
  end

  test "requires a job and a task_type" do
    task = Task.new
    assert_not task.valid?
    assert_includes task.errors[:job], "must exist"
    assert_includes task.errors[:task_type], "must exist"
  end

  test "has many punches" do
    assert_includes tasks(:first_job_blast).punches, punches(:first_job_blast_punch)
  end
end
