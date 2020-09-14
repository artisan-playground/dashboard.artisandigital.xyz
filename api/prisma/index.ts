import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main()

async function main() {
  const users = [
    {
      email:"test0@mail.com",
      name:"John Doe",
      position:"Developer",
    },
    {
      email:"test1@mail.com",
      name:"Jane Dee",
      position:"Developer",
    },
  ]

  let results = []

  for (const user of users) {
    results.push(await db.user.create({ data: user }))
  }

  console.log('User: %j', results)

  db.disconnect()
}