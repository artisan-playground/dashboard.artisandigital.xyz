import { extendType, intArg } from "@nexus/schema";

const zoneQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getZoneById", {
      type: "Zone",
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.zone.findOne({ where: { id: args.id } });
      },
    });

    t.crud.zones({
      type: "Zone",
      resolve: (_, args, ctx) => {
        return ctx.prisma.zone.findMany();
      },
    });
  },
});

export { zoneQuery };
