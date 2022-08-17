import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from './PaymentForm'
import pikachu from '../assets/images/pikachu.gif'

const PUBLIC_KEY = 'pk_test_51LXecSFJ9r8e7wM28mDHuBP25R9052bueartU2iTiRtQkFNHIohCTQCLazlsesPURPPiRbmngDSVY2qtPaV9reei00WH1wB7sO'

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise} >
      <PaymentForm />
      <div className="d-flex justify-content-center m-5">
      <img src={pikachu} className='' style={{width: '350px', height: '280px'}}/>
      </div>
    </Elements>
  )
}
