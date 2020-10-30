import { extendType } from "@nexus/schema";

const contactQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.contact({
      type: "Contact",
      resolve: (_, args, ctx) => {
        return ctx.prisma.contact.findOne({ where: { id: args.where.id } });
      },
    });
    t.crud.contacts({
      type: "Contact",
      resolve: (_, args, ctx) => {
        return ctx.prisma.contact.findMany();
      },
    });
  },
});

export { contactQuery };
