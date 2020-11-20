import { arg, extendType, intArg } from '@nexus/schema'
import shortid from 'shortid'
import { bucketName, sanitize, storage, upload } from '../../services/storage'

const uploadFile = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneFile()
    t.crud.deleteOneFile()

    t.field('uploadFile', {
      type: 'File',
      args: {
        file: arg({
          type: 'Upload',
          required: true,
        }),
        taskId: arg({ type: 'TaskCreateOneWithoutFilesInput', required: true }),
      },
      resolve: async (_, { file, taskId }, ctx) => {
        const { filename, mimetype, createReadStream } = await file
        const fileName = sanitize(`${shortid.generate()}-${filename}`)

        await new Promise((resolve, reject) => {
          createReadStream().pipe(
            storage
              .bucket(bucketName)
              .file(fileName)
              .createWriteStream()
              .on('finish', () => {
                storage
                  .bucket(bucketName)
                  .file(fileName)
                  .makePublic()
                  .then(() => {
                    const data = {
                      fileName: fileName,
                      fullPath: `https://storage.googleapis.com/${bucketName}/${fileName}`,
                      path: `./${fileName}`,
                      endpoint: `https://storage.googleapis.com`,
                      extension: mimetype,
                      task: taskId,
                    }

                    resolve(ctx.prisma.file.create({ data: data }))
                  })
                  .catch((e) => {
                    reject((e) => console.log(`exec error : ${e}`))
                  })
              })
          )
        })
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
