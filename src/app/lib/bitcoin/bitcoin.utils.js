import CryptoJS from 'crypto-js'

// Convert a byte array to a hex string
const bytesToHex = bytes => {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16))
    hex.push((bytes[i] & 0xf).toString(16))
  }
  return hex.join('')
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const encrypt = ({ message, password }) =>
  new Promise((resolve, reject) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(message, password)
      const decrypted = CryptoJS.AES.decrypt(encrypted, password)
      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8)
      if (message !== decryptedString) reject(new Error('Encryption error'))

      resolve(encrypted.toString())
    } catch (error) {
      reject(error)
    }
  })

const dencrypt = ({ message, password }) =>
  new Promise((resolve, reject) => {
    try {
      const decrypted = CryptoJS.AES.decrypt(message, password)
      resolve(decrypted.toString(CryptoJS.enc.Utf8))
    } catch (error) {
      reject(error)
    }
  })

// Bitcoin minimum unit is "Satoshi". 1 satoshi = 1 / 10^8 BTC
const satoshiToBitcoin = satoshi => satoshi / Math.pow(10, 8)
const bitcoinToSatoshi = bitcoin => bitcoin * Math.pow(10, 8)

const hash = input => CryptoJS.SHA256(input).toString()

export default {
  bytesToHex,
  getRandomInt,
  encrypt,
  dencrypt,
  hash,
  satoshiToBitcoin,
  bitcoinToSatoshi,
}
