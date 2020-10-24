import { Result, Button } from 'antd'
import React, { useState, useEffect } from 'react'
import { useLocation, useHistory, useParams } from 'react-router-dom'

interface paramsType {
  id: number
}

export default () => {
  // const location = useLocation()
  const history = useHistory()
  let params = useParams() as any

  const [title, setTitle] = useState(
    '恭喜你成功注册，加入427 有🐎你就来的聊天室！你的个人id是' + params.id
  )
  return (
    <Result
      status="success"
      title={title}
      subTitle="个人id是您在聊天室的个人凭证，请妥当保管，聊天请遵守427聊天室协议，文明对话"
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => {
            history.push('/login')
          }}
        >
          我知道了
        </Button>
      ]}
    />
  )
}
