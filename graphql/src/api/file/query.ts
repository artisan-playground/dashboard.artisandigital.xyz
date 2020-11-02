import { extendType, intArg } from "@nexus/schema";

const fileQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getFileById", {
      type: "File",
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.file.findOne({ where: { id: args.id } });
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
