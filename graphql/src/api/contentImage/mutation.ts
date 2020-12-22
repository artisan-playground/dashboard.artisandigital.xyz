import { arg, extendType, intArg } from '@nexus/schema'
import { upload } from '../../services/storage'

const uploadContentImage = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('uploadContentImage', {
      type: 'ContentImage',
      args: {
        contentImage: arg({
          type: 'Upload',
          required: true,
        }),
      },
      resolve: async (_, { contentImage }, ctx) => {
        try {
          const data = await upload(await contentImage)
          return ctx.prisma.contentImage.create({ data })
        } catch (e) {
          //
        }
      },
    })
  },
})

const updateContentImage = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateContentImage', {
      type: 'ContentImage',
      args: {
        id: intArg({ required: true }),
        contentImage: arg({
          type: 'Upload',
          required: true,
        }),
      },
      resolve: async (_, { contentImage, id }, ctx) => {
        try {
          const data = await upload(await contentImage)
          return ctx.prisma.contentImage.update({ where: { id }, data })
        } catch (e) {
          //
        }
      },
    })
  },
})

export { uploadContentImage, updateContentImage }
