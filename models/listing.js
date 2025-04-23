const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
    {
        title: {  // Fixed typo
            type: String,
        
        },
        description: String,
        
        image: {
            type: String,
            set: (v) => v === "" ? "/uploads/will-klinzman-oaCD9WYdNlU-unsplash.jpg" : v,
        },
        price: Number,  // Changed `Price` to lowercase `price` (best practice)
        location: String,
        country: String,  // Changed `Country` to lowercase `country` (best practice)
        reviews:[{
            type:Schema.Types.ObjectId,
            ref:"Review"
        }]
    }
);

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing; // Fixed  `module.exports`
