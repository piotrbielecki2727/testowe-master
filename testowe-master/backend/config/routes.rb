Rails.application.routes.draw do
  resources :users
  resources :certificates
  devise_for :users, defaults: { format: :json }
  get 'certificates/check_certificate/:user_id/:name', to: 'certificates#check_certificate'
end
