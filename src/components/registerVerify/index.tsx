import React, { useState, useEffect } from 'react'
import { Image } from 'antd'
import styles from './index.less'
import { totalArr, BusArr } from './data'
import * as _ from 'lodash'
import { CheckCircleFilled } from '@ant-design/icons'
import { useStore } from '../../model/index'

let choosedCurrent = []
for (let i = 0; i < 9; i++) {
  choosedCurrent.push(false)
}

export default (props) => {
  let tempTotalArr = _.cloneDeep(totalArr)
  let { tiggerToSave } = props

  const [urlArr, setUrlArr] = useState(tempTotalArr)
  const [busArr, setBusArr] = useState([])
  const [choosedArr, setChoosedArr] = useState([])
  const [flag, setFlag] = useState(false)
  const [current, setCurrent] = useState(choosedCurrent) //做点击效果标记用的
  const [state, actions] = useStore('Verify')

  useEffect(() => {
    // 只有打开modal才会触发createBusArr
    if (tiggerToSave) {
      ;(async () => {
        await actions.saveBusAndChoosed({
          busArr,
          choosedArr
        })
      })()
      setBusArr([])
    } else {
      createBusArr()
    }
    setFlag(true)
  }, [tiggerToSave])

  //生成随机坐标(例如生成 x = 1, y = 2 => 12)
  const createRandomXY = () => {
    let x = Math.floor(Math.random() * 3)
    let y = Math.floor(Math.random() * 3)
    return {
      x,
      y,
      coordinate: x * 10 + y
    }
  }

  //生成公交车的坐标数组（两种形式，且数组长度为3: 3个含有公交车的坐标）
  const createBusArr = () => {
    let tempChoosedArr = []
    let i = 0

    while (i <= 2) {
      let res = createRandomXY()
      if (tempChoosedArr.indexOf(res.coordinate) === -1) {
        let tempBus = busArr
        let urlX = urlArr[res.x] // 获得行
        tempBus.push(res.coordinate)
        urlX.splice(res.y, 1, BusArr[i]) //获得新行
        urlArr.splice(res.x, 1, urlX) //(插入公交车图片)

        setBusArr(tempBus)
        setUrlArr(urlArr)

        i += 1
        tempChoosedArr.push(res.coordinate)
      } else continue
    }
  }

  const chooseCurrent = (index) => {
    let tempCurrent = current.slice()
    tempCurrent.splice(index, 1, !tempCurrent[index])

    //如果当前是选中状态,且选中数组中没有这个值,就放进数组
    if (tempCurrent[index] && choosedArr.indexOf(index) === -1)
      setChoosedArr(choosedArr.concat(index))

    //如果当前是取消选中状态,且取消选中的数组中有这个值,就剔除数组
    if (!tempCurrent[index] && choosedArr.indexOf(index) !== -1) {
      let targetIndex = choosedArr.indexOf(index)
      let tempChoosedArr = choosedArr

      tempChoosedArr.splice(targetIndex, 1)
      setChoosedArr(tempChoosedArr)
    }
    setCurrent(tempCurrent)
  }

  const setImage = () => {
    let tempArr = []

    urlArr.forEach((arrX) => {
      arrX.forEach((url) => {
        tempArr.push(url)
      })
    })

    // ----------- 👆的操作得到一个长度为9的url数组

    return tempArr.map((item, index) => {
      return (
        <div className={styles.imgWrap} key={Math.random() + index}>
          <Image
            height={150}
            width={157}
            src={item}
            preview={false}
            onClick={chooseCurrent.bind(undefined, index)}
          ></Image>
          <span className={current[index] ? styles.choosed : styles.notChoosed}>
            <CheckCircleFilled style={{ color: '#89bf04' }} />
          </span>
        </div>
      )
    })
  }

  return (
    <div className={styles.imgRegisterWrap}>
      {flag ? setImage() : <span></span>}
    </div>
  )
}
