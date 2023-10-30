### react-timeline-range-slider
![demo gif](./demo.gif)
### Installation

     npm i react-timeline-range-slider
### Props

| Prop | Type | Default | Description|
|--|--|--|--|
| timelineInterval | array |[startOfToday(), endOfToday()]|Interval to display|
|selectedInterval|array|[new Date(), addHours(new Date(), 1)]|Selected interval inside the timeline|
|disabledIntervals|array|[]|Array of disabled intervals inside the timeline|
|containerClassName|string||ClassName of the wrapping container|
|step|number|1800000|Number of milliseconds between steps (the default value is 30 minutes)|
|ticksNumber|number|48|Number of steps on the timeline (the default value is 30 minutes)|
|error|bool|false|Is the selected interval is not valid|
|mode|int/function|3|The interaction mode. Value of 1 will allow handles to cross each other. Value of 2 will keep the sliders from crossing and separated by a step. Value of 3 will make the handles pushable and keep them a step apart. ADVANCED: You can also supply a function that will be passed the current values and the incoming update. Your function should return what the state should be set as.|
|formatTick|function|ms => format(new Date(ms), 'HH:mm')|Function that determines the format in which the date will be displayed|
|onUpdateCallback|function|||
|onChangeCallback|function|||
|trackStyles|object|{error: {backgroundColor: 'red'}, valid: {...}}|Styles for the track|
|handleColors|object|{error: 'red', valid: 'green'}|Styles for the handle|
### Example
[Live demo](https://codesandbox.io/s/react-timeline-range-slider-ve7w2?file=/src/App.js)
```javascript
import React from 'react'  
import { endOfToday, set } from 'date-fns' 
import TimeRange from 'react-timeline-range-slider'  

const now = new Date()
const getTodayAtSpecificHour = (hour = 12) =>
	set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour()
const selectedEnd = getTodayAtSpecificHour(14)

const startTime = getTodayAtSpecificHour(7)
const endTime = endOfToday()

const disabledIntervals = [
  { start: getTodayAtSpecificHour(16), end: getTodayAtSpecificHour(17) },
  { start: getTodayAtSpecificHour(7), end: getTodayAtSpecificHour(12) },
  { start: getTodayAtSpecificHour(20), end: getTodayAtSpecificHour(24) }
]

class App extends React.Component {  
  state = {  
    error: false,  
    selectedInterval: [selectedStart, selectedEnd],  
  }
	
  errorHandler = ({ error }) => this.setState({ error })  

  onChangeCallback = selectedInterval => this.setState({ selectedInterval })  

  render() {  
    const { selectedInterval, error } = this.state  
      return (  
        <TimeRange
          error={error}  
          ticksNumber={36}  
          selectedInterval={selectedInterval}  
          timelineInterval={[startTime, endTime]}  
          onUpdateCallback={this.errorHandler}  
          onChangeCallback={this.onChangeCallback}
          disabledIntervals={disabledIntervals}  
          trackStyles={{
            error: {
              backgroundColor: 'rgba(214,0,11,0.5)',
              borderLeft: '1px solid rgba(214,0,11,0.5)',
              borderRight: '1px solid rgba(214,0,11,0.5)',
            },
            valid: {
              backgroundColor: 'rgba(98, 203, 102, 0.5)',
              borderLeft: '1px solid #62CB66',
              borderRight: '1px solid #62CB66',
            }
          }}
          handleColors={{
            error: 'rgb(214, 0, 11)',
            valid: 'rgb(98, 203, 102)'
          }}
        />
      )  
  }  
}  

export default App
```
