import { extendType } from "@nexus/schema";

const userMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneUser();
    t.crud.deleteOneUser();
    t.crud.updateOneUser();
  },
});

export { userMutation };
