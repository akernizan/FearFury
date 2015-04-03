Rails.application.routes.draw do
  root :to => 'games#home'

  get 'heights' => 'games#heights', as: :heights

  get 'small' => 'games#small', as: :small

  get 'dark' => 'games#dark', as: :dark 
<<<<<<< HEAD

  resources :scores, :only => [:create, :index]

=======
>>>>>>> 7d93489ba4c2d89a57c881942da1dd13a44ce82a
end
