import { extendType } from "@nexus/schema";

const eventQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.event({
      type: "Event",
      resolve: (_, args, ctx) => {
        return ctx.prisma.event.findOne({ where: { id: args.where.id } });
      },
    });
    t.crud.events({
      type: "Event",
      resolve: (_, args, ctx) => {
        return ctx.prisma.event.findMany();
      },
    });
  },
});

export { eventQuery };
