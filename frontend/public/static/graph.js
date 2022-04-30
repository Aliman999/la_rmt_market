'use strict'
import { useEffect, useState } from "react";
import * as d3 from "d3";
import staticData from "./d3/data.js";
import start from "./d3/lineGraph.js";

let test = true;

export default function Graph({ initialProps }) {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    fetch('http://localhost:8080/v1/historical/Elzowin')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)

        staticData = data;

        if (test) {
          test = false;
          start(d3);
        }
      })
  }, [])

  if (isLoading) return (<p>Loading...</p>);
  if (!data) return (<p>No profile data</p>);

  return (
    <div>
      
    </div>
  )
}
