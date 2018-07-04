import * as crypto from './crypto'
import utils from './bitcoin.utils'

class Seeder {
  // number of mouse movements to wait for between 100 and 200 mouse moves
  constructor(seedLimit) {
    this.seedLimit = seedLimit || utils.getRandomInt(100, 200)
    this.seedCount = 0
    this.lastInputTime = 0
    this.seed = 0

    this.updateSeedWithEntropy(this.seedLimit)
  }

  updateSeedWithEntropy = entropy => {
    crypto.SecureRandom.seedTime()
    // add more entropy to the pool
    crypto.SecureRandom.seedInt16(entropy)
    this.seed = utils.bytesToHex(crypto.SecureRandom.pool)
  }

  addEntropyToSeed = (entropy, timeStamp) => {
    this.seedCount++
    this.lastInputTime = timeStamp
    console.log(`${this.seedCount} of ${this.seedLimit}`)
    this.updateSeedWithEntropy(entropy)
  }

  isSeedingDone = () => {
    return this.seedCount === this.seedLimit
  }
}

export default Seeder
