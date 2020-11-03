import { extendType, intArg } from "@nexus/schema";

const projectImageQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getProjectImageById", {
      type: "ProjectImage",
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.projectImage.findOne({ where: { id: args.id } });
      },
    });

    t.crud.images({
      type: "ProjectImage",
      resolve: (_, args, ctx) => {
        return ctx.prisma.projectImage.findMany();
      },
    });
  },
});

export { projectImageQuery };
