Rails.application.routes.draw do
  root :to => 'games#home'

  get 'heights' => 'games#heights', as: :heights

  get 'small' => 'games#small', as: :small

  get 'dark' => 'games#dark', as: :dark 

  resources :scores, :only => [:create, :index]

end
