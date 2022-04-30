import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Chart from '../public/static/chart.js'
import Graph from '../public/static/graph.js'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lost Ark RMT Gold Price</title>
        <meta name="description" content="Lost Ark RMT Gold Price history." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Lost Ark Gold Market
        </h1>

        <div className={`svg`}>
          <Chart></Chart>
        </div>

        <h3>
          Mari
        </h3>

        <div className={`svg`}>
          <Graph></Graph>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="https://mobitracker.co/android-chrome-512x512.png" alt="MobiTracker Logo" width={16} height={16} />
          </span>
        </a>
      </footer>
      <Script type='module' src='/static/d3/index.js'/>
    </div>
  )
}
