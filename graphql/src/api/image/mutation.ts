import { arg, extendType, intArg } from '@nexus/schema'
import { upload } from '../../services/storage'

const uploadImage = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('uploadImage', {
      type: 'Image',
      args: {
        image: arg({
          type: 'Upload',
          required: true,
        }),
      },
      resolve: async (_, { image }, ctx) => {
        try {
          const data = await upload(await image)
          return ctx.prisma.image.create({ data })
        } catch (e) {
          //
        }
      },
    })
  },
})

const updateImage = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateImage', {
      type: 'Image',
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
          return ctx.prisma.image.update({ where: { id }, data })
        } catch (e) {
          //
        }
      },
    })
  },
})

export { uploadImage, updateImage }
