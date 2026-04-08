class ScheduleChannel < ApplicationCable::Channel
  def subscribed
    stream_from "schedule_#{current_user.organization_id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end