import React, { useState, useEffect, Fragment } from 'react'
import { Skeleton, Switch, Card, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from './index.less'
import { useStore } from '../../model/index'

const { Meta } = Card
export default () => {
  const [state, actions] = useStore('Dialogue')

  const setCard = (content: string, id: number) => {
    if (id === 0)
      return (
        <Card
          style={{ width: '30%', marginTop: 16 }}
          className={styles.cardLeft}
        >
          <Meta
            avatar={
              <Avatar
                style={{ backgroundColor: '#008dff' }}
                icon={<UserOutlined />}
              />
            }
            title="Card title"
            description={content}
          />
        </Card>
      )
    else
      return (
        <Card
          style={{ width: '30%', marginTop: 16 }}
          className={styles.cardRight}
        >
          <Meta
            avatar={
              <Avatar
                style={{ backgroundColor: '#008dff' }}
                icon={<UserOutlined />}
              />
            }
            title="Card title"
            description={content}
          />
        </Card>
      )
  }

  return (
    <Fragment>
      <div className={styles.cardWarp}>
        {state.dialogueArray.map((ele) => setCard(ele.content, ele.id))}
      </div>
    </Fragment>
  )
}
