import React from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import axios from "axios";
import {useEffect, useState} from "react";
import {dateParser} from "../lib";
import {byField} from "../lib";
import {Month} from "../lib";



// @React.FC \\
const Chart = (props) => {
            const [apiData, setApiData] = useState([])
            const [data, setData] = useState([])
            const [isFetched, setFetched] = useState(false);
            const [chartState, setChartState] = useState(1);
            let chartData = [];


            useEffect(() => {
            fetchData();

            },[isFetched])


  function fetchData () {
   const item = props.location.state.item;
        axios.get(`https://oril-coins-test.herokuapp.com/item/${item}`).then((res) => {
            setApiData(res.data.data)
           const dateFilter = apiData.filter(el => {
               return el.date.includes("2021")
            }).sort(byField("date"))
            setData(dateFilter)
            setFetched(true);
            Stats();
        })
    }


    function sortForWeeks(condition, lastDay = 31) {
        const arrayOfDays = [];
        data.map(el => {
            const month = new Date(Date.parse(el.date)).getMonth() + 1
            if (month === condition) {
                const day = new Date(Date.parse(el.date)).getDate()
                if (day != lastDay - 7 && day >= lastDay - 7) {
                    arrayOfDays.push(el);
                }}});
        const chartDays = arrayOfDays.map((el, index) => {
            return {
                Date: dateParser(el.date, 1),
                Currency: Number(Math.round(el.curency === "null" ? 0 : el.curency))
            }
        })
        return chartDays
    }


    function sortForYear() {
        const arrayOfData = [];
        const arrayOfMonth = [];
        let arrayOfCurrency = 0;
        for (let i = 0; i < 12; i++) {
            data.map(el => {
                const month = new Date(Date.parse(el.date)).getMonth()
                if (month === i) {
                    arrayOfData.push(el);
                    arrayOfCurrency += Number(Math.round(el.curency === "null" ? 0 : el.curency))
                }
            })
            const avg = Math.round(arrayOfCurrency / arrayOfData.length);
            arrayOfData.length = 0;
            arrayOfMonth.push(avg);
            arrayOfCurrency = 0;
        }
        const chartDataForYear = arrayOfMonth.map((el, index) => {
            return {
                Date: Month[index],
                Currency: el
            }
        })
        return chartDataForYear
    }


    function sortForMonth() {
        const arrayOfDays = [];
        const arrayOfCurrency = [];
            data.map(el => {
                const month = new Date(Date.parse(el.date)).getMonth()
                if (month === 11) {
                    arrayOfDays.push(el.date);
                        arrayOfCurrency.push(Number(Math.round(el.curency === "null" ? 0 : el.curency)));
                    }
            })
const chartMonth = arrayOfDays.map((el,index) => {
    return {
        Date: dateParser(el, 1),
        Currency: arrayOfCurrency[index]
    }
}).sort(byField("Date"))
        return chartMonth
    }




    function State() {
        if (data) {
            if (chartState === 1) {
              chartData = sortForWeeks(12,31)
            } else if (chartState === 2) {
              chartData = sortForMonth()
            } else if (chartState === 3) {
                chartData = sortForYear();
            } else {
                setChartState(1);
            }
        }};
    State();


    const Stats = () => {
        const array = [];
        let min = 0;
        let avg = 0;
        let max = 0;
        let total = 0;
       data.map(el => {
       total = Number(total + Math.round(el.curency === "null" ? 0 : el.curency))
           array.push(Number(Math.round(el.curency === "null" ? 0 : el.curency)));
       })
       min = Math.min.apply(Math, array);
        max = Math.max.apply(Math, array);
        avg = Math.round(total / array.length)
        return {
            total: total,
            min: min,
            avg: avg,
            max: max
        }
    }
    window.top.document.title = `${props.location.state.data.name} chart`








    // @render \\
    if (apiData.length < 1) {
        return (
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
        )
    } else {
        return (
            <div className="chart_wrapper">
                <div className="chart_container">
                    <h1 className="chart_header">Revenue</h1>
                    <div className="ui basic buttons">
                        <div onClick={() => {
                            setChartState(1)
                        }} className={`ui button chart_button ${chartState === 1 ? "active" : ""}`}>Week
                        </div>
                        <div onClick={() => {
                            setChartState(2)
                        }} className={`ui button chart_button ${chartState === 2 ? "active" : ""}`}>Month
                        </div>
                        <div onClick={() => {
                            setChartState(3)
                        }} className={`ui button chart_button ${chartState === 3 ? "active" : ""}`}>Year
                        </div>
                    </div>
                    <ResponsiveContainer width="98.4%" height="60%">
                        <LineChart
                            width={1600}
                            height={400}
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="Date"/>
                            <YAxis type="number" domain={[0, 500]}/>
                            <Tooltip/>
                            <Legend/>
                            <Line
                                type="monotoneX"
                                dataKey="Currency"
                                stroke="#007AFF"
                                activeDot={{r: 8}}
                                strokeWidth={"3"}
                                unit=" $"

                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="chart_stats">
                        <div>
                            <span>Total</span>
                            <div><h1>$ {Stats().total}</h1></div>
                        </div>
                        <span>Min</span>
                        <span>Average</span>
                        <span>Max</span>
                        <br/>
                        <h3 className="chart_stats_min_value">$ {Stats().min}</h3>
                        <h3 className="chart_stats_avg_value">$ {Stats().avg}</h3>
                        <h3 className="chart_stats_max_value">$ {Stats().max}</h3>
                    </div>
                </div>
            </div>
        )
    }
}


export default Chart;

