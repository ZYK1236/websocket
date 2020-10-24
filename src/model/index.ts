import { Model } from 'react-model'
import Example from './store/example'
import Dialogue from './store/dialogue'
import Verify from './store/verify'

const models = { Example, Dialogue, Verify }

export const {
  getInitialState,
  useStore,
  getState,
  actions,
  subscribe,
  unsubscribe
} = Model(models)

// window.getState = getState
