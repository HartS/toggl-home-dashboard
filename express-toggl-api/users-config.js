const users = {
  user1: {
    api: '', // api token found at https://track.toggl.com/profile
    workspace: '', // workspace ID is the number found in URL redirected from https://track.toggl.com/reports/summary/
    goals: {
      days: [6, 6, 6, 6, 6, 6, 6], // Sunday - Saturday hours per day
    },
  },
  user2: {
    api: '',
    workspace: '',
    goals: {
      days: [4, 4, 5, 0, 0, 4, 4]
    },
  },
};

module.exports = users;
