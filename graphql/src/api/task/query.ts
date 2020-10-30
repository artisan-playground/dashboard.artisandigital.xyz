import { extendType } from "@nexus/schema";

const taskQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.task({
      type: "Task",
      resolve: (_, args, ctx) => {
        return ctx.prisma.task.findOne({ where: { id: args.where.id } });
      },
    });
    t.crud.tasks({
      type: "Task",
      resolve: (_, args, ctx) => {
        return ctx.prisma.task.findMany();
      },
    });
    t.list.field("getTaskByProjectId", {
      type: "Task",
      resolve: (_, args, ctx): any =>
        ctx.prisma.task.findMany({ where: { projectId: args.where.id } }),
    });
  },
});

export { taskQuery };
