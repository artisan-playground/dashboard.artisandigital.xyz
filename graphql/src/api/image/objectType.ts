import { objectType } from "@nexus/schema";

const imageObjectType = objectType({
  name: "Image",
  definition(t) {
    t.model.id();
    t.model.filename();
    t.model.mimetype();
    t.model.encoding();
  },
});

export { imageObjectType };
