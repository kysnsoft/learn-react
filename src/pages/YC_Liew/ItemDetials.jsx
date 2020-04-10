import React, { useState, useEffect } from "react";
import "./Dota2.scss";

const itemDetails = (props) => {
  useEffect(() => {
    fetchItem();
    fetchAtt();
  }, []);

  const [item, setItem] = useState([]);
  const [cd, setCd] = useState(true);
  const [att, setAtt] = useState([]);
  let filter = 0;
  const { id } = props.match.params
  const {itemss} = props.location.state

  const fetchItem = async () => {
    const object = itemss
    for (const property in object) {
      if (property === id) {
        setItem(preItem => {
          return [
            ...preItem,
            {
              text: `${property}`,
              dname: `${object[property].dname}`,
              key: `${object[property].id}`,
              img: "http://cdn.dota2.com/" + `${object[property].img}`,
              cost: `${object[property].cost}`,
              lore: `${object[property].lore}`,
              CD: `${object[property].cd}`
            }
          ];
        });
        if (object[property].cd == false) {
          setCd(false);
        }
      }
    }
  };

  const fetchAtt = async () => {
    const object = await itemss
    for (const property in object) {
      if (property === id) {
        if (object[property].attrib[filter] != undefined) {
          console.log(object[property].attrib[filter].key, "filter");
          setAtt(preAtt => {
            return [
              ...preAtt,
              {
                key: `${object[property].attrib[filter].key}`,
                header: `${object[property].attrib[filter].header}`,
                value: `${object[property].attrib[filter].value}`,
                footer: `${object[property].attrib[filter].footer}`
              }
            ];
          });
          filter++;
        }
      }
    }
  };

  return (
    <div className="Details-Main">
      {item.map(item => (
        <div className="Details-div" key={item.key}>
          <div>
            <div className="Details-div-img">
              <img
                className="Details-img"
                src={item.img}
                alt={item.key}
                title={item.text}
              ></img>
            </div>
            <div className="Details-content">
              <table className="Details-table">
                <tbody>
                  <tr>
                    <td className="Details-table-td1 Details-table-name">
                      Name
                    </td>
                    <td className="Details-table-name">{item.dname}</td>
                  </tr>
                  <tr>
                    <td className="Details-table-td1 Details-table-cost">
                      Cost
                    </td>
                    <td className="Details-table-cost">{item.cost}</td>
                  </tr>
                  <tr>
                    <td className="Details-table-td1 Details-table-desc">
                      Desciption
                    </td>
                    <td className="Details-table-desc2">{item.lore}</td>
                  </tr>
                  <tr>
                    <td className="Details-table-td1">CD</td>
                    <td
                      className={
                        cd ? "Details-table-cd-true" : "Details-table-cd-false"
                      }
                    >
                      {item.CD}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="Details-content-cd">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {att.map(item => (
        <div key={item.key}>
          <div className="Details-content">
            <table className="Details-table">
              <tbody>
                <tr>
                  <td className="Details-att1">{item.key}</td>
                  <td className="Details-att2">
                    {item.header}
                    {item.value}
                    {item.footer}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default itemDetails;
