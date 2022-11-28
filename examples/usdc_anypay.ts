
require('dotenv').config()

import anypay from 'anypay'

async function main() {

  const paymentRequest = await anypay.request([{
    currency: 'USDC',
    to: [{
      address: '0xA77547a3fB82a5Fa4DB408144870B69c70906989',
      amount: 0.052,
      currency: 'USD'
    }]
  }], {
    webhook_url: 'https://13ed-188-241-82-14.eu.ngrok.io/webhooks'
  })

  console.log('PaymentRequestCreated', paymentRequest)

  // TODO: Paul & Steven figure out how to send Polygon USD with typescript

}

main()
