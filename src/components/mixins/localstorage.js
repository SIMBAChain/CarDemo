import SecureLS from 'secure-ls'

export const localstorage = {
  methods: {
    setWallet (content) {
      let ls = new SecureLS({
        encodingType: 'aes',
        isCompression: true
      })
      ls.set('keystore', {data: content})
    },
    getWallet () {
      let ls = new SecureLS({
        encodingType: 'aes',
        isCompression: true
      })
      return ls.get('keystore').data
    },
    setAddress (address) {
      let ls = new SecureLS()
      ls.set('walletAddress', {data: address})
    },
    getAddress () {
      let ls = new SecureLS()
      return ls.get('walletAddress').data
    },
    clean () {
      let ls = new SecureLS({})
      ls.removeAll()
    }
  }
}
