import { objectType } from "@nexus/schema";

const fileObjectType = objectType({
  name: "File",
  definition(t) {
    t.model.id();
    t.model.endpoint();
    t.model.path();
    t.model.fullPath();
    t.model.fileName();
    t.model.extension();
    t.model.task();
  },
});

export { fileObjectType };
