import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Chart from '../public/static/chart.js'
import Graph from '../public/static/graph.js'
import styles from '../styles/Home.module.css'
import staticData from '../public/static/d3/data.js'
import { getCookie } from 'cookies-next';


export default function LostArk() {
  const [server, setServer] = useState('mari')

  useEffect(() => {
    setServer(getCookie('server') ? getCookie('server') : 'mari');
    staticData.server = getCookie('server') ? getCookie('server') : 'mari';
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Lost Ark RMT Gold Price</title>
        <meta name="description" content="Lost Ark RMT Gold Price history." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Lost Ark Gold Market (UTC)
        </h1>

        <div className={`svg`}>
          <Chart></Chart>
        </div>

        <h3>
          {server[0].toUpperCase() + server.substring(1)}
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
    </div>
  )
}
