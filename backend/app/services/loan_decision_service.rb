class LoanDecisionService

  def initialize(personal_code:, loan_amount:, loan_period:)
    @personal_code = personal_code
    @loan_amount = loan_amount
    @loan_period = loan_period
  end

  def call
  find_best_offer
  end

  # debt check
  def reject_if_debt
    @personal_code == "49002010965"
  end

  def credit_modifier
    case @personal_code
    when "49002010976" then 100
    when "49002010987" then 300
    when "49002010998" then 1000
    else nil
    end
  end

  def calculate_score(amount, period)
    (credit_modifier.to_f / amount) * period
  end

  # Main method
  def find_best_offer
    return { decision: false, amount: 0, period: @loan_period } if reject_if_debt

    modifier = credit_modifier
    return { error: "invalid personal code" } if modifier.nil?

    amount = @loan_amount
    period = @loan_period
    score = calculate_score(amount, period)

    if score >= 1
      while amount + 100 <= 10000 && calculate_score(amount + 100, period) >= 1
        amount += 100
      end
    else
      original_amount = amount
     # Try decreasing amount first
      decreased = false
while amount - 100 >= 2000
  amount -= 100
  if calculate_score(amount, period) >= 1
    decreased = true
    break
  end
end
# If decreasing amount didn’t work, try increasing period
  if !decreased && calculate_score(amount, period) < 1
    amount = original_amount 
    while calculate_score(amount, period) < 1 && period + 1 <= 60
      period += 1
    end
  end
      end

    decision = calculate_score(amount, period) >= 1
    { decision: decision, amount: amount, period: period }
  end
end