import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema(
    {
        address: {
            building: String,
            coord: Array,
            street: {
                type: String,
                required: [true, "Please provide street"]
            },
            zipcode: String,
        },
        borough: {
            type: String,
            required: [true, "Please provide borough"],
        },
        cuisine: {
            type: String,
            required: [true, "Please provide cuisine"],
        },
        grades: Array,
        name: {
            type: String,
            required: [true, "Please provide name"],
        },
        restaurant_id: String
    }, {
    collection: "restaurants"
}
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;