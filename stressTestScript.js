const randomNumGenerator = function(min, max, decimalPlaces) {
  var rand = (Math.random() * (max - min)) + min;
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
};

const fakeGenData = (userContext, events, done) => {
  let id = randomNumGenerator(0, 500, 0);
  userContext.vars.id = id;
  return done();
};

module.exports = {
  fakeGenData,
};
