import { extendType, intArg } from "@nexus/schema";

const eventQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getEventById", {
      type: "Event",
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.event.findOne({ where: { id: args.id } });
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
