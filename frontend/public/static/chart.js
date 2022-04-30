'use strict'
import { useEffect, useState } from "react";
import * as d3 from "d3";
import staticData from "./d3/data.js";
import start from "./d3/barChart.js";
import config from '../../config/config';

let test = true;

export default function Charts() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    
    fetch(config.env == "local" ? "http://localhost:8081/rmt/live/all" : "https://mobitracker.co/rmt/live/all") //'https://mobitracker.co/rmt/live/all'
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
        staticData.data = data;
        if(test){
          test = false;
          start(d3);
        }
      })
  }, [])

  if (isLoading) return (<p>Loading...</p>);
  if (!data) return (<p>No profile data</p>);

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
