import React, { useState, useEffect, Fragment } from 'react'
import { Input, Button } from 'antd'
import styles from './index.less'
import { useStore } from '../../model/index'

const { TextArea } = Input

export default (props) => {
  const [state, actions] = useStore('Dialogue')
  const [value, setValue] = useState('')
  const [ref, setRef] = useState(null)  //获得聊天窗的ref

  useEffect(() => {
    if (props.data) setRef(props.data.current)
  }, [props.data])

  const handleValue = async (e) => {
    e.persist() //解除绑定
    let inputVal = {
      content: e.target.value,
      id: 1
    }
    await actions.sendToDialogueArray(inputVal)
    ref.scrollTop = ref.scrollHeight
    setValue('')
  }

  const handleChange = (e) => {
    e.persist()
    setValue(e.target.value)
  }

  return (
    <Fragment>
      <TextArea
        className={styles.textArea}
        onPressEnter={(val) => handleValue(val)}
        onChange={(e) => handleChange(e)}
        value={value}
      ></TextArea>
    </Fragment>
  )
}
