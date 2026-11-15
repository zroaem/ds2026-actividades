import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  usuarioCreateSchema,
  usuarioUpdateSchema,
} from "../validations/usuario.validation";
import { idParamSchema } from "../validations/libro.validation";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  usuarioController.getAll
);

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  usuarioController.getById
);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(usuarioCreateSchema),
  usuarioController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  validate(usuarioUpdateSchema),
  usuarioController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  usuarioController.remove
);

export default router;