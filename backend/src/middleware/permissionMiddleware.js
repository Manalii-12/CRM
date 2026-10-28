const checkPermission = (module, action) => {
  return (req, res, next) => {
    const permissions = req.user.permissions || [];

    const allowed = permissions.some(
      (p) => p.module === module && p.action === action
    );

    if (!allowed) {
      return res.status(403).json({
        message: "Access denied",
        required: `${module}:${action}`,
      });
    }

    next();
  };
};

export default checkPermission;
