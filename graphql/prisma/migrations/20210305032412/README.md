# Migration `20210305032412`

This migration has been generated by Kullanan Thanachotnan at 3/5/2021, 10:24:12 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."clock-in" DROP CONSTRAINT "FK_671937e7cd75c119a91b8b40aa4"

ALTER TABLE "public"."request" DROP CONSTRAINT "FK_79311976fc74cffce78cfa0d31a"

ALTER TABLE "public"."Form" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "leaveDetail" DROP NOT NULL

DROP TABLE "public"."clock-in"

DROP TABLE "public"."clock-out"

DROP TABLE "public"."request"

DROP TABLE "public"."user"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210224084628..20210305032412
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
@@ -159,17 +159,17 @@
 }
 model Form {
   id          Int       @id @default(autoincrement())
-  firstName   String
-  lastName    String
-  email       String
-  phone       String
-  position    String
+  firstName   String?
+  lastName    String?
+  email       String?
+  phone       String?
+  position    String?
   leaveStart  DateTime?
   leaveEnd    DateTime?
   leaveType   String
-  leaveDetail String
+  leaveDetail String?
   createdAt   DateTime? @default(now())
 }
 enum Role {
```


