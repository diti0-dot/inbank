

# Loan Decision Engine

## Overview

This project is a simple loan decision engine that evaluates a user’s eligibility based on personal code, loan amount, and loan period. It returns a decision (approved/rejected) and the maximum approved loan amount.

---

## Features

* Supports 5 user scenarios (debt + 3 segments + invalid)
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


