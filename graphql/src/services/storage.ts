import { Storage } from '@google-cloud/storage'
import fs from 'fs'
import path from 'path'
import shortid from 'shortid'

export const bucketName = 'dashboard.artisandigital.tech'

const projectId = 'artisan-playground'
const keyFilename = path.join(__dirname, '../../sa-key.json')
export const storage = fs.existsSync(keyFilename)
  ? new Storage({ projectId, keyFilename })
  : new Storage({ projectId })

export const sanitize = (name: string) => name.replace(/\s+/g, '')

export function upload(file: any) {
  try {
    const fileName = sanitize(`${shortid.generate()}-${file.filename}`)
    return new Promise((resolve, reject) => {
      file.createReadStream().pipe(
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
                  extension: file.mimetype,
                }

                resolve(data)
              })
              .catch((e) => {
                reject((e) => console.log(`exec error : ${e}`))
              })
          })
      )
    })
  } catch (e) {
    console.log('upload error: ', e)
  }
}
