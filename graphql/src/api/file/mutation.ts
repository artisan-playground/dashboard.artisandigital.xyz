import { arg, extendType, scalarType } from "@nexus/schema";
import { GraphQLUpload } from "apollo-server-core";
import AWS, { AWSError, S3 } from "aws-sdk";
import fs, { createWriteStream } from "fs";
import { ReadStream } from "fs-capacitor";
import { FileUpload } from "graphql-upload";
import path from "path";
import shortid from "shortid";

require("dotenv").config();

export type UploadFileRoot = FileUpload;
scalarType({
  ...GraphQLUpload!,
  rootTyping: "UploadFileRoot",
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
const uploadFileMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("uploadFile", {
      type: "File",
      args: {
        file: arg({
          type: "Upload",
          required: true,
        }),
      },
      resolve: async (_, { file }, ctx) => {
        const { generateFile, mimetype } = await processUpload(file);
        const params = {
          Bucket: BUCKET,
          Key: `upload/${generateFile}`,
          Body: fs.createReadStream(path.resolve(`./upload/${generateFile}`)),
          ACL: "public-read",
        };
        await s3.putObject(params, function (
          err: AWSError,
          data: S3.Types.PutObjectOutput
        ) {
          if (err) console.log(err, err.stack);
          else console.log(data);
        });
        fs.unlinkSync(path.resolve(`./upload/${generateFile}`));
        const data = {
          fileName: generateFile,
          path: `upload/${generateFile}`,
          extension: mimetype,
        };
        return await ctx.prisma.file.create({
          data: Object.assign(data),
        });
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

const fileMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.deleteOneFile();
    t.crud.updateOneFile();
  },
});

export { uploadFileMutation, fileMutation };
