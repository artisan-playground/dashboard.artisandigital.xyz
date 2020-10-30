import { extendType } from "@nexus/schema";

const projectQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.project({
      type: "Project",
      resolve: (_, args, ctx) => {
        return ctx.prisma.project.findOne({ where: { id: args.where.id } });
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
