import { Request } from 'express';
import { Role } from '@velocity/database';

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    username: string;
    role: Role;
  };
}
