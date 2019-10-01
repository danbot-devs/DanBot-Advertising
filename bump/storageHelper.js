const nedb = require("nedb");
const delay = require("delay");
var db = new nedb({ filename: "./storage.json", autoload: true });

class Ad {
  constructor(name, invite, topic, description) {
    this.name = name;
    this.invite = invite;
    this.topic = topic;
    this.description = description;
  }
}

class User {
  constructor(id, ads = []) {
    this.ID = id;
    this.ads = ads;
  }
}

function initUser(id) {
  db.count({ ID: id }, async function(err, number) {
    if (number == 0) {
      db.insert(new User(id));
    }
  });
}

module.exports.saveAd = async function(uID, name, invite, topic, description) {
  await initUser(uID);
  await delay(500);

  db.findOne({ ID: uID }, function(err, user) {
    user.ads.push(new Ad(name, invite, topic, description));
    db.update({ _id: user._id }, user);
  });
  
};

module.exports.delad = async function(uID, adNum) {
  await initUser(uID);
  await delay(500);
  db.findOne({ ID: uID }, function(err, user) {
    if (user.ads.length >= 1) {
      user.ads.splice(adNum, 1);
      db.update({ _id: user._id }, user);
    }
  });
};

module.exports.fetchAds = async function(uID, cb) {
  await initUser(uID);
  await delay(500);
  db.findOne({ ID: uID }, function(err, user) {
    if (user.ads.length < 1) {
      cb(0);
    } else {
      cb(user.ads);
    }
  });
};

module.exports.searchAds = async function(field, value, cb) {
  switch (field) {
    case "author":
      db.findOne({ ID: value }, function(err, user) {
        if (user == null) {
          initUser(value);
          cb(0);
        } else {
          if (user.ads.length > 0) {
            cb(user.ads);
          } else {
            cb(0);
          }
        }
      });
      break;
    case "topic":
      db.find({ "ads.topic": value }, async function(err, users) {
        if (users.length > 0) {
          var ads = [];
          await users.forEach(user => {
            user.ads.forEach(ad => {
              if (ad.topic == value) {
                ads.push(ad);
              }
            });
          });
          cb(ads);
        } else cb(0);
      });
      break;
    case "server-name":
      db.find({ "ads.name": value }, async function(err, users) {
        if (users.length > 0) {
          var ads = [];
          await users.forEach(user => {
            user.ads.forEach(ad => {
              if (ad.name == value) {
                ads.push(ad);
              }
            });
          });
          cb(ads);
        } else cb(0);
      });
      break;

    default:
      break;
  }
};

module.exports.banish = function(uID) {
  db.remove({ ID: uID });
};