class LoanController < ApplicationController
  skip_before_action :verify_authenticity_token

  def decision
    service = LoanDecisionService.new(
      personal_code: params[:personal_code],
      loan_amount: params[:loan_amount].to_i,
      loan_period: params[:loan_period].to_i
    )
    
    result = service.call  
    
    render json: result   
  end
end