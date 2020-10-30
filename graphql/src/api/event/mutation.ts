import { extendType } from "@nexus/schema";

const eventMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneEvent();
    t.crud.deleteOneEvent();
    t.crud.updateOneEvent();
  },
});

export { eventMutation };
