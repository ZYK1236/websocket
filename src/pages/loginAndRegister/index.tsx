import React, { useState, useEffect, useRef, Fragment } from 'react'
import styles from './index.less'
import { Modal, Input, Button, Divider, Popover, message } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  AlipayOutlined,
  WechatOutlined,
  CommentOutlined,
  RollbackOutlined,
  MessageOutlined,
  MailOutlined
} from '@ant-design/icons'
import alipay from '../../assets/img/alipay.jpg'
import wechatPay from '../../assets/img/wechatPay.jpg'
import { useHistory } from 'react-router-dom'
import utilsDebounce from '../../utils/debounce'
import { apiRegister, apiSendEmail, apiLogin } from '../../service/api/index'
import RegisterVerify from '../../components/registerVerify/index'
import { useStore, getState } from '../../model/index'

const reg = /(\d\D)|(\D\d)/

const Map = {
  0: 0,
  1: 1,
  2: 2,
  3: 10,
  4: 11,
  5: 12,
  6: 20,
  7: 21,
  8: 22
}

const aliPayContent = (
  <div>
    <img src={alipay} alt="阿里" className={styles.alipayImg} />
  </div>
)
const wechatPayContent = (
  <div>
    <img src={wechatPay} alt="微信" className={styles.alipayImg} />
  </div>
)

