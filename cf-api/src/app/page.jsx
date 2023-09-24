import styles from './page.module.scss'
import { Searcher } from './components/Searcher'

export default function Home() {
  return (
    <main className={styles.main}>
      <Searcher />
    </main>
  )
}
