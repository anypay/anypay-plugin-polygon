# anypay-plugin-polygon

Applications that facilitate communciation of value between their users must ensure all payments are valid, perfect, and confirm as expected every time. That's where Anypay comes in, and one of the most popular wallet developers among users of Anypay reached out with a desire for support of ERC-20 token payments on Polygon, specifically USDC.

For completeness and acceptance as a new blockchain into the Anypay system this module must implement the four essential functions that make up the workflow of a payment:

1. construct a json payment request for USDC transfer on Polygon
2. read the json payment request and construct a valid signed transaction
3. decode the signed transaction and validate it against the original json payment request
4. broadcast the signed transaction to the network and validate it is confirmed

Step 2 constructing the transaction is performed by the wallet and will be implemented by walletbot.dev so that we have a simple reference implementation that anyone can run from node.js or the command line.

## Usage

```
import plugin from 'anypay-plugin-polygon'

const polygon = plugin()

async function main() {

    
    const paymentRequest = await polygon.makePaymentRequest([{
        to: '0xFEb423814D0208e9e2a3F5B0F0171e97376E20Bc'
    }])

}

main()

```

```

import { loadWallet } from 'wallet-bot'

async function main() {

    const wallet = await loadWallet([{
        currency: 'USDC',
        chain: 'Polygon'
    }])

}

main()

```