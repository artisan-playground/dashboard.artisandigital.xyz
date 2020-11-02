import { extendType, intArg } from "@nexus/schema";

const commentQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getCommentById", {
      type: "Comment",
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.comment.findOne({ where: { id: args.id } });
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
