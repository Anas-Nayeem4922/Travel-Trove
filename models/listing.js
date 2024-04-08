const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
//Designing the schema and setting its constraints
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true

        }
    }
});

const Listing = mongoose.model("Listing", listingSchema); //setting up the Listing collection according to the listingSchema validations

//A post middleware to delete all the reviews if the corresponding liting is being deleted
listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

module.exports = Listing; //Exporting the collection