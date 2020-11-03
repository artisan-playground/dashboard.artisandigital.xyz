import { objectType } from "@nexus/schema";

const projectImageObjectType = objectType({
  name: "ProjectImage",
  definition(t) {
    t.model.id();
    t.model.endpoint();
    t.model.path();
    t.model.fullPath();
    t.model.fileName();
    t.model.extension();
  },
});

export { projectImageObjectType };
