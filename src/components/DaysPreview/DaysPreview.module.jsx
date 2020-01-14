import React from 'react';
import {
    Link,
} from "react-router-dom";

function DaysPreview(props) {
    function getFormatDate(dateFull) {
        return (dateFull.split(' '))[0];
    }

    return (<div className="wrapper-days">
            {props.daysList(props.json).map((obj, index) => (
                <Link to={"/" + getFormatDate(obj.dt_txt)} className="day-prv" key={index}>
                    <div className="day-name">{props.getDay(obj.dt_txt)}</div>
                    <div className="wrap-img">
                        <img src={obj.icon} alt="" />
                    </div>
                    <div className="temperature">
                        <span className="max">{props.tempFormat(obj.temp_max)} <sup className="deg">&deg;</sup></span>
                        <span className="min">{props.tempFormat(obj.temp_min)} <sup className="deg">&deg;</sup></span>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default DaysPreview;