require "test_helper"

class TaskTypeTest < ActiveSupport::TestCase
  test "valid fixture" do
    assert task_types(:blast).valid?
  end

  test "requires a name" do
    task_type = TaskType.new(area: areas(:main_shop), name: nil)
    assert_not task_type.valid?
    assert_includes task_type.errors[:name], "can't be blank"
  end

  test "requires an area" do
    task_type = TaskType.new(name: "Orphan Task Type")
    assert_not task_type.valid?
    assert_includes task_type.errors[:area], "must exist"
  end

  test "has many tasks" do
    assert_includes task_types(:blast).tasks, tasks(:first_job_blast)
  end
end
