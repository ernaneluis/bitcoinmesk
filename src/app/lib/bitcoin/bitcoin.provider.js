import * as insight from './providers/insight'

export const getProvider = ({ provider = 'insight' }) => {
  if (provider === 'insight') return insight
}

export default { getProvider }
