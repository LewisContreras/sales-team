import express from "express";
const router = express.Router();

import { signin, getUsers, createUser, updateUser, deleteUser } from "../controllers/user.js";
import auth from "../middleware/auth.js";

router.post("/signin", signin);
router.get('/', getUsers);
router.post('/',auth, createUser);
router.patch('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;