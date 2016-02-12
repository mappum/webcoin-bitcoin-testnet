var bitcoin = require('webcoin-bitcoin').net

var magic = 0x0709110b
var defaultPort = 18333
var protocolVersion = 70002

var dnsSeeds = [
  'testnet-seed.bitcoin.petertodd.org',
  'testnet-seed.bluematt.me',
  'testnet-seed.bitcoin.schildbach.de'
]

Object.assign(exports, bitcoin, {
  magic,
  defaultPort,
  protocolVersion,
  dnsSeeds
})
