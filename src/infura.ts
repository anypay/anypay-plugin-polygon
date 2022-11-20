
require('dotenv').config()

const axios = require("axios")


export async function callRPC(method: string, params: any[]) {

  try {

    const { data } = await axios.post(process.env.ROOT_RPC, {
      jsonrpc: '2.0',
      method,
      params,
      id: 1
    }, {
      headers: {
        'content-type': 'application/json'
      }
    })

    return data.result

  } catch(error) {

    console.log('ERROR', error)

    return error.response.data

  }

}
