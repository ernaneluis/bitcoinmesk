/*!
* Crypto-JS v2.5.4	Crypto.js
* http://code.google.com/p/crypto-js/
* Copyright (c) 2009-2013, Jeff Mott. All rights reserved.
* http://code.google.com/p/crypto-js/wiki/License
*/
if (typeof Crypto == 'undefined' || !Crypto.util) {
  ;(function() {
    var base64map =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    // Global Crypto object
    var Crypto = (window.Crypto = {})

    // Crypto utilities
    var util = (Crypto.util = {
      // Bit-wise rotate left
      rotl: function(n, b) {
        return (n << b) | (n >>> (32 - b))
      },

      // Bit-wise rotate right
      rotr: function(n, b) {
        return (n << (32 - b)) | (n >>> b)
      },

      // Swap big-endian to little-endian and vice versa
      endian: function(n) {
        // If number given, swap endian
        if (n.constructor == Number) {
          return (
            (util.rotl(n, 8) & 0x00ff00ff) | (util.rotl(n, 24) & 0xff00ff00)
          )
        }

        // Else, assume array and swap all items
        for (var i = 0; i < n.length; i++) n[i] = util.endian(n[i])
        return n
      },

      // Generate an array of any length of random bytes
      randomBytes: function(n) {
        for (var bytes = []; n > 0; n--)
          bytes.push(Math.floor(Math.random() * 256))
        return bytes
      },

      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function(bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
          words[b >>> 5] |= (bytes[i] & 0xff) << (24 - (b % 32))
        return words
      },

      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function(words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8)
          bytes.push((words[b >>> 5] >>> (24 - (b % 32))) & 0xff)
        return bytes
      },

      // Convert a byte array to a hex string
      bytesToHex: function(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16))
          hex.push((bytes[i] & 0xf).toString(16))
        }
        return hex.join('')
      },

      // Convert a hex string to a byte array
      hexToBytes: function(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
          bytes.push(parseInt(hex.substr(c, 2), 16))
        return bytes
      },

      // Convert a byte array to a base-64 string
      bytesToBase64: function(bytes) {
        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
          for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 <= bytes.length * 8)
              base64.push(base64map.charAt((triplet >>> (6 * (3 - j))) & 0x3f))
            else base64.push('=')
          }
        }

        return base64.join('')
      },

      // Convert a base-64 string to a byte array
      base64ToBytes: function(base64) {
        // Remove non-base-64 characters
        base64 = base64.replace(/[^A-Z0-9+\/]/gi, '')

        for (
          var bytes = [], i = 0, imod4 = 0;
          i < base64.length;
          imod4 = ++i % 4
        ) {
          if (imod4 == 0) continue
          bytes.push(
            ((base64map.indexOf(base64.charAt(i - 1)) &
              (Math.pow(2, -2 * imod4 + 8) - 1)) <<
              (imod4 * 2)) |
              (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2))
          )
        }

        return bytes
      },
    })

    // Crypto character encodings
    var charenc = (Crypto.charenc = {})

    // UTF-8 encoding
    var UTF8 = (charenc.UTF8 = {
      // Convert a string to a byte array
      stringToBytes: function(str) {
        return Binary.stringToBytes(unescape(encodeURIComponent(str)))
      },

      // Convert a byte array to a string
      bytesToString: function(bytes) {
        return decodeURIComponent(escape(Binary.bytesToString(bytes)))
      },
    })

    // Binary encoding
    var Binary = (charenc.Binary = {
      // Convert a string to a byte array
      stringToBytes: function(str) {
        for (var bytes = [], i = 0; i < str.length; i++)
          bytes.push(str.charCodeAt(i) & 0xff)
        return bytes
      },

      // Convert a byte array to a string
      bytesToString: function(bytes) {
        for (var str = [], i = 0; i < bytes.length; i++)
          str.push(String.fromCharCode(bytes[i]))
        return str.join('')
      },
    })
  })()
}
/*!
* Crypto-JS v2.5.4	SHA256.js
* http://code.google.com/p/crypto-js/
* Copyright (c) 2009-2013, Jeff Mott. All rights reserved.
* http://code.google.com/p/crypto-js/wiki/License
*/
;(function() {
  // Shortcuts
  var C = Crypto,
    util = C.util,
    charenc = C.charenc,
    UTF8 = charenc.UTF8,
    Binary = charenc.Binary

  // Constants
  var K = [
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2,
  ]

  // Public API
  var SHA256 = (C.SHA256 = function(message, options) {
    var digestbytes = util.wordsToBytes(SHA256._sha256(message))
    return options && options.asBytes
      ? digestbytes
      : options && options.asString
        ? Binary.bytesToString(digestbytes)
        : util.bytesToHex(digestbytes)
  })

  // The core
  SHA256._sha256 = function(message) {
    // Convert to byte array
    if (message.constructor == String) message = UTF8.stringToBytes(message)
    /* else, assume byte array already */

    var m = util.bytesToWords(message),
      l = message.length * 8,
      H = [
        0x6a09e667,
        0xbb67ae85,
        0x3c6ef372,
        0xa54ff53a,
        0x510e527f,
        0x9b05688c,
        0x1f83d9ab,
        0x5be0cd19,
      ],
      w = [],
      a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      t1,
      t2

    // Padding
    m[l >> 5] |= 0x80 << (24 - (l % 32))
    m[(((l + 64) >> 9) << 4) + 15] = l

    for (var i = 0; i < m.length; i += 16) {
      a = H[0]
      b = H[1]
      c = H[2]
      d = H[3]
      e = H[4]
      f = H[5]
      g = H[6]
      h = H[7]

      for (var j = 0; j < 64; j++) {
        if (j < 16) w[j] = m[j + i]
        else {
          var gamma0x = w[j - 15],
            gamma1x = w[j - 2],
            gamma0 =
              ((gamma0x << 25) | (gamma0x >>> 7)) ^
              ((gamma0x << 14) | (gamma0x >>> 18)) ^
              (gamma0x >>> 3),
            gamma1 =
              ((gamma1x << 15) | (gamma1x >>> 17)) ^
              ((gamma1x << 13) | (gamma1x >>> 19)) ^
              (gamma1x >>> 10)

          w[j] = gamma0 + (w[j - 7] >>> 0) + gamma1 + (w[j - 16] >>> 0)
        }

        var ch = (e & f) ^ (~e & g),
          maj = (a & b) ^ (a & c) ^ (b & c),
          sigma0 =
            ((a << 30) | (a >>> 2)) ^
            ((a << 19) | (a >>> 13)) ^
            ((a << 10) | (a >>> 22)),
          sigma1 =
            ((e << 26) | (e >>> 6)) ^
            ((e << 21) | (e >>> 11)) ^
            ((e << 7) | (e >>> 25))

        t1 = (h >>> 0) + sigma1 + ch + K[j] + (w[j] >>> 0)
        t2 = sigma0 + maj

        h = g
        g = f
        f = e
        e = (d + t1) >>> 0
        d = c
        c = b
        b = a
        a = (t1 + t2) >>> 0
      }

      H[0] += a
      H[1] += b
      H[2] += c
      H[3] += d
      H[4] += e
      H[5] += f
      H[6] += g
      H[7] += h
    }

    return H
  }

  // Package private blocksize
  SHA256._blocksize = 16

  SHA256._digestsize = 32
})()
/*!
* Random number generator with ArcFour PRNG
* 
* NOTE: For best results, put code like
* <body onclick='SecureRandom.seedTime();' onkeypress='SecureRandom.seedTime();'>
* in your main HTML document.
* 
* Copyright Tom Wu, bitaddress.org  BSD License.
* http://www-cs-students.stanford.edu/~tjw/jsbn/LICENSE
*/

