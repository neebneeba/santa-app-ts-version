import { Router } from "express";
import { body } from "express-validator";

// Controller
import controller from "../controller";

const router = Router();

// ==============================================================================================================================
// Get requests

router.get("/get-requests", controller.getRequests);
// ==============================================================================================================================

// ==============================================================================================================================
// Post requests

router.post(
  "/send-request",
  // Validating request body
  body("uid").isUUID(),
  body("request").isString(),
  controller.saveRequest
);
// ==============================================================================================================================

export default router;
