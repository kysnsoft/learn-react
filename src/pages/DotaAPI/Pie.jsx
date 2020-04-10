import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

export default function Modal({ info, heros }) {
  const [load, setLoad] = useState(false);
  const [top10, setTop10] = useState([]);
  const [value, setValue] = useState([]);
  let data;
  useEffect(() => {
    let filterArray = [];
    for (const property in info) {
      filterArray = [
        ...filterArray,
        ...info[property].radiant_team.split(",").map(x => x)
      ];
      filterArray = [
        ...filterArray,
        ...info[property].dire_team.split(",").map(x => x)
      ];
    }

    let counts = filterArray.reduce((map, hero) => {
      map[hero] = (map[hero] || 0) + 1;
      return map;
    }, {});

    let sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    setValue(
      Object.values(counts)
        .sort()
        .reverse()
    );
    console.log(sorted);
    console.log(
      Object.values(counts)
        .sort()
        .reverse()
    );
    setTop10(sorted.slice(0, 10));

    setLoad(true);
  }, []);

  if (load) {
    const heroName = heros.filter(hero => top10.includes(hero.id.toString()));
    const arrayMap = heroName.reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.id]: currentValue
      }),
      {}
    );
    const result = top10.map(id => arrayMap[id]);

    data = {
      labels: [
        result[0].localized_name,
        result[1].localized_name,
        result[2].localized_name,
        result[3].localized_name,
        result[4].localized_name,
        result[5].localized_name,
        result[6].localized_name,
        result[7].localized_name,
        result[8].localized_name,
        result[9].localized_name
      ],
      datasets: [
        {
          data: [
            value[0],
            value[1],
            value[2],
            value[3],
            value[4],
            value[5],
            value[6],
            value[7],
            value[8],
            value[9]
          ],
          backgroundColor: [
            "#b71c1c",
            "#880e4f",
            "#4a148c",
            "#311b92",
            "#1a237e",
            "#0d47a1",
            "#c0ca33",
            "#00acc1",
            "#689f38",
            "#43a047"
          ],
          hoverBackgroundColor: [
            "#ffebee",
            "#ffebee",
            "#ffebee",
            "#ffebee",
            "#ffebee",
            "#ffebee",
            "#ffebee",
            "#ffebee",
            "#ffebee",
            "#ffebee"
          ]
        }
      ]
    };
  }

  if (!load) return <div>Loading...</div>;
  return (
    <div>
      <h2>Pie Example</h2>
      <Pie data={data} />
    </div>
  );
}
