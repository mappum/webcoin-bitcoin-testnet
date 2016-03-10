var magic = 0x0709110b
var defaultPort = 18333

var dnsSeeds = [
  'testnet-seed.bitcoin.petertodd.org',
  'testnet-seed.bluematt.me',
  'testnet-seed.bitcoin.schildbach.de'
]
var webSeeds = [
  'us-west.seed.webcoin.io:8193',
  'us-east.seed.webcoin.io:8193',
  'eu.seed.webcoin.io:8193',
  'asia.seed.webcoin.io:8193'
  // TODO: add more
]

module.exports = {
  magic,
  defaultPort,
  dnsSeeds,
  webSeeds
}
