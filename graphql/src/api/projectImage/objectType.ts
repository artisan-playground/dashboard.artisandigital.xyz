import { objectType } from "@nexus/schema";

const projectImageObjectType = objectType({
  name: "ProjectImage",
  definition(t) {
    t.model.id();
    t.model.fileName();
    t.model.fullPath();
    t.model.path();
    t.model.extension();
    t.model.endpoint();
  },
});

export { projectImageObjectType };
