Rails.application.routes.draw do
  match '/loan/decision', to: 'loan#decision', via: [:post, :options]

   root "loan#decision"
end
