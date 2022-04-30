'use strict'
import { useEffect, useState } from "react";
import * as d3 from "d3";
import staticData from "./d3/data.js";
import start from "./d3/barChart.js";

let test = true;

export default function Chart() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    
    fetch('http://localhost:8080/v1/live/all')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
        staticData = data;
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
