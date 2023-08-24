import { Types } from 'mongoose';

declare global {
  type StringId = string | Types.ObjectId;
}
