import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home({stats, overall}) {
  console.log(markerDataTest(stats[0]))
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Map
        markers={stats.map(markerData)}
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

function markerData(data, index, arr) {
  let currentVal = arr[index]
  let lat = currentVal.countryInfo.lat;
  let long = currentVal.countryInfo.long;
  let countryName = currentVal.countryInfo.iso3;
  let active = currentVal.active;
  let cases = currentVal.cases;
  let deaths = currentVal.deaths;
  let info = {lat, long, countryName, cases, active, deaths}
  return info;
}

function markerDataTest(data) {
  let lat = data.countryInfo.lat;
  let long = data.countryInfo.long;
  let countryName = data.countryInfo.iso3;
  let active = data.active;
  let cases = data.cases;
  let deaths = data.deaths;
  let info = {lat, long, countryName, cases, active, deaths}
  console.log('info')
  console.log(info)

  return data
}
