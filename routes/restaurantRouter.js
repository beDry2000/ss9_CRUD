import { Router } from "express";
import authen from '../middleware/authMiddleware';
import { getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurantController';

const restaurantRouter = Router();

restaurantRouter.use(authen);
restaurantRouter.route('/').get(getRestaurant).post(createRestaurant)
restaurantRouter.route('/:id').put(updateRestaurant).delete(deleteRestaurant)


export default restaurantRouter;