import { applyDecorators, Controller, ControllerOptions } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export function PortalController({
  path,
  version = '1',
  ...others
}: ControllerOptions) {
  let apiTagsDecorator = ApiTags();
  if (_.isArray(path)) {
    apiTagsDecorator = ApiTags(...path);
  } else if (_.isString(path)) {
    apiTagsDecorator = ApiTags(path.toString());
  }
  return applyDecorators(
    Controller({ path, version, ...others }),
    ApiBearerAuth(),
    apiTagsDecorator,
  );
}
