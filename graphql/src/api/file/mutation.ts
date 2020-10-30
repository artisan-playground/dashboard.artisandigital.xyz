import { extendType } from "@nexus/schema";

const fileMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneFile();
    t.crud.deleteOneFile();
    t.crud.updateOneFile();
  },
});

export { fileMutation };
