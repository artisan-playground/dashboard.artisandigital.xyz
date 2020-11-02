import { extendType, intArg } from "@nexus/schema";

const taskQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getTaskById", {
      type: "Task",
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.task.findOne({ where: { id: args.id } });
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
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx): any =>
        ctx.prisma.task.findMany({ where: { projectId: args.id } }),
    });
  },
});

export { taskQuery };
