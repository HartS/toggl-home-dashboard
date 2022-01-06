# Toggl Home Dashboard

![Sample Dashboard](demo.png?raw=true)

A simple dashboard showing your daily, weekly, and monthly progress towards configurable goals based on your Toggl time entries.

Names will be displayed green when the user's timer is running.

Installation notes:

- node and npm should be installed (probably need node >10)
- Configure users and goals in [`express-toggl-api/users-config.js`](https://github.com/harts/toggl-home-dashboard/blob/main/express-toggl-api/users-config.js) and [`dashboard/src/App.svelte`](https://github.com/harts/toggl-home-dashboard/blob/main/dashboard/src/App.svelte#L4)
- `npm install` in both directories
- `node index.js` in `express-toggl-api/` to start server
- `npm run dev` in `dashboard/` to start dashboard

See dashboard in your browser at `http://localhost:5000`. Data will load within ~10 seconds

## API Limit Notes:

Each dashboard tab polls the server every 10 seconds for every user, and the server doesn't do any request de-duplication, caching, or adjustment for number of users. Be mindful of Toggl's rate limits of 1 request per second per IP if opening multiple tabs or adding a lot of users.
