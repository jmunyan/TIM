class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  private

  def authenticate_user!
    authenticate_or_request_with_http_token do |token, options|
      @current_user = User.find_by(id: token.to_i) # Simple token as user ID for demo; use JWT in production
    end
  end

  def current_user
    @current_user
  end
end
