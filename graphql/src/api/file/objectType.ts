import { objectType } from "@nexus/schema";

const fileObjectType = objectType({
  name: "File",
  definition(t) {
    t.model.id();
    t.model.url();
    t.model.name();
    t.model.status();
    t.model.task();
  },
});

export { fileObjectType };
