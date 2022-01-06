# Toggl Home Dashboard

![Sample Dashboard](demo.png?raw=true)

A simple dashboard showing your daily, weekly, and monthly progress towards configurable goals based on your Toggl time entries.

Names will be displayed green when the user's timer is running.

Installation notes:

- node and npm should be installed (probably need node >10)
- Configure users and goals in [`express-toggl-api/users-config.js`](https://github.com/harts/toggl-home-dashboard/blob/main/express-toggl-api/users-config.js) and [`dashboard/App.svelte`](https://github.com/harts/toggl-home-dashboard/blob/main/dashboard/App.svelte#4)
- `npm install` in both directories
- `node index.js` in `express-toggl-api/` to start server
- `npm run dev` in `dashboard/` to start dashboard

See dashboard in your browser at `http://localhost:5000`. Data will load within ~10 seconds
