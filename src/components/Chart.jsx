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
            let chartData = [];
            /*
            1 - Show chart for the week (current, last 7 days)
            2 - Show chart for the month (current, last 30 days)
            3 - Show chart for the year (current, 2021)
            */

            const [chartState, setChartState] = useState(1);


    useEffect(() => {
        fetchData();
    },[isFetched])


   const fetchData = () => {
   const item = props.location.state.item;
        axios.get(`https://oril-coins-test.herokuapp.com/item/${item}`).then((res) => {
            console.log(res.data.data);
            setApiData(res.data.data)
           const dateFilter = apiData.filter(el => {
               return el.date.includes("2021")
            }).sort(byField("date"))

            setData(dateFilter)
            setFetched(true);
            stats();
            console.log(data);
        })
        console.log(apiData);

    }




    function sortForYear() {
        const arrayOfData = [];
        const arrayOfMonth = [];
        let arrayOfCurrency = 0;
        for (let i = 0;i < 12; i++) {
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
        }
        return arrayOfMonth;
    }
    sortForYear();



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

console.log(arrayOfDays, arrayOfCurrency)

const chartMonth = arrayOfDays.map((el,index) => {
    return {
        Date: el,
        Currency: arrayOfCurrency[index]
    }
}).sort(byField("Date"))
        return chartMonth
    }



     // const chartData = data.map(el => {
     //    return {
     //       Date: dateParser(el.date),
     //       Currency: Math.round(el.curency === "null" ? 0 : el.curency)
     //    }
     // })


    const chartDataForYear = sortForYear().map((el, index) => {
        return {
            Date: Month[index],
            Currency: el
        }
    })

    function State() {
        if (data) {
            if (chartState === 1) {

            } else if (chartState === 2) {
   chartData = sortForMonth()
            } else if (chartState === 3) {
                chartData = chartDataForYear;
            } else {
                setChartState(1);
            }
        }};

State()

    const stats = () => {
        const array = [];
        let min = 0;
        let avg = 0;
        let max = 0;
        let total = 0;
       data.map(el => {
       total = Number(total + Math.round(el.curency === "null" ? 0 : el.curency))
           array.push(Number(Math.round(el.curency === "null" ? 0 : el.curency)));

       })
       min = Math.min.apply(null, array);
        max = Math.max.apply(null, array);

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
    return (
        <div className="chart_wrapper">
            <div className="chart_container">
                <h1 className="chart_header">Revenue</h1>
                <div className="ui basic buttons">
                    <div onClick={() => {setChartState(1)}} className="ui button chart_button">Week</div>
                    <div onClick={() => {setChartState(2)}} className="ui button chart_button">Month</div>
                    <div onClick={() => {setChartState(3)}} className="ui button chart_button">Year</div>
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis type="number" domain={[0, 1000]} />
                <Tooltip />
                <Legend />
                <Line
                    type="linear"
                    dataKey="Currency"
                    stroke="#007AFF"
                    activeDot={{ r: 8 }}
                    strokeWidth={"1"}
                />
            </LineChart>
                </ResponsiveContainer>
             <div className="chart_stats">
                 <div>
                 <span>Total</span>
                     <div><h1>$ {stats().total}</h1></div>
                 </div>
                 <span>Min</span>
                 <span>Average</span>
                 <span>Max</span>
                 <br/>
                 <h3 className="chart_stats_min_value">$ {stats().min}</h3>
                 <h3 className="chart_stats_avg_value">$ {stats().avg}</h3>
                 <h3 className="chart_stats_max_value">$ {stats().max}</h3>
                 </div>
            </div>
            </div>
    )

}


export default Chart;

