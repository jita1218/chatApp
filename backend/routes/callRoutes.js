import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { generateZegoToken} from "../controllers/callController.js";

const router = express.Router();

router.post("/zegotoken", protectRoute,generateZegoToken);

export default router;