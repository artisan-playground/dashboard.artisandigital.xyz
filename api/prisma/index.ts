import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main()

async function main() {
  const users = [
    {
      email: 'test0@mail.com',
      name: 'John Doe',
      position: 'Developer',
    },
    {
      email: 'test1@mail.com',
      name: 'Jane Dee',
      position: 'Developer',
    },
  ]

  let results = []

  for (const user of users) {
    results.push(await db.user.create({ data: user }))
    // results.push(await db.user.findMany())
    // results.push(await db.user.updateMany({ where: { id: 1 }, data: user }))
    // results.push(await db.user.delete({ where: { id: 2 } }))
  }

  console.log('User: %j', results)

  db.disconnect()
}
