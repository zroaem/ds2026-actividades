export class UnauthorizedError extends Error {
  status = 401;
  constructor(msg = "Credenciales inválidas") {
    super(msg);
  }
}

export class ForbiddenError extends Error {
  status = 403;
  constructor(msg = "No tenés permiso para esta operación") {
    super(msg);
  }
}