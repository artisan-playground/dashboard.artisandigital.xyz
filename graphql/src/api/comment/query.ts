import { extendType } from "@nexus/schema";

const commentQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.comment({
      type: "Comment",
      resolve: (_, args, ctx) => {
        return ctx.prisma.comment.findOne({ where: { id: args.where.id } });
      },
    });
    t.crud.comments({
      type: "Comment",
      resolve: (_, args, ctx) => {
        return ctx.prisma.comment.findMany();
      },
    });
  },
});

export { commentQuery };
