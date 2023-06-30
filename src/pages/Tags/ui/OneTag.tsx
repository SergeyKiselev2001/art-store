import {
  i18Chunks,
  i18Keys,
  i18Tags,
} from '@widgets/LangSwitcher/types/i18Keys'
import classes from './Tags.module.scss'
import { useTranslation } from 'react-i18next'
import { CLIENT, DEFAULT_NS } from '@shared/constants'
import linkImg from './images/link.png'
import { useState, useEffect } from 'react'
import { wordForm } from '@shared/utils'
import { me } from '@entities/me'

interface IOneTag {
  postsAmount: number
  isSubscribed: boolean
  isBlocked: boolean
  type: i18Tags
}

const OneTag = (props: IOneTag) => {
  // useEffect(() => {
  //   setIsSubscribed()
  //   setIsBlocked(props.isBlocked)
  // }, [])
  const { postsAmount, type } = props
  const { t, i18n } = useTranslation(i18Chunks.TAGS)

  const [isSubscribed, setIsSubscribed] = useState(props.isSubscribed)
  const [isBlocked, setIsBlocked] = useState(props.isBlocked)

  const toggleSubscription = () => {
    setIsSubscribed((prev) => !prev)
  }

  const toggleBlock = () => {
    setIsBlocked((prev) => !prev)
  }

  return (
    <div className={classes.OneTag}>
      <div className={`${classes.main} ${classes[type]}`}>
        <div className={classes.texts}>
          <h3>{t(type)}</h3>
          <span>
            {postsAmount}{' '}
            {i18n.language == 'ru'
              ? wordForm('Пост', 'Поста', 'Постов', postsAmount)
              : t(i18Keys.POSTS, DEFAULT_NS)}
          </span>
        </div>

        <a
          rel="noreferrer"
          target="_blank"
          href={`${CLIENT}?tags_like=${type}`}
        >
          <img src={linkImg} alt="link" />
        </a>
      </div>
      {me.login && (
        <div className={classes.bottom}>
          <button onClick={toggleSubscription}>
            {isSubscribed
              ? t(i18Keys.UNSUBSCRIBE, DEFAULT_NS)
              : t(i18Keys.SUBSCRIBE, DEFAULT_NS)}
          </button>
          <button onClick={toggleBlock}>
            {isBlocked
              ? t(i18Keys.UNBLOCK, DEFAULT_NS)
              : t(i18Keys.BLOCK, DEFAULT_NS)}
          </button>
        </div>
      )}
    </div>
  )
}

export default OneTag
