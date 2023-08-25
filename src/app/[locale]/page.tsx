import Image from 'next/image'
import styles from './home.module.scss'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('common')

  return (
    <main className={styles.home}>
      Home
    </main>
  )
}
