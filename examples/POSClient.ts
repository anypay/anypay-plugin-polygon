require("dotenv").config()

import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

import { rpc } from './config'

// install web3 plugin
use(Web3ClientPlugin);

const privateKey = process.env.USER1_PRIVATE_KEY

console.log({ privateKey })

async function main() {

  try {

    const posClient = new POSClient();
    await posClient.init({
        network: 'mainnet',
        version: 'v1',
        parent: {
          provider: new HDWalletProvider({
            privateKeys: [privateKey],
            /*mnemonic: {
              phrase: process.env.MNEMONIC
            },
            */
            providerOrUrl: rpc.child
          }),
          defaultConfig: {
            from : '0xA77547a3fB82a5Fa4DB408144870B69c70906989'
          }
        },
        child: {
          provider: new HDWalletProvider({
            privateKeys: [privateKey],
            /*mnemonic: {
              phrase: process.env.MNEMONIC
            },
            */
            providerOrUrl: rpc.child
          }),
          defaultConfig: {
            from : '0xA77547a3fB82a5Fa4DB408144870B69c70906989'
          }
        }
    });


    const erc20 = posClient.erc20('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174');

    console.log({ erc20 })

    const balance = await erc20.getBalance('0xA77547a3fB82a5Fa4DB408144870B69c70906989')

    console.log({ balance })

    const result = await erc20.transfer(21.8, '0xA77547a3fB82a5Fa4DB408144870B69c70906989');

    const txHash = await result.getTransactionHash();

    console.log({ txHash })

    const txReceipt = await result.getReceipt();

    console.log({ txReceipt })
  
  } catch(error) {

    console.error('error', error)

  }

}

if (require.main === module) {

  main()

}

