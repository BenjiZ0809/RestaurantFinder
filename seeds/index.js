const mongoose = require("mongoose");
const neighbourhoods = require("./neighbourhoods");
const Restaurant = require("../models/restaurant");
const{ places, descriptors } = require("./seedHelpers")
//const restaurant = require("../models/restaurant");
//const cities = require("./cituers");

main().catch(err => {
  //console.log("Mongoose connect failed");
  console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/restaurant-finder');
  //console.log("Mongoose connected");
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
})

const sample = function(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Restaurant.deleteMany({}); 
    for(let i=0; i<70; i++) {
      const random108 = Math.floor(Math.random() * 108);
      const price = Math.ceil(Math.random() * 100) + 15;
      const restaurant = new Restaurant({
        author: "63606826c21f9efb37474c37",
        location: `${neighbourhoods[random108].Boroughs}, ${neighbourhoods[random108].neighbourhood}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto eligendi error, officia, non eos iste alias saepe consequatur id, voluptatum velit et tenetur ipsam perferendis. Nemo repellendus autem quasi illo?",
        price,
        geometry: {
            type: "Point",
            coordinates: [
                neighbourhoods[random108].longitude,
                neighbourhoods[random108].latitude
            ]
        },
        images: [
            {
              url: 'https://res.cloudinary.com/dukcbnlrq/image/upload/v1667956655/RestaurantFinder/y60mhnb0guyzlwinmuvk.webp',
              filename: 'RestaurantFinder/y60mhnb0guyzlwinmuvk',
            },
            {
                url: 'https://res.cloudinary.com/dukcbnlrq/image/upload/v1667698242/RestaurantFinder/o2nzupmymy3xnltfkh5q.webp',
                filename: 'RestaurantFinder/o2nzupmymy3xnltfkh5q',
            }
          ],
        
      })
      await restaurant.save();
    }
}

seedDB()
  .then(() => {
    mongoose.connection.close();
  })


