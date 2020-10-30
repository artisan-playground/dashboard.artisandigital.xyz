import { objectType } from "@nexus/schema";

const userObjectType = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.name();
    t.model.image();
    t.model.position();
    t.model.department();
    t.model.type();
    t.model.skills();
    t.model.contacts();
    t.model.projects();
    t.model.tasks();
    t.model.startDate();
    t.model.dueDate();
  },
});

export { userObjectType };
