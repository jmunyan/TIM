class SessionsController < ApplicationController
  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      token = user.id.to_s # Simple token; use JWT in production
      render json: { token: token, user: user.as_json }, status: :created
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  def destroy
    # For simple token, just return success; in production, invalidate token
    render json: { success: true }, status: :ok
  end
end