import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";


const url = "https://oril-coins-test.herokuapp.com/list"
const salaryData = {

}

// @class \\
const Table = (props) => {
const [data, setData] = useState([]);
const [byName, setByName] = useState(false);
    const [byDate, setByDate] = useState(false);
    const [byState, setByState] = useState(false);



useEffect(() => {
    axios.get(url).then((res) => {
        setData(res.data);
        console.log(data);
    })
    dateParser();
},[])


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
        return data.map(e => {
            console.log(data);
            return (
                <tr>
                    <td><NavLink to={{
                        pathname: "/chart",
                        state: {
                            name:{meta: e}}
                    }} state={e.name} className="item_prop name" >{e.name}</NavLink></td>
                    <td className=""><NavLink to="/chart" className="item_prop date">{dateParser(String(e.createdAt))}</NavLink></td>
                    <td className=""><NavLink to="/chart" className={`item_prop ${e.isActive === true ? "action" : "disable"} activity `}>{e.isActive === true ? "Active" : "Disable"}</NavLink></td>
                </tr>
            )})
    }
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
                <input type="text" placeholder="Search..." />
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