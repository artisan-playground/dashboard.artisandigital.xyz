import { arg, extendType, intArg } from "@nexus/schema";
import path from "path";
import shortid from "shortid";

const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: path.join(__dirname, "../../../sa-key.json"),
  projectId: "artisan-playground",
});

const bucketName = "dashboard.artisandigital.tech";

const uploadProjectImage = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("uploadProjectImage", {
      type: "ProjectImage",
      args: {
        image: arg({
          type: "Upload",
          required: true,
        }),
      },
      resolve: async (_, { image }, ctx) => {
        const { filename, mimetype, createReadStream } = await image;
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
                    };

                    resolve(ctx.prisma.projectImage.create({ data: data }));
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

const updateProjectImage = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateProjectImage", {
      type: "ProjectImage",
      args: {
        id: intArg({ required: true }),
        image: arg({
          type: "Upload",
          required: true,
        }),
      },
      resolve: async (_, { image, id }, ctx) => {
        const { filename, mimetype, createReadStream } = await image;
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
                      ctx.prisma.projectImage.update({
                        where: { id: id },
                        data: data,
                      })
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

export { uploadProjectImage, updateProjectImage };
