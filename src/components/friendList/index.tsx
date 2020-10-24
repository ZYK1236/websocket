import React, { useState, useEffect } from 'react'
import { List, Avatar } from 'antd'
import styles from './index.less'
import { UserOutlined } from '@ant-design/icons'
import { Input } from 'antd'

const { Search } = Input;
const data = [
  {
    title: '何诗🐑',
    description: '在吗？下课去趟411'
  }
]

export default () => {
  return (
    <div>
      <Search
        placeholder="搜索好友"
        onSearch={(value) => console.log(value)}
        // style={{ marginTop: 10 }}
      />
      <List
        className={styles.friendList}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item tabIndex={1}>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: '#008dff' }}
                  icon={<UserOutlined />}
                />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
