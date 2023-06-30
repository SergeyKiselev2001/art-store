import { IUserState } from '@entities/user'
import classes from './ProfileInfo.module.scss'
import { me } from '@entities/me'
import { LangSwitcher } from '@widgets/LangSwitcher'
import { ThemeSwitcher } from '@widgets/ThemeSwitcher'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { user as currentProfile } from '@entities/user'
import { useTranslation } from 'react-i18next'
import {
  i18Chunks,
  i18Keys,
  i18KeysProfile,
} from '@widgets/LangSwitcher/types/i18Keys'
import { DEFAULT_NS } from '@shared/constants'

interface IProfileInfo {
  user: IUserState
}

const ProfileInfo = observer(({ user }: IProfileInfo) => {
  const { login, status, avatar, systemRole } = user

  const isMe = me.login == login

  const [subscribed, setSubscribed] = useState(false)
  const { t } = useTranslation(i18Chunks.PROFILE)

  useEffect(() => {
    setSubscribed(!!me.subscriptions.users.find((user) => user == login))
  }, [me.subscriptions.users])

  const toggleSubscribe = () => {
    currentProfile.subscribeOnUser(me.id)
    setSubscribed((prev) => !prev)
  }

  return (
    <div className={classes.ProfileInfo}>
      <div className={classes.header}>
        <img className={classes.avatar} src={avatar?.src} alt={avatar?.alt} />
        <div className={classes.texts}>
          <h3 className={classes.name}>{login}</h3>
          <span className={classes.status}>🔥 {status} 🔥</span>
        </div>
        {!isMe && me.login && (
          <div className={classes.subscribe}>
            <button
              className={subscribed ? classes.active : ''}
              onClick={toggleSubscribe}
            >
              {subscribed
                ? t(i18Keys.UNSUBSCRIBE, DEFAULT_NS)
                : t(i18Keys.SUBSCRIBE, DEFAULT_NS)}
            </button>
          </div>
        )}
      </div>
      <div className={classes.content}>
        <div className={classes.stats}>
          <span>{t(i18KeysProfile.REGISTRATION_DATE)}: 20.12.2023</span>
          <span>
            {t(i18KeysProfile.ROLE)}:{' '}
            {t(systemRole as keyof typeof i18Keys, DEFAULT_NS)}
          </span>
        </div>
        {isMe && (
          <div className={classes.settings}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <LangSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export default ProfileInfo
