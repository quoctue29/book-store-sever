import * as lodash from 'lodash';

declare global {
  const _: lodash.LoDashStatic;
}
(global as any)._ = lodash;
