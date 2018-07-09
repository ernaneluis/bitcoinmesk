import { Address, Networks } from 'bitcore-lib'
import { getProvider } from './bitcoin.provider'

export const getAddress = ({ address, provider = 'insight' }) =>
  getProvider(provider).getAddress({ address })

export const getBalance = ({ address, provider = 'insight' }) =>
  getProvider(provider).getBalance({ address })

export const getUtxo = ({ address, provider = 'insight' }) =>
  getProvider(provider).getUtxo({ address })

export default { getAddress, getUtxo, getBalance }
