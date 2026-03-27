class LoanController < ApplicationController

def decision
  result = LoanDecisionService.new(
    personal_code: params[:personalCode],
    loan_amount: params[:loanAmount],
    loan_period: params[:loanPeriod]
  ).call

  render json: result
end

end
