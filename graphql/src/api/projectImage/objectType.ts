import { objectType } from "@nexus/schema";

const projectImageObjectType = objectType({
  name: "ProjectImage",
  definition(t) {
    t.model.id();
    t.model.filename();
    t.model.mimetype();
    t.model.encoding();
  },
});

export { projectImageObjectType };
