import { objectType } from "@nexus/schema";

const imageObjectType = objectType({
  name: "Image",
  definition(t) {
    t.model.id();
    t.model.fileName();
    t.model.fullPath();
    t.model.path();
    t.model.extension();
    t.model.endpoint();
  },
});

export { imageObjectType };
