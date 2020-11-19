import { arg, extendType, intArg } from '@nexus/schema'
import { upload, uploadFile } from '../../services/storage'

const uploadFile = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneFile()
    t.crud.deleteOneFile()

    t.field('uploadFile', {
      type: 'File',
      args: {
        taskId: arg({ type: 'TaskCreateOneWithoutFilesInput', required: true }),
        file: arg({
          type: 'Upload',
          required: true,
        }),
      },
      resolve: async (_, { file, taskId }, ctx) => {
        try {
          const data = await uploadFile(await file, taskId)
          return ctx.prisma.file.create({ data })
        } catch (e) {
          //
        }
      },
    })
  },
})

const updateFile = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateFile', {
      type: 'File',
      args: {
        id: intArg({ required: true }),
        file: arg({
          type: 'Upload',
          required: true,
        }),
      },
      resolve: async (_, { file, id }, ctx) => {
        try {
          const data = await upload(await file)
          return ctx.prisma.file.update({ where: { id }, data })
        } catch (e) {
          //
        }
      },
    })
  },
})

export { uploadFile, updateFile }
