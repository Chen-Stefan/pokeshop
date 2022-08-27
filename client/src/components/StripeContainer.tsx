import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'
import pikachu from '../assets/images/pikachu.gif'
import { useLocation } from 'react-router-dom'

const PUBLIC_KEY = 'pk_test_51LXecSFJ9r8e7wM28mDHuBP25R9052bueartU2iTiRtQkFNHIohCTQCLazlsesPURPPiRbmngDSVY2qtPaV9reei00WH1wB7sO'

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
  const location = useLocation()
  const amount = location.state

  return (
    <Elements stripe={stripeTestPromise} >
      <PaymentForm amount={amount}/>
      <div className="d-flex justify-content-center m-3">
      <img src={pikachu} style={{width: '350px', height: '280px'}}/>
      </div>
    </Elements>
  )
}
