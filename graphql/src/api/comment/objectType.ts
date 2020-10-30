import { objectType } from "@nexus/schema";

const commentObjectType = objectType({
  name: "Comment",
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.task();
    t.model.timestamp();
    t.model.image();
    t.model.message();
  },
});

export { commentObjectType };
