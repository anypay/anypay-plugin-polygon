
const txid = '0x85672c47a51c8771d6581be67cdee4f096724a252612bbb7b1cba4eeb65674e2'

import { callRPC } from '../src/infura'

const abiDecoder = require('abi-decoder');

const abi = require("../config/base_abi.json")

var txDecoder = require('ethereum-tx-decoder');

interface GetTransactionByHashResult {
  accessList: any[];
  blockHash: string;
  blockNumber: string;
  chainId: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  nonce: string;
  r: string;
  s: string;
  to: string;
  transactionIndex: string;
  type: string;
  v: string;
  value: string;
}

interface SendRawTransactionResult {

}

async function getTransactionByHash(txid: string): Promise<GetTransactionByHashResult> {

  const result: GetTransactionByHashResult = await callRPC('eth_getTransactionByHash', [txid])

  return result

}

export async function sendRawTransaction(txhex: string): Promise<SendRawTransactionResult> {
 
  const result: string = await callRPC('eth_sendRawTransaction', [txhex])

  return result

}

interface USDTransfer {
  to: string;
  amount: number;
  currency: string;
  chain: string;
  txid: string;
}

export async function parseUSDCTransfer(txid: string): Promise<USDTransfer> {

  const result = await getTransactionByHash(txid)

  console.log(result)

  abiDecoder.addABI(abi);

  const decodedData = abiDecoder.decodeMethod(result.input);

  if (decodedData && decodedData.name === 'transfer') {

    const recipient = decodedData.params.filter(i => i.name === 'recipient' && i.type === 'address')[0].value
    const amount = parseInt(decodedData.params.filter(i => i.name === 'amount' && i.type === 'uint256')[0].value)

    if (result.to === '0x2791bca1f2de4661ed88a30c99a7a9449aa84174') {

      return {
        to: recipient,
        amount,
        currency: 'USDC',
        chain: 'Polygon',
        txid: txid
      }

    }

  }

  throw new Error('Not a valid USDC transfer')

}

async function main() {

  const result = await parseUSDCTransfer(txid)

  console.log(result)

  var decodedTx = txDecoder.decodeTx('0xf86b808512a05f200082520894cf1838b517247ebdfd0e6db3c00d386e45bb808d8711c37937e080008026a01c0883e251dd34a0b1864618ac73483f8ece1b619d97525fabd821a111c2a7e9a018342cda6471ac519e9a5034fc65b644afa2a78bcff84c88b48185429376c7e4');


  console.log({ decodedTx })
}

main()