export default () => {
  const history = useHistory()
  const [isLogin, setIsLogin] = useState(true)
  const [userMessage, setUserMessage] = useState({
    userId: '',
    userEmail: '',
    userPwd: '',
    confirmPwd: '',
    nickname: ''
  })
  const [scriptVerify, setScriptVerify] = useState(false)
  const [emailVerify, setEmailVerify] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [tiggerToSave, setTiggerToSave] = useState(false)
  const [loading, setLoading] = useState(false)
  const [state, actions] = useStore('Verify')

  useEffect(() => {
    if (!isLogin) {
      utilsDebounce.debounce(infoMessage, 300)
      return () => {
        utilsDebounce.clearTime()
      }
    }
  }, [userMessage.confirmPwd, userMessage.userPwd])

  const registerText = () => {
    // console.log(emailVerify)
    if (isLogin) return '注册'
    if (!isLogin && !scriptVerify) return '进行人机验证'
    if (!isLogin && scriptVerify && !emailVerify) return '发送邮箱验证码'
    else return '完成注册'
  }

  const tapToRegister = async () => {
    setIsLogin(false)
    if (
      !isLogin &&
      userMessage.userEmail &&
      userMessage.nickname &&
      userMessage.userPwd &&
      userMessage.confirmPwd === userMessage.userPwd &&
      userMessage.userPwd.length >= 6 &&
      reg.test(userMessage.userPwd)
    ) {
      // 过了人机验证，发送邮箱验证
      if (scriptVerify && !emailVerify) {
        const { code } = await apiSendEmail(userMessage.userEmail)
        if (code === 200) message.success('已发送验证码')
        else message.error('出了一点小错误...(请验证网络状态或者邮箱格式')

        // 过了人机和邮箱验证，提交注册信息
      } else if (scriptVerify && emailVerify) {
        const submitData = {
          email: userMessage.userEmail,
          nickname: userMessage.nickname,
          password: userMessage.userPwd,
          validCode: emailVerify
        }
        const {
          code,
          data: { id }
        } = await apiRegister(submitData)
        if (code === 200) {
          message.success('注册成功')
          setUserMessage({
            ...userMessage,
            userPwd: ''
          })
          history.push(`/note/${id}`)
        } else message.error('验证🐎出错啦...')
      } else {
        // 人机验证 触发modal组件内的useEffect
        setTiggerToSave(false)
        setModalVisible(true)
      }
    } else {
      message.warning('请正确填写注册信息')
      // 触发modal组件内的useEffect
      setTiggerToSave(false)
    }
  }

  const handleLogin = async () => {
    let loginData = {
      userId: userMessage.userId,
      password: userMessage.userPwd
    }
    const { code } = await apiLogin(loginData)
    if (code === 200) history.push('/home')
    else message.error('密码或账户输入错误，请重试')
  }

  const modalHandleOk = () => {
    // modal 按钮 loading
    setLoading(true)
    // 触发modal组件内的useEffect
    setTiggerToSave(true)

    setTimeout(() => {
      setLoading(false)
      setModalVisible(false)
      let bus = getState('Verify').busArr
      let choose = getState('Verify').choosedArr

      // 查看人机验证点击图片是否正确
      if (bus.length !== choose.length) {
        message.error('人机验证失败，请重试')
        return false
      }
      for (let i = 0; i < 3; i++) {
        if (bus.indexOf(Map[choose[i]]) === -1) {
          message.error('人机验证失败，请重试')
          setScriptVerify(false)
          return false
        }
      }
      message.success('人机验证成功')
      setScriptVerify(true)
      return true
    }, 1000)
  }

  const modalHandleCancel = () => {
    setModalVisible(false)
  }

  const infoMessage = () => {
    if (userMessage.confirmPwd !== userMessage.userPwd)
      message.warning('两次输入密码不一致')
    else if (userMessage.confirmPwd) message.success('两次输入密码一致')
  }

  const setLoginOrRegister = () => {
    if (isLogin)
      return (
        <Button
          type="primary"
          className={styles.loginBtn}
          onClick={handleLogin}
        >
          登陆
        </Button>
      )
    else
      return (
        <Fragment>
          <Input
            placeholder="确认密码"
            type="password"
            prefix={<LockOutlined />}
            className={styles.passwordInput}
            value={userMessage.confirmPwd}
            onChange={(e) =>
              setUserMessage({
                ...userMessage,
                confirmPwd: e.target.value
              })
            }
          />
          <Input
            placeholder="昵称"
            prefix={<UserOutlined />}
            className={styles.passwordInput}
            value={userMessage.nickname}
            onChange={(e) =>
              setUserMessage({
                ...userMessage,
                nickname: e.target.value
              })
            }
          />
          {scriptVerify ? (
            <Input
              placeholder="邮箱验证码"
              prefix={<MessageOutlined />}
              className={styles.passwordInput}
              value={emailVerify}
              onChange={(val) => setEmailVerify(val.target.value)}
            />
          ) : (
            <span></span>
          )}
        </Fragment>
      )
  }

  return (
    <div className={styles.loginWrap}>
      <span className={styles.title}>427 聊天室</span>
      <span className={styles.description}>有🐎你就来</span>
      <div className={styles.loginBox}>
        <div className={styles.inputBox}>
          <Input
            placeholder={isLogin ? '用户ID' : '邮箱'}
            prefix={isLogin ? <UserOutlined /> : <MailOutlined />}
            className={styles.userInput}
            value={isLogin ? userMessage.userId : userMessage.userEmail}
            onChange={
              isLogin
                ? (e) => {
                    setUserMessage({
                      ...userMessage,
                      userId: e.target.value
                    })
                  }
                : (e) => {
                    setUserMessage({
                      ...userMessage,
                      userEmail: e.target.value
                    })
                  }
            }
          />
          <Input
            placeholder={isLogin ? '密码' : '密码(字母+数字，至少6位)'}
            type="password"
            prefix={<LockOutlined />}
            className={styles.passwordInput}
            value={userMessage.userPwd}
            onChange={(e) =>
              setUserMessage({
                ...userMessage,
                userPwd: e.target.value
              })
            }
          />
          {setLoginOrRegister()}
          <div className={styles.registerWarp}>
            <Button
              type="ghost"
              className={isLogin ? styles.registerBtn : styles.backRegisterBtn}
              onClick={tapToRegister}
            >
              {registerText()}
            </Button>
            {!isLogin ? (
              <Button
                type="ghost"
                icon={<RollbackOutlined />}
                size="small"
                className={styles.backToBtn}
                onClick={() => {
                  setUserMessage({
                    ...userMessage,
                    userPwd: ''
                  })
                  setIsLogin(true)
                }}
              />
            ) : (
              <></>
            )}
          </div>
          <span className={styles.note}>
            登陆/注册即代表同意《427聊天室协议》《隐私保护指引》
          </span>
          <Divider></Divider>
          <Popover content={aliPayContent} title="请我吃三鲜米线">
            <AlipayOutlined
              style={{
                color: '#0084ff',
                fontSize: '25px',
                marginRight: '10px',
                cursor: 'pointer'
              }}
            />
          </Popover>
          <Popover content={wechatPayContent} title="请我吃三鲜米线">
            <WechatOutlined
              style={{ color: '#00d500', fontSize: '25px', cursor: 'pointer' }}
            ></WechatOutlined>
          </Popover>
          <span className={styles.reward}>👈赞助我一下下</span>
        </div>
      </div>

      <Modal
        title="验证: 选中图中含有公交车的图片"
        visible={modalVisible}
        onOk={modalHandleOk}
        onCancel={modalHandleCancel}
        confirmLoading={loading}
      >
        {modalVisible ? (
          <RegisterVerify
            tiggerToSave={tiggerToSave}
            // tiggerToChange={changeFlag}
          ></RegisterVerify>
        ) : (
          <span></span>
        )}
      </Modal>
    </div>
  )
}
