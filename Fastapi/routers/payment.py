from pydantic import BaseModel
from fastapi import APIRouter
import stripe


router=APIRouter(tags=['payment'])

stripe.api_key="sk_test_51Q3LtGFCMz513c02ftft1CjFgXFQSX7J6ODmQaFiaF1ONwekekH347dt6v4floF5qwq00IVe0KSMpL6L7JR3glZs002ZVxUWvE"

class PaymentIntentRequest(BaseModel):
    amount: int

@router.post("/create-payment-intent")
async def create_payment_intent(request: PaymentIntentRequest):
    try:
        intent = stripe.PaymentIntent.create(
            amount=request.amount * 100,
            currency='inr',
        )
        return {"clientSecret": intent["client_secret"]}
    except Exception as e:
        return {"error": str(e)}