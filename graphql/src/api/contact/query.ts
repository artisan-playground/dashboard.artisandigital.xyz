import { extendType, intArg } from "@nexus/schema";

const contactQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getContactById", {
      type: "Contact",
      args: { id: intArg({ required: true }) },
      resolve: (_, args, ctx) => {
        return ctx.prisma.contact.findOne({ where: { id: args.id } });
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
