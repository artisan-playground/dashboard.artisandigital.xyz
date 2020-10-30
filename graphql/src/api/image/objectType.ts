import { objectType } from "@nexus/schema";

const imageObjectType = objectType({
  name: "Image",
  definition(t) {
    t.model.id();
    t.model.endpoint();
    t.model.path();
    t.model.fullPath();
    t.model.fileName();
    t.model.extension();
  },
});

export { imageObjectType };
