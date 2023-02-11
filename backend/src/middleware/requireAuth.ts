const jwt = require('jsonwebtoken');
import User from '../models/userModel';
import type { Request, Response, NextFunction } from 'express';

interface RequestUser extends Request {
  user: any;
}

const requireAuth = async (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  // verifiy user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (error: any) {
    res.status(401).json({
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

module.exports = requireAuth;
