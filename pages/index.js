import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});


export default function Home({stats, overall}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Map
        markers={stats}
        />
      </main>
    </div>
  )
}

export async function getStaticProps(context){
  const res = await fetch('https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true');
  const stats = await res.json();
  const test = await fetch('https://disease.sh/v3/covid-19/all')
  const overall = await test.json();

  return {
      props: {
          stats,
          overall
      },
  }
}
