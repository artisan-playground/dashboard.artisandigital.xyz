# Migration `20201222024442`

This migration has been generated by Kullanan Thanachotnan at 12/22/2020, 9:44:43 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Task" ADD COLUMN "taskType" text   
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201222024146..20201222024442
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model User {
   id            Int             @id @default(autoincrement())
@@ -48,8 +48,9 @@
   taskName   String?
   startTime  DateTime?    @default(now())
   endTime    DateTime?
   taskDetail String?
+  taskType   String?
   isDone     Boolean?     @default(value: false)
   members    User[]
   files      File[]
   comments   Comment[]
```