// Constructor function of Global SecureRandom object
var sr = function() {}
// Properties
sr.state
sr.pool
sr.pptr
sr.poolCopyOnInit

// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
sr.poolSize = 256

// --- object methods ---

// public method
// ba: byte array
sr.prototype.nextBytes = function(ba) {
  var i
  if (window.crypto && window.crypto.getRandomValues && window.Uint8Array) {
    try {
      var rvBytes = new Uint8Array(ba.length)
      window.crypto.getRandomValues(rvBytes)
      for (i = 0; i < ba.length; ++i) ba[i] = sr.getByte() ^ rvBytes[i]
      return
    } catch (e) {
      alert(e)
    }
  }
  for (i = 0; i < ba.length; ++i) ba[i] = sr.getByte()
}

// --- static methods ---

// Mix in the current time (w/milliseconds) into the pool
// NOTE: this method should be called from body click/keypress event handlers to increase entropy
sr.seedTime = function() {
  sr.seedInt(new Date().getTime())
}

sr.getByte = function() {
  if (sr.state == null) {
    sr.seedTime()
    sr.state = sr.ArcFour() // Plug in your RNG constructor here
    sr.state.init(sr.pool)
    sr.poolCopyOnInit = []
    for (sr.pptr = 0; sr.pptr < sr.pool.length; ++sr.pptr)
      sr.poolCopyOnInit[sr.pptr] = sr.pool[sr.pptr]
    sr.pptr = 0
  }
  // TODO: allow reseeding after first request
  return sr.state.next()
}

