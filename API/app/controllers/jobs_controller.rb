class JobsController < ApplicationController
  before_action :authenticate_user!

  def index
    jobs = Job.includes(:customer, :area).where(organization_id: current_user.organization_id)
    # Filter by status or area if params provided
    jobs = jobs.where(area_id: params[:area_id]) if params[:area_id]
    jobs = jobs.where(completed_on: nil) if params[:status] == 'active' # Example filter

    render json: {
      jobs: jobs.map do |job|
        {
          id: job.id,
          ticket_no: job.ticket_no,
          customer_name: job.customer.name,
          location: job.area.name, # Map to section like 'Upcoming', 'Blast', etc.
          notes: job.notes || '',
          color: job.color&.name || 'Default',
          description: job.description || '',
          created_at: job.created_at,
          area_id: job.area_id,
          status: job.completed_on.present? ? 'completed' : 'active'
        }
      end
    }
  end

  # Example: broadcast on job update (add this to update action when implemented)
  def broadcast_update(job)
    ActionCable.server.broadcast("schedule_#{job.organization_id}", {
      type: 'job_updated',
      job: job.as_json(include: [:customer, :area])
    })
  end
end