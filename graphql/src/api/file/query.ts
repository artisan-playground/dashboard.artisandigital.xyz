import { extendType } from "@nexus/schema";

const fileQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.file({
      type: "File",
      resolve: (_, args, ctx) => {
        return ctx.prisma.file.findOne({ where: { id: args.where.id } });
      },
    });
    t.crud.files({
      type: "File",
      resolve: (_, args, ctx) => {
        return ctx.prisma.file.findMany();
      },
    });
  },
});

export { fileQuery };
