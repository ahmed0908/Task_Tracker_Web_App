if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: 'mongodb://ahmed0908:Profession2017*@ds159866.mlab.com:59866/tasktracker-app'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost/tasktracker-dev'}
}
