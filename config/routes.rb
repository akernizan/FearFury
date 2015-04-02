Rails.application.routes.draw do
  root :to => 'games#home'

  get 'heights' => 'games#heights'

  get 'small' => 'games#small'

  get 'dark' => 'games#dark'

  get 'spiders' => 'games#spiders'
end
