Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Mount Action Cable for WebSockets
  mount ActionCable.server => '/cable'

  namespace :api do
    post 'sessions', to: 'sessions#create'
    delete 'session', to: 'sessions#destroy'
    get 'jobs', to: 'jobs#index'
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
