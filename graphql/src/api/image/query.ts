import { extendType, intArg } from "@nexus/schema";

const imageQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getImageById", {
      type: "Image",
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.image.findOne({ where: { id: args.id } });
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
