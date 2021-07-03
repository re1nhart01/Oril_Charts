import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";


const url = "https://oril-coins-test.herokuapp.com/list"

// @React.FC \\
const Table = (props) => {
const [data, setData] = useState([]);
const [sortedData, setSortedData] = useState([]);
const [byName, setByName] = useState(false);
    const [byDate, setByDate] = useState(false);
    const [byState, setByState] = useState(false);
    const [searched, setSearched] = useState("");

useEffect(() => {
    axios.get(url).then((res) => {
        setData(res.data);
         const Sorted = byName === true ? "name" : byDate === true ? "createdAt" : byState === true ? "isActive" : ""
        if(Sorted === "isActive") {
            setSortedData(data.sort((a, b) => a[Sorted] > b[Sorted] ? -1 : 1));
        } else {
            setSortedData(data.sort(byField(Sorted)));
        }
    })
},[sortedData])

    function byField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }



    const dateParser = (timestamp) => {
        const parser = new Date(Date.parse(timestamp))
        return `${parser.getDay() < 10 ? "0" : ""}${parser.getDay()}.${parser.getMonth() < 10 ? "0" : ""}${parser.getMonth()}.${parser.getFullYear()}`
    }





const renderList = () => {
    if (!data) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        return sortedData.map(e => {
            return (
                <tr key={e.createdAt}>
                    <td><NavLink to={{
                        pathname: "/chart",
                        state: {
                            data: e,
                        item: e.id
                        }
                    }} state={e.name} className="item_prop name" >{e.name}</NavLink></td>
                    <td className=""><NavLink to={{
                        pathname: "/chart",
                        state: {
                            data: e,
                            item: e.id
                        }}} className="item_prop date">{dateParser(String(e.createdAt))}</NavLink></td>
                    <td className=""><NavLink to={{
                        pathname: "/chart",
                        state: {
                        data: e,
                        item: e.id
                    }}} className={`item_prop ${e.isActive === true ? "action" : "disable"} activity `}>{e.isActive === true ? "Active" : "Disable"}</NavLink></td>
                </tr>
            )})
    }
    }


    const onSearch = () => {

    }

    const sort = (element) => {
    setByName(false)
        setByDate(false)
        setByState(false)
        element(true);
    }

    return (
        <div className="wrapper">
            <div className="ui left icon input input_body">
                <input type="text" placeholder="Search..." value={searched} onChange={e => setSearched(e.target.value)} />
                <i className="search icon"></i>
            </div>
            <div className="table_body">
            <table className="ui table">
                <thead>
                <tr>
                    <th className=""><button onClick={() => {sort(setByName)}} className="table_sortableBtn">NAME<i className={`angle ${byName === false ? "down" : "up"} icon`}></i></button></th>
                    <th><button onClick={() => {sort(setByDate)}} className={`table_sortableBtn`}>DATE<i className={`angle ${byDate === false ? "down" : "up"} icon`}></i></button></th>
                    <th><button onClick={() => {sort(setByState)}} className={"table_sortableBtn"}>STATE<i className={`angle ${byState === false ? "down" : "up"} icon`}></i></button></th>
                </tr>
                </thead>
                <tbody>
                {renderList()}
                </tbody>
            </table>
            </div>
        </div>
    )
}



export default Table