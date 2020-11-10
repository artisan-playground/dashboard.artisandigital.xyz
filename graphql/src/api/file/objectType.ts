import { objectType } from "@nexus/schema";

const fileObjectType = objectType({
  name: "File",
  definition(t) {
    t.model.id();
    t.model.filename();
    t.model.mimetype();
    t.model.encoding();
    t.model.task();
  },
});

export { fileObjectType };