// Mix in a 32-bit integer into the pool
sr.seedInt = function(x) {
  sr.seedInt8(x)
  sr.seedInt8(x >> 8)
  sr.seedInt8(x >> 16)
  sr.seedInt8(x >> 24)
}

// Mix in a 16-bit integer into the pool
sr.seedInt16 = function(x) {
  sr.seedInt8(x)
  sr.seedInt8(x >> 8)
}

// Mix in a 8-bit integer into the pool
sr.seedInt8 = function(x) {
  sr.pool[sr.pptr++] ^= x & 255
  if (sr.pptr >= sr.poolSize) sr.pptr -= sr.poolSize
}

// Arcfour is a PRNG
sr.ArcFour = function() {
  function Arcfour() {
    this.i = 0
    this.j = 0
    this.S = new Array()
  }

  // Initialize arcfour context from key, an array of ints, each from [0..255]
  function ARC4init(key) {
    var i, j, t
    for (i = 0; i < 256; ++i) this.S[i] = i
    j = 0
    for (i = 0; i < 256; ++i) {
      j = (j + this.S[i] + key[i % key.length]) & 255
      t = this.S[i]
      this.S[i] = this.S[j]
      this.S[j] = t
    }
    this.i = 0
    this.j = 0
  }

  function ARC4next() {
    var t
    this.i = (this.i + 1) & 255
    this.j = (this.j + this.S[this.i]) & 255
    t = this.S[this.i]
    this.S[this.i] = this.S[this.j]
    this.S[this.j] = t
    return this.S[(t + this.S[this.i]) & 255]
  }

  Arcfour.prototype.init = ARC4init
  Arcfour.prototype.next = ARC4next

  return new Arcfour()
}

// Initialize the pool with junk if needed.
if (sr.pool == null) {
  sr.pool = new Array()
  sr.pptr = 0
  var t
  if (window.crypto && window.crypto.getRandomValues && window.Uint8Array) {
    try {
      // Use webcrypto if available
      var ua = new Uint8Array(sr.poolSize)
      window.crypto.getRandomValues(ua)
      for (t = 0; t < sr.poolSize; ++t) sr.pool[sr.pptr++] = ua[t]
    } catch (e) {
      alert(e)
    }
  }
  while (sr.pptr < sr.poolSize) {
    // extract some randomness from Math.random()
    t = Math.floor(65536 * Math.random())
    sr.pool[sr.pptr++] = t >>> 8
    sr.pool[sr.pptr++] = t & 255
  }
  sr.pptr = Math.floor(sr.poolSize * Math.random())
  sr.seedTime()
  // entropy
  var entropyStr = ''
  // screen size and color depth: ~4.8 to ~5.4 bits
  entropyStr +=
    window.screen.height * window.screen.width * window.screen.colorDepth
  entropyStr +=
    window.screen.availHeight *
    window.screen.availWidth *
    window.screen.pixelDepth
  // time zone offset: ~4 bits
  var dateObj = new Date()
  var timeZoneOffset = dateObj.getTimezoneOffset()
  entropyStr += timeZoneOffset
  // user agent: ~8.3 to ~11.6 bits
  entropyStr += navigator.userAgent
  // browser plugin details: ~16.2 to ~21.8 bits
  var pluginsStr = ''
  for (var i = 0; i < navigator.plugins.length; i++) {
    pluginsStr +=
      navigator.plugins[i].name +
      ' ' +
      navigator.plugins[i].filename +
      ' ' +
      navigator.plugins[i].description +
      ' ' +
      navigator.plugins[i].version +
      ', '
  }
  var mimeTypesStr = ''
  for (var i = 0; i < navigator.mimeTypes.length; i++) {
    mimeTypesStr +=
      navigator.mimeTypes[i].description +
      ' ' +
      navigator.mimeTypes[i].type +
      ' ' +
      navigator.mimeTypes[i].suffixes +
      ', '
  }
  entropyStr += pluginsStr + mimeTypesStr
  // cookies and storage: 1 bit
  entropyStr +=
    navigator.cookieEnabled + typeof sessionStorage + typeof localStorage
  // language: ~7 bit
  entropyStr += navigator.language
  // history: ~2 bit
  entropyStr += window.history.length
  // location
  entropyStr += window.location

  var entropyBytes = Crypto.SHA256(entropyStr, { asBytes: true })
  for (var i = 0; i < entropyBytes.length; i++) {
    sr.seedInt8(entropyBytes[i])
  }
}

export { sr as SecureRandom }
