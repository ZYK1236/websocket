import { Model } from 'react-model'

interface dialogue {
  content: string
  id: number
}

interface StateType {
  dialogueArray: Array<dialogue>
}

interface ActionsParamType {
  sendToDialogueArray: dialogue
}

const initialState = {
  dialogueArray: []
}

const model: ModelType<StateType, ActionsParamType> = {
  actions: {
    async sendToDialogueArray(dialogue = { content: '', id: 0 }, { state }) {
      return {
        dialogueArray: state.dialogueArray.concat(dialogue)
      }
    }
  },
  state: initialState
}

export default Model(model)
