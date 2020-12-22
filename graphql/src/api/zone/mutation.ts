import { extendType } from "@nexus/schema";

const zoneMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneZone();
    t.crud.deleteOneZone();
    t.crud.updateOneZone();
  },
});

export { zoneMutation };
