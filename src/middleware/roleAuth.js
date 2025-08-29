export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({
        msg: "Akses ditolak!",
      });
    }
    next();
  };
};
