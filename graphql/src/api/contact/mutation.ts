import { extendType } from "@nexus/schema";

const contactMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneContact();
    t.crud.deleteOneContact();
    t.crud.updateOneContact();
  },
});

export { contactMutation };
