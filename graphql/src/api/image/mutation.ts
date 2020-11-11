import { arg, extendType, intArg, scalarType } from "@nexus/schema";
import { GraphQLUpload } from "apollo-server-core";
import AWS from "aws-sdk";
import fs, { createWriteStream } from "fs";
import { ReadStream } from "fs-capacitor";
import { FileUpload } from "graphql-upload";
import path from "path";
import shortid from "shortid";

require("dotenv").config();

export type UploadRoot = FileUpload;
scalarType({
  ...GraphQLUpload!,
  rootTyping: "UploadRoot",
});
const FILE_ENDPOINT = process.env.FILE_ENDPOINT!;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID!;
const SECRETE_ACCESS_KEY = process.env.SECRETE_ACCESS_KEY!;
const BUCKET = process.env.BUCKET!;
const REGION = process.env.REGION!;
const s3 = new AWS.S3({
  endpoint: FILE_ENDPOINT,
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRETE_ACCESS_KEY,
  region: REGION,
});

const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: path.join(__dirname, "../../../sa-key.json"),
  projectId: "artisan-playground",
});

const imageBucket = storage.bucket("upload");
const bucketName = "dashboard.artisandigital.tech";

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
        const { generateFile, mimetype } = await processUpload(image);
        const params = {
          Bucket: bucketName,
          Key: `upload/${generateFile}`,
          Body: fs.createReadStream(path.resolve(`./upload/${generateFile}`)),
          ACL: "public-read",
        };
        await s3.putObject(params, function (err: any, data: any) {
          if (err) console.log(err, err.stack);
          else console.log(data);
        });
        fs.unlinkSync(path.resolve(`./upload/${generateFile}`));

        const data = {
          filename: generateFile,
          fullPath: `https://storage.googleapis.com/${bucketName}/upload/${generateFile}`,
          path: `./upload/${generateFile}`,
          endpoint: `https://storage.googleapis.com`,
          extension: mimetype,
        };
        return await ctx.prisma.image.create({ data: data });
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
        const { generateFile, mimetype } = await processUpload(image);
        const params = {
          Bucket: bucketName,
          Key: `${generateFile}`,
          Body: fs.createReadStream(path.resolve(`./upload/${generateFile}`)),
          ACL: "public-read",
        };
        await s3.putObject(params, function (err: any, data: any) {
          if (err) console.log(err, err.stack);
          else console.log(data);
        });
        fs.unlinkSync(path.resolve(`./upload/${generateFile}`));

        const data = {
          filename: generateFile,
          fullPath: `https://storage.googleapis.com/${bucketName}/upload/${generateFile}`,
          path: `./upload/${generateFile}`,
          endpoint: `https://storage.googleapis.com`,
          extension: mimetype,
        };
        return await ctx.prisma.image.update({ where: { id: id }, data: data });
      },
    });
  },
});

const processUpload = async (upload: FileUpload): Promise<any> => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream: ReadStream = createReadStream();
  const id = shortid.generate();
  const generateFile: string = `${id}-${filename}`;
  const path = `./upload/${generateFile}`;
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ generateFile, mimetype }))
      .on("error", reject)
  );
};

export { uploadImage, updateImage };
