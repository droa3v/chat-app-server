import { createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const ReqUser = createParamDecorator((data, ctx) => {
  return GqlExecutionContext.create(ctx).getContext().req.user;
});
