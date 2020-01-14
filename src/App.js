import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import DaysPreview from './components/DaysPreview/DaysPreview.module';
import Day from './components/Day/Day.module';

const linkApi = `https://api.openweathermap.org/data/2.5/forecast?id=5128638&appid=f40cd285bc4c0905d6b6de20ecdca9fa`
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonWeather: null,
      isLoaded: false,
    };
  }

  getDay(time) {
    let date = new Date(time);
    let day = date.getDay();
    return days[day];
  }

  daysList = (json) => {

    let list = json.list;
    let listRef = [];

    for (let index in list) {
      let day = new Date(list[index].dt_txt).getDate();

      if (!listRef[day]) {
        listRef[day] = list[index];
        listRef[day].dts = [];
        listRef[day].temp_min = listRef[day].main.temp_min;
        listRef[day].temp_max = listRef[day].main.temp_max;
        listRef[day].icon = `http://openweathermap.org/img/wn/${listRef[day].weather[0].icon}@2x.png`;
      } else {
        if (listRef[day].main.temp_min > list[index].main.temp_min) {
          listRef[day].temp_min = list[index].main.temp_min;
        }
        if (listRef[day].main.temp_max < list[day].main.temp_max) {
          listRef[day].temp_max = listRef[day].main.temp_max;
        }
      }

      listRef[day].dts.push(list[index].dt);

        if (listRef.length === 5) {
        break;
      }
    }

    return listRef;
  }

  tempFormat(temp) {
    return Math.floor(temp - 273);
  }

  componentDidMount() {
    fetch(linkApi)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            jsonWeather: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, jsonWeather } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Router>

          <div className="wrapper-weather">

            <Switch>

              <Route path="/:date">
                <Day json={jsonWeather} daysList={this.daysList} getDay={this.getDay} tempFormat={this.tempFormat} />
              </Route>

              <Route exact path="/">
                <h1>Choose a day</h1>
                <DaysPreview json={jsonWeather} daysList={this.daysList} getDay={this.getDay} tempFormat={this.tempFormat} />
              </Route>

            </Switch>

          </div>

        </Router>
      );
    }
  }
}

export default App;