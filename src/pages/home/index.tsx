import { Layout, Menu, Breadcrumb, Button } from 'antd'
// import { hot } from 'react-hot-loader/root'
import React, { useState, useEffect, useRef } from 'react'
import styles from './index.less'
import InputArea from '../../components/inputArea/index'
import DialogueArea from '../../components/dialogueArea/index'
import FriendList from '../../components/friendList/index'

const { Header, Footer, Sider, Content } = Layout

const Home = () => {
  const [ref, setRef] = useState(null)
  const diaRef = useRef(null)

  useEffect(() => {
    setRef(diaRef)
  }, [])

  return (
    <Layout className={styles.layoutWrap}>
      <Sider className={styles.sider}>
        <FriendList></FriendList>
      </Sider>
      <Layout className={styles.nav}>
        <div className={styles.content} ref={diaRef}>
          <DialogueArea></DialogueArea>
        </div>
        <div className={styles.footer}>
          <InputArea data={ref}></InputArea>
        </div>
      </Layout>
    </Layout>
  )
}

export default Home
