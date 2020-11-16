import { objectType } from "@nexus/schema";

const fileObjectType = objectType({
  name: "File",
  definition(t) {
    t.model.id();
    t.model.fileName();
    t.model.fullPath();
    t.model.path();
    t.model.extension();
    t.model.endpoint();
    t.model.task();
  },
});

export { fileObjectType };
