import { Router } from "express";
import { auth } from "../middleware/jwtAuth";
import {doLogin, registerUser, getProfile} from "../controllers/login"
import { getUser, getUsers, addUser, deleteUser, disableUser, enableUser, updateUser } from "../controllers/users";
import { getProduct, getProducts, addProduct, deleteProduct, disableProduct, enableProduct, updateProduct } from "../controllers/products";

const router : Router = Router();

/**Login/register routes */
router.post("/login", doLogin);
router.post("/register", registerUser);
router.get("/profile", auth, getProfile);

/**User routes */
router.get("/private/users", auth, getUsers);
router.get("/private/user/:id", auth, getUser);
router.post("/private/user", auth, addUser);
router.put("/private/user/:id", auth, updateUser);
router.put("/private/user/:id/enable", auth, enableUser);
router.put("/private/user/:id/disable", auth, disableUser);
router.delete("/private/user/:id", auth, deleteUser);

/**Product routes */
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/private/product", auth, addProduct);
router.put("/private/product/:id", auth, updateProduct);
router.put("/privateproduct/:id/enable", auth, disableProduct);
router.put("/private/product/:id/disable", auth, enableProduct);
router.delete("/private/product/:id", auth, deleteProduct);

export default router;
