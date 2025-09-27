import { addCategory,deleteCategory,getAllCategory,getCategoryDetails, updateCategory } from "../controllers/Category.controller.js";
import  express  from 'express';

const CategoryRoute = express.Router();

CategoryRoute.post('/add', addCategory)
CategoryRoute.get('/all', getAllCategory)
CategoryRoute.delete('/delete/:categoryid', deleteCategory)
CategoryRoute.get('/details/:categoryid', getCategoryDetails)
CategoryRoute.put('/update/:categoryid', updateCategory)

export default CategoryRoute;
