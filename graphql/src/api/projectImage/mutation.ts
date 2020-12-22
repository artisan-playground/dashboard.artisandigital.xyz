import { arg, extendType, intArg } from '@nexus/schema'
import { upload } from '../../services/storage'

const uploadProjectImage = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('uploadProjectImage', {
      type: 'ProjectImage',
      args: {
        projectImage: arg({
          type: 'Upload',
          required: true,
        }),
      },
      resolve: async (_, { projectImage }, ctx) => {
        try {
          const data = await upload(await projectImage)
          return ctx.prisma.projectImage.create({ data })
        } catch (e) {
          //
        }
      },
    })
  },
})

const updateProjectImage = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateProjectImage', {
      type: 'ProjectImage',
      args: {
        id: intArg({ required: true }),
        projectImage: arg({
          type: 'Upload',
          required: true,
        }),
      },
      resolve: async (_, { projectImage, id }, ctx) => {
        try {
          const data = await upload(await projectImage)
          return ctx.prisma.projectImage.update({ where: { id }, data })
        } catch (e) {
          //
        }
      },
    })
  },
})

export { uploadProjectImage, updateProjectImage }
