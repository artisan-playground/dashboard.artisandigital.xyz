import { arg, extendType, intArg } from "@nexus/schema";
import path from "path";
import shortid from "shortid";

const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: path.join(__dirname, "../../../sa-key.json"),
  projectId: "artisan-playground",
});

const bucketName = "dashboard.artisandigital.tech";

const uploadFile = extendType({
  type: "Mutation",
  definition: (t) => {
    t.crud.createOneFile();
    t.crud.deleteOneFile();
    t.field("uploadFile", {
      type: "File",
      args: {
        file: arg({
          type: "Upload",
          required: true,
        }),
        taskId: arg({ type: "TaskCreateOneWithoutFilesInput", required: true }),
      },
      resolve: async (_, { file, taskId }, ctx) => {
        const { filename, mimetype, createReadStream } = await file;
        const id = shortid.generate();
        const generateFile: string = `${id}-${filename}`;

        await new Promise((resolve, reject) => {
          createReadStream().pipe(
            storage
              .bucket(bucketName)
              .file(generateFile)
              .createWriteStream()
              .on("finish", () => {
                storage
                  .bucket(bucketName)
                  .file(generateFile)
                  .makePublic()
                  .then(() => {
                    const data = {
                      fileName: generateFile,
                      fullPath: `https://storage.googleapis.com/${bucketName}/${generateFile}`,
                      path: `./${generateFile}`,
                      endpoint: `https://storage.googleapis.com`,
                      extension: mimetype,
                      task: taskId,
                    };

                    resolve(ctx.prisma.file.create({ data: data }));
                  })
                  .catch((e) => {
                    reject((e) => console.log(`exec error : ${e}`));
                  });
              })
          );
        });
      },
    });
  },
});

const updateFile = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateFile", {
      type: "File",
      args: {
        id: intArg({ required: true }),
        file: arg({
          type: "Upload",
          required: true,
        }),
      },
      resolve: async (_, { file, id }, ctx) => {
        const { filename, mimetype, createReadStream } = await file;
        const generateId = shortid.generate();
        const generateFile: string = `${generateId}-${filename}`;

        await new Promise((resolve, reject) => {
          createReadStream().pipe(
            storage
              .bucket(bucketName)
              .file(generateFile)
              .createWriteStream()
              .on("finish", () => {
                storage
                  .bucket(bucketName)
                  .file(generateFile)
                  .makePublic()
                  .then(() => {
                    const data = {
                      fileName: generateFile,
                      fullPath: `https://storage.googleapis.com/${bucketName}/${generateFile}`,
                      path: `./${generateFile}`,
                      endpoint: `https://storage.googleapis.com`,
                      extension: mimetype,
                    };

                    resolve(
                      ctx.prisma.file.update({ where: { id: id }, data: data })
                    );
                  })
                  .catch((e) => {
                    reject((e) => console.log(`exec error : ${e}`));
                  });
              })
          );
        });
      },
    });
  },
});

export { uploadFile, updateFile };
