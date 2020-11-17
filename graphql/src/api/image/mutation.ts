import { arg, extendType, intArg } from "@nexus/schema";
import path from "path";
import shortid from "shortid";

const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: path.join(__dirname, "../../../sa-key.json"),
  projectId: "artisan-playground",
});

const bucketName = "dashboard.artisandigital.tech";

const removeWhiteSpaces = (name) => {
  let newName = name.replace(/\s+/g, "");
  return newName;
};

const uploadImage = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("uploadImage", {
      type: "Image",
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
        let sanitizedName = removeWhiteSpaces(generateFile);

        await new Promise((resolve, reject) => {
          createReadStream().pipe(
            storage
              .bucket(bucketName)
              .file(sanitizedName)
              .createWriteStream()
              .on("finish", () => {
                storage
                  .bucket(bucketName)
                  .file(sanitizedName)
                  .makePublic()
                  .then(() => {
                    const data = {
                      fileName: sanitizedName,
                      fullPath: `https://storage.googleapis.com/${bucketName}/${sanitizedName}`,
                      path: `./${sanitizedName}`,
                      endpoint: `https://storage.googleapis.com`,
                      extension: mimetype,
                    };

                    resolve(ctx.prisma.image.create({ data: data }));
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

const updateImage = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateImage", {
      type: "Image",
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
        let sanitizedName = removeWhiteSpaces(generateFile);

        await new Promise((resolve, reject) => {
          createReadStream().pipe(
            storage
              .bucket(bucketName)
              .file(sanitizedName)
              .createWriteStream()
              .on("finish", () => {
                storage
                  .bucket(bucketName)
                  .file(sanitizedName)
                  .makePublic()
                  .then(() => {
                    const data = {
                      fileName: sanitizedName,
                      fullPath: `https://storage.googleapis.com/${bucketName}/${sanitizedName}`,
                      path: `./${sanitizedName}`,
                      endpoint: `https://storage.googleapis.com`,
                      extension: mimetype,
                    };

                    resolve(
                      ctx.prisma.image.update({ where: { id: id }, data: data })
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

export { uploadImage, updateImage };
