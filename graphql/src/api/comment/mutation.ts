import { extendType } from "@nexus/schema";

const commentMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneComment();
    t.crud.deleteOneComment({
      type: "Comment",
      resolve: async (_, args, cdx) => {
        const id = args!.where!.id!;
        return await cdx.db.comment.delete({ where: { id: id } });
      },
    });
    t.crud.updateOneComment();
  },
});

export { commentMutation };
