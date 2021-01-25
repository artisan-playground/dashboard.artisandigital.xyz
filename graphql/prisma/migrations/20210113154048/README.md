# Migration `20210113154048`

This migration has been generated by Kullanan Thanachotnan at 1/13/2021, 10:40:49 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."clock-in" DROP CONSTRAINT "FK_671937e7cd75c119a91b8b40aa4"

ALTER TABLE "public"."Zone" ALTER COLUMN "open" SET DEFAULT true

DROP TABLE "public"."clock-in"

DROP TABLE "public"."clock-out"

DROP TABLE "public"."request"

DROP TABLE "public"."user"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210113040503..20210113154048
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
@@ -113,9 +113,9 @@
   longitude String
   latitude  String
   timestamp DateTime?  @default(now())
   radius    String
-  open      Boolean?   @default(value: false)
+  open      Boolean?   @default(value: true)
 }
 model Content {
   id            Int             @id @default(autoincrement())
```

