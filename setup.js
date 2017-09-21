var fs = require('fs')
var solc = require('solc')
var Eth = require('ethjs')
var EthereumTx = require('ethereumjs-tx')

var eth = new Eth(new Eth.HttpProvider('http://localhost:8545'))

const privKey = new Buffer('8718b9618a37d1fc78c436511fc6df3c8258d3250635bba617f33003270ec03e', 'hex')
var address = '0xA7A467EDCb16a51976418eC6133F14F7939dC378'

var bytecode = '0x60606040523415600e57600080fd5b7f977a9dd82cbb4d3af742332a501a1a4625b007d21957ef84dedd5357146e009960016040518082815260200191505060405180910390a17f977a9dd82cbb4d3af742332a501a1a4625b007d21957ef84dedd5357146e009960026040518082815260200191505060405180910390a17f977a9dd82cbb4d3af742332a501a1a4625b007d21957ef84dedd5357146e009960036040518082815260200191505060405180910390a160358060c36000396000f3006060604052600080fd00a165627a7a72305820eef9a4736d9100cc105c3d4f3b5e58e815bf06db339f498d05d99c22c3b0a9360029'


async function deploy() {
  const nonceBn = await eth.getTransactionCount(address)
  let nonceHex = nonceBn.toString(16)
  if (nonceHex.length % 2 !== 0) {
    nonceHex = `0${nonceHex}`
  }
  const nonce = `0x${nonceBn.toString(16)}`

  const txParams = {
    nonce,
    gasPrice: '0x1000',
    gasLimit: '0x100710',
    value: '0',
    data: bytecode,
  }
  console.dir(txParams)

  const tx = new EthereumTx(txParams)
  tx.sign(privKey)
  const serializedTx = tx.serialize()

  console.log('publishing...')
  let txHash
  try {
    txHash = await eth.sendRawTransaction('0x' + serializedTx.toString('hex'))
  } catch (e) {
    console.log('problem publishing!')
    console.trace(e)
  }

  let txReceipt
  while (!txReceipt) {

    await new Promise((res) => {
      setTimeout(res, 300)
    }).then(() => {})
    console.log('checking for receipt of ' + txHash)
    txReceipt = await eth.getTransactionByHash(txHash)
  }
  console.log('got that receipt!')

  console.log('CONTRACT DEPLOYED: ' + JSON.stringify(txReceipt))
}

try {
  deploy()
} catch (e) {
  console.trace('problem happend')
  console.error(e)
}
