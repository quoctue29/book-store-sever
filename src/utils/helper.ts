import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ServerMessage } from '@/common';

export const isValidObjectId = (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException(ServerMessage.INVALID_OBJECT_ID);
  }
};

export const getKeyEnum = (enumObject: Record<string, any>, value: any) => {
  const foundEntry = Object.entries(enumObject).find(
    ([, enumValue]) => enumValue === value,
  );
  return foundEntry ? foundEntry[0] : undefined;
};
