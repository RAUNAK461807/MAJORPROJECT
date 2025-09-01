 require("dotenv").config();
 const mongoose = require("mongoose");

const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data =  initData.data.map((obj)=>({...obj, owner:"68a96b4281396b2fc5d228fe"}));
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68a96b4281396b2fc5d228fe",
  }));

  for (let obj of initData.data) {
    let response = await geocodingClient
      .forwardGeocode({
        query: obj.location,
        limit: 1,
      })
      .send();

    if (response.body.features.length > 0) {
      obj.geometry = response.body.features[0].geometry; // ✅ add geometry
    } else {
      obj.geometry = {
        type: "Point",
        coordinates: [0, 0], // fallback default
      };
      console.log(`⚠️ No geometry found for ${obj.location}, default set [0,0]`);
    }
  }

  console.log("Final data before insert:", initData.data);
  await Listing.insertMany(initData.data);
  console.log("✅ Data was initialized");
};



initDB();