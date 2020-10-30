import { extendType } from "@nexus/schema";

const imageQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.image({
      type: "Image",
      resolve: (_, args, ctx) => {
        return ctx.prisma.image.findOne({ where: { id: args.where.id } });
      },
    });
    t.crud.images({
      type: "Image",
      resolve: (_, args, ctx) => {
        return ctx.prisma.image.findMany();
      },
    });
  },
});

export { imageQuery };
