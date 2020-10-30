import { extendType } from "@nexus/schema";

const userQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.user({
      type: "User",
      resolve: (_, args, ctx) => {
        return ctx.prisma.user.findOne({ where: { id: args.where.id } });
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
