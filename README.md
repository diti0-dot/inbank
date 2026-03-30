

# Loan Decision Engine

## Overview

This project is a simple loan decision engine that evaluates a user’s eligibility based on personal code, loan amount, and loan period. It returns a decision (approved/rejected) and the maximum approved loan amount.


## Decision Logic Highlights

- ![Maximize](https://img.shields.io/badge/Maximize%20Approved%20Amount-green)
  If the requested loan is approvable, the system searches for the maximum loan amount that can be approved and returns that value.

- ![Fallback](https://img.shields.io/badge/Fallback%20to%20Lower%20Amount-yellow)
  If the requested amount is not approvable, the system searches for the highest possible lower amount that can be approved within the constraints.

- ![Adjust](https://img.shields.io/badge/Adjust%20Loan%20Period-yellow)
  If no suitable amount is found for the given period, the system attempts to adjust the loan period to find a valid solution.
  
---

## Features

* Supports 4 user scenarios (debt + 3 segments)
* Adjusts loan amount and period to find the best possible offer
* Returns maximum approved sum regardless of requested amount

---

## Scoring Logic

```id="yqyk6d"
credit_score = (credit_modifier / loan_amount) * loan_period
```

* Score ≥ 1 → approved
* Score < 1 → rejected

---

## Tech Stack

* Backend: Ruby on Rails
* Frontend: React

---

## API

**POST /loan/decision**

Request:

```json id="g6u5r6"
{
  "personal_code": "49002010976",
  "loan_amount": 5000,
  "loan_period": 24
}
```

Response:

```json id="o4xtmx"
{
  "decision": "positive",
  "approved_amount": 2400,
  "loan_period": 24
}
```

#Improvement
What is one thing you would improve about the take home assignment and how would you improve it?
- The scoring system could be improved by including more realistic factors such as income or credit history instead of fixed modifiers.

