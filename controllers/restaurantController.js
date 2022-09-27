import Restaurant from '../models/restaurantModel';


// @desc GET all restaurants
// @route /api/restaurants
// @access private
const getRestaurant = async (req, res) => {
    const restaurants = await Restaurant.find();
    res.json({ count: restaurants.length, restaurants });
}

// @desc POST all restaurants
// @route /api/restaurants
// @access private
const createRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);
        res.json({ success: true, restaurant });
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
};

// @desc PUT all restaurants
// @route /api/restaurants/:id
// @access private
const updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (Object.keys(req.body).length === 0) {
            throw new Error('No new adjustment');
        }
        res.json({ success: true, restaurant });
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }

};

// @desc DELETE all restaurants
// @route /api/restaurants/:id
// @access private
const deleteRestaurant = async (req, res) => {

    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (restaurant) {
            res.json({ success: true, restaurant });
        } else {
            throw new Error('Id not found');
        }
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }

};

export { getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant };