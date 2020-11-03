import { extendType, intArg, stringArg } from "@nexus/schema";

const userQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("user", {
      type: "User",
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.user.findOne({ where: { id: args.id } });
      },
    });

    t.field("getUserByEmail", {
      type: "User",
      args: { email: stringArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.user.findOne({ where: { email: args.email } });
      },
    });

    t.crud.users({
      type: "User",
      resolve: (_, args, ctx) => {
        return ctx.prisma.user.findMany();
      },
    });
  },
});

export { userQuery };
