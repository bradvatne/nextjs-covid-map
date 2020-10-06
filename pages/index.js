import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home({stats, overall}) {
  console.log(overall)
  return (

    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Map markers={stats.map(markerData)}/>
        <div className="overall-container">
          <div>
            <h1>Total Cases: </h1>
            <h2>{overall.cases}</h2>
          </div>
          <div>
            <h1>Total Deaths: </h1>
            <h2>{overall.deaths}</h2>
          </div>
          <div>
            <h1>Today's Cases: </h1>
            <h2>{overall.todayCases}</h2>
          </div>
          <div>
            <h1>Today's Deaths: </h1>
            <h2>{overall.todayDeaths}</h2>
          </div>
          <div>
            <h1>Total Active Cases: </h1>
            <h2>{overall.active}</h2>
          </div>
        </div>
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
  let info = {
    lat: currentVal.countryInfo.lat, 
    long: currentVal.countryInfo.long, 
    countryName: currentVal.countryInfo.iso3, 
    cases: currentVal.countryInfo.cases, 
    active: currentVal.countryInfo.active, 
    deaths: currentVal.countryInfo.deaths
  }
  return info;
}
