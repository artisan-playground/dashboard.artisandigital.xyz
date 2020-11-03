import { extendType, intArg } from "@nexus/schema";

const projectQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("project", {
      type: "Project",
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.project.findOne({ where: { id: args.id } });
      },
    });

    t.crud.projects({
      type: "Project",
      resolve: (_, args, ctx) => {
        return ctx.prisma.project.findMany();
      },
    });
  },
});

export { projectQuery };
