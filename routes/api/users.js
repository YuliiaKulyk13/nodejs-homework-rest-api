const express = require("express");

const validateBody = require("../../middlewares/validateBody");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/users");
const authenticate = require("../../middlewares/authenticate");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  isValidId,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
