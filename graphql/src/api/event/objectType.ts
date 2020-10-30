import { objectType } from "@nexus/schema";

const eventObjectType = objectType({
  name: "Event",
  definition(t) {
    t.model.id();
    t.model.eventName();
    t.model.eventDate();
    t.model.endDate();
    t.model.note();
    t.model.tag();
    t.model.invited();
  },
});

export { eventObjectType };
