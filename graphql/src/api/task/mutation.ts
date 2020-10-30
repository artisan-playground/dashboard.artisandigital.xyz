import { extendType } from "@nexus/schema";

const taskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneTask();
    t.crud.deleteOneTask();
    t.crud.updateOneTask();
  },
});

export { taskMutation };
