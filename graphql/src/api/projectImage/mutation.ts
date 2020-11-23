import { arg, extendType, intArg } from '@nexus/schema'
import { upload } from '../../services/storage'

const uploadProjectImage = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('uploadProjectImage', {
      type: 'ProjectImage',
      args: {
        image: arg({
          type: 'Upload',
          required: true,
        }),
      },
      resolve: async (_, { image }, ctx) => {
        try {
          const data = await upload(await image)
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
        image: arg({
          type: 'Upload',
          required: true,
        }),
      },
      resolve: async (_, { image, id }, ctx) => {
        try {
          const data = await upload(await image)
          return ctx.prisma.projectImage.update({ where: { id }, data })
        } catch (e) {
          //
        }
      },
    })
  },
})

export { uploadProjectImage, updateProjectImage }
