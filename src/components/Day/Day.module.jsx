import React from 'react';
import { withRouter } from "react-router";
import {
    Link,
} from "react-router-dom";

function  Day(props) {
    const date = props.match.params.date;
    const daysList = props.daysList(props.json);
    const day = (new Date(date).getDate());

    function dayInfo(dts) {

        let list = props.json.list;
        let listRef = [];

        for (let index in list) {
            if (dts.indexOf(list[index].dt) > -1) {
                listRef.push(list[index]);
            }
        }

        return listRef;
    }

    function getHours(date) {
        let currentTime = new Date(date).toLocaleTimeString('en-US', {
            hour12: false,
            hour: "numeric",
            minute: "numeric"
        });
        return currentTime;
    }

    return (<div className="wrapper-one-day">
            <h1>{props.getDay(daysList[day].dt_txt)}</h1>
            {dayInfo(daysList[day].dts).map((obj, index) => (
                <div className="day-info" key={index}>
                    <div className="time">
                        <b>{getHours(obj.dt_txt)}</b>
                    </div>
                    <div className="wrap-img">
                        <img src={`http://openweathermap.org/img/wn/` + obj.weather[0].icon + `@2x.png`} alt="" />
                    </div>
                    <div className="temperature">
                        <span className="max">{props.tempFormat(obj.main.temp)} <sup className="deg">&deg;</sup></span>
                    </div>
                </div>
            ))}
            <hr />
            <Link to="/" className="btn-back">Back</Link>
        </div>
    );
}

export default withRouter(Day);