import { objectType } from "@nexus/schema";

const contactObjectType = objectType({
  name: "Contact",
  definition(t) {
    t.model.id();
    t.model.facebook();
    t.model.twitter();
    t.model.instagram();
    t.model.gitlab();
    t.model.github();
  },
});

export { contactObjectType };
