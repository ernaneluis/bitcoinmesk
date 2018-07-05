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
      const encrypted = CryptoJS.AES.encrypt(message, password).toString()

      const decryptedMessage = CryptoJS.AES.decrypt(
        encrypted,
        password
      ).toString(CryptoJS.enc.Utf8)
      if (message !== decryptedMessage) reject(new Error('Encryption error'))

      resolve(encrypted)
    } catch (error) {
      reject(error)
    }
  })

const dencrypt = ({ encrypted, password }) =>
  new Promise((resolve, reject) => {
    try {
      resolve(CryptoJS.AES.decrypt(encrypted, password))
    } catch (error) {
      reject(error)
    }
  })

export default { bytesToHex, getRandomInt, encrypt, dencrypt }
