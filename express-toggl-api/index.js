const express = require('express');
const dayjs = require('dayjs');
const cors = require('cors');
const axios = require('axios');
const users = require('./users-config');

const API_UNIQUE_USER_AGENT = `${process.env.USER}TogglDash`;

function getGoalFor(userInfo, period) {
  let goal = 0;
  let startDay, days;
  if (period === 'month') {
    startDay = dayjs().startOf('month').day();
    days = dayjs().daysInMonth();
  } else if (period === 'week') {
    startDay = dayjs().startOf('week').day()
    days = 7;
  } else if (period === 'day') {
    startDay = dayjs().day();
    days = 1;
  } else {
    return 0;
  }
  for (let i = 0; i < days; i += 1) {
    goal += userInfo.goals.days[(startDay + i)%7]
  }
  return goal;
}

function getSinceString(forDate) {
  if (dayjs().date() > 6) {
    return dayjs().startOf('month').subtract(1, 'day').format('YYYY-MM-DD');
  }
  return dayjs().startOf('month').startOf('week').subtract(1, 'day').format('YYYY-MM-DD');
}

function getCompletedFor(data, period) {
  let completedMilliseconds = 0;
  let start;
  if (period === 'day') {
    start = dayjs().startOf('day');
  } else if (period === 'week') {
    start = dayjs().startOf('week');
  } else if (period === 'month') {
    start = dayjs().startOf('month');
  } else {
    return [0, false];
  }
  let isRunning = false;
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].stop) {
      currentEnd = dayjs(data[i].stop)
      if (dayjs(data[i].start).isAfter(start)) {
        completedMilliseconds += data[i].duration*1000;
      } else if (currentEnd.isAfter(start)) {
        completedMilliseconds += currentEnd.diff(start);
      }
    } else if (data[i].duration < 0) {
      // TODO, pick max of data[i].start and start
      completedMilliseconds += dayjs().diff(dayjs(data[i].start));
      isRunning = true;
    }
  }
  return [parseFloat((completedMilliseconds/1000/60/60).toFixed(2)), isRunning];
}
async function handle(req, res) {
  const { user } = req.params;
  if (!user || !users[user]) {
    res.status(400).send({
      error: `user ${user} not found`
    });
  }
  const userInfo = users[user];
  try {
    const { data, status } = await axios.get('https://api.track.toggl.com/api/v8/time_entries', { 
      params: {
        user_agent: API_UNIQUE_USER_AGENT,
        wid: userInfo.workspace,
        since: getSinceString(),
      },
      responseType: 'json',
      auth: {
        username: userInfo.api,
        password: 'api_token',
      },
    }).catch((err) => {
      res.status(500).send({
        error: 'unknown error',
      });
    });
    if (res.headersSent) {
      return;
    }
    if (status !== 200) {
      console.error('received bad response from toggl', data);
      res.status(500).send({ error: 'received bad response from toggl'})
      return;
    }
    const items = data.sort((a, b) => a.start < b.start ? -1 : 1);
    // TODO: loop once
    const dayData = {
      completed: getCompletedFor(items, 'day')[0],
      goal: getGoalFor(userInfo, 'day')
    };
    const weekData = {
      completed: getCompletedFor(items, 'week')[0],
      goal: getGoalFor(userInfo, 'week')
    };
    let [completedMonth, isRunning] = getCompletedFor(items, 'month');
    const monthData = {
      completed: completedMonth,
      goal: getGoalFor(userInfo, 'month')
    };
    res.send({
      day: dayData,
      week: weekData,
      month: monthData,
      isRunning,
    });
  } catch (e) {
    console.error('error with request to toggl', e);
    res.status(500).send({ error: 'error with request to toggl'});
    return;
  }
}

const App = express();
const port = 6001;
App.use(cors());
App.get('/:user', handle);

App.listen(port, () => console.log(`Listening on port ${port}`));
