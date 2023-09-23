import Link from 'next/link'
import styles from './Header.module.scss'

const links = [
    {
        label: 'Test',
        route: '/'
    }, {
      label: 'About me',
      route: '/about'
    }
]

export function Header() {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.nav}>
                    {links.map(({ label, route }) => (
                        <li key={route}>
                            <Link href={route}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}