import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { dateParser } from "../api/lib";
import { byField } from "../api/lib";
import { fetchTableData } from "../api/api";

// @React.FC \\
const Table = (props) => {
  const url = "https://oril-coins-test.herokuapp.com/list";
  const [apiData, setApiData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(0);
  const [searched, setSearched] = useState("");
  const [search, setSearch] = useState([]);

  useEffect(() => {
    fetchTableData(url, setApiData, apiData, sortBy, setSortedData, byField);
  }, [sortedData]);

  useEffect(() => {
    if (sortedData) {
      const Filter = sortedData.filter(el => {
        return el.name.toLowerCase().includes(String(searched.toLowerCase()))
      })
      setSearch(Filter);
    }},[searched])

  const renderCondition = () => {
    if (searched === "" | " ") {
      return sortedData
    } else {
      return search
    }}
  const renderList = () => {
    if (apiData) {
      return renderCondition().map((e) => {
        return (
          <tr key={e.createdAt}>
            <td>
              <NavLink
                to={{
                  pathname: "/chart",
                  state: {
                    data: e,
                    item: e.id,
                  },
                }}
                state={e.name}
                className="item_prop name"
              >
                {e.name}
              </NavLink>
            </td>
            <td className="">
              <NavLink
                to={{
                  pathname: "/chart",
                  state: {
                    data: e,
                    item: e.id,
                  },
                }}
                className="item_prop date"
              >
                {dateParser(String(e.createdAt))}
              </NavLink>
            </td>
            <td className="">
              <NavLink
                to={{
                  pathname: "/chart",
                  state: {
                    data: e,
                    item: e.id,
                  },
                }}
                className={`item_prop ${
                  e.isActive === true ? "action" : "disable"
                } activity `}
              >
                {e.isActive === true ? "Active" : "Disable"}
              </NavLink>
            </td>
          </tr>
        );
      });
    }
  };

  return apiData.length < 1 ? (
    <div>
      <div className="loader">
        <div className="ui segment">
          <div className="ui active dimmer">
            <div className="ui large text loader">Loading</div>
          </div>
          <p></p>
        </div>
      </div>
    </div>
  ) : (
    <div className="wrapper">
      <div className="ui left icon input input_body">
        <input
          type="text"
          placeholder="Search..."
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        />
        <i className="search icon"></i>
      </div>
      <div className="table_body">
        <table className="ui table">
          <thead>
            <tr>
              <th className="">
                <button
                  onClick={() => {
                    setSortBy(1);
                  }}
                  className="table_sortableBtn"
                >
                  NAME
                  <i
                    className={`angle ${sortBy === 1 ? "up" : "down"} icon`}
                  ></i>
                </button>
              </th>
              <th>
                <button
                  onClick={() => {
                    setSortBy(2);
                  }}
                  className={`table_sortableBtn`}
                >
                  DATE
                  <i
                    className={`angle ${sortBy === 2 ? "up" : "down"} icon`}
                  ></i>
                </button>
              </th>
              <th>
                <button
                  onClick={() => {
                    setSortBy(3);
                  }}
                  className={"table_sortableBtn"}
                >
                  STATE
                  <i
                    className={`angle ${sortBy === 3 ? "up" : "down"} icon`}
                  ></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{renderList()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
