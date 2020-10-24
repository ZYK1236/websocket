// import { busArr } from './../../components/registerVerify/data'
import { Model } from 'react-model'

interface StateType {
  busArr: Array<number>
  choosedArr: Array<number>
}

interface ActionsParamType {
  saveBusAndChoosed: any
}

const initialState = {
  busArr: [],
  choosedArr: []
}

const model: ModelType<StateType, ActionsParamType> = {
  actions: {
    async saveBusAndChoosed(busAndChoosed) {
      return {
        busArr: busAndChoosed.busArr,
        choosedArr: busAndChoosed.choosedArr,
      }
    }
  },
  state: initialState
}

export default Model(model)
