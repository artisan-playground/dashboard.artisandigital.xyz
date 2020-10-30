import { extendType } from "@nexus/schema";

const projectMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneProject();
    t.crud.deleteOneProject();
    t.crud.updateOneProject();
  },
});

export { projectMutation };
