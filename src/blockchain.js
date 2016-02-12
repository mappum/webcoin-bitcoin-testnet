// blockchain definition

var bitcoin = require('webcoin-bitcoin').blockchain
var u = require('bitcoin-util')

var genesisHeader = {
  version: 1,
  prevHash: u.nullHash,
  merkleRoot: u.toHash('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b'),
  timestamp: 1296688602,
  bits: 0x1d00ffff,
  nonce: 414098458
}

var minDiffStart = 1329264000

function shouldRetarget (block, cb) {
  var onInterval = block.height % this.interval === 0
  var afterTimeoutStart = block.header.timestamp >= minDiffStart
  return cb(null, onInterval || afterTimeoutStart)
}

function calculateTarget (block, chain, cb) {
  if (block.height % this.interval === 0) {
    return bitcoin.calculateTarget.call(this, block, chain, cb)
  }
  chain.getBlock(block.header.prevHash, (err, prev) => {
    if (err) return cb(err)
    var timeDelta = block.header.timestamp - prev.header.timestamp
    if (timeDelta > this.targetSpacing * 2) {
      return cb(null, chain.maxTarget())
    }

    var traverse = (err, prev) => {
      if (err) return cb(err)
      var onInterval = prev.height % this.interval === 0
      if (onInterval || prev.header.bits !== this.genesisHeader.bits) {
        return cb(null, u.expandTarget(prev.header.bits))
      }
      chain.getBlock(prev.header.prevHash, traverse)
    }
    traverse(null, prev)
  })
}

// inherit from bitcoin mainnet params
module.exports = Object.assign({}, bitcoin, {
  genesisHeader,
  checkpoints: null,

  shouldRetarget,
  calculateTarget
})
