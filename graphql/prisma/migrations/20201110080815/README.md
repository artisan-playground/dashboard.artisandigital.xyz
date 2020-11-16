# Migration `20201110080815`

This migration has been generated by Kullanan Thanachotnan at 11/10/2020, 3:08:15 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."File" DROP COLUMN "filename",
DROP COLUMN "mimetype",
DROP COLUMN "encoding",
ADD COLUMN "path" text   NOT NULL ,
ADD COLUMN "fileName" text   NOT NULL ,
ADD COLUMN "extension" text   NOT NULL 

ALTER TABLE "public"."Image" DROP COLUMN "filename",
DROP COLUMN "mimetype",
DROP COLUMN "encoding",
ADD COLUMN "endpoint" text   NOT NULL ,
ADD COLUMN "path" text   NOT NULL ,
ADD COLUMN "fullPath" text   NOT NULL ,
ADD COLUMN "fileName" text   NOT NULL ,
ADD COLUMN "extension" text   NOT NULL 

ALTER TABLE "public"."ProjectImage" DROP COLUMN "filename",
DROP COLUMN "mimetype",
DROP COLUMN "encoding",
ADD COLUMN "endpoint" text   NOT NULL ,
ADD COLUMN "path" text   NOT NULL ,
ADD COLUMN "fullPath" text   NOT NULL ,
ADD COLUMN "fileName" text   NOT NULL ,
ADD COLUMN "extension" text   NOT NULL 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201110065458..20201110080815
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
   id         Int             @id @default(autoincrement())
@@ -67,11 +67,11 @@
 model File {
   task      Task
   id        Int     @id @default(autoincrement())
-  filename  String
-  mimetype  String
-  encoding  String
+  path      String
+  fileName  String
+  extension String
 }
 model Comment {
   id        Int        @id @default(autoincrement())
@@ -97,18 +97,22 @@
 }
 model Image {
   id        Int     @id @default(autoincrement())
-  filename  String
-  mimetype  String
-  encoding  String
+  endpoint  String
+  path      String
+  fullPath  String
+  fileName  String
+  extension String
 }
 model ProjectImage {
   id        Int     @id @default(autoincrement())
-  filename  String
-  mimetype  String
-  encoding  String
+  endpoint  String
+  path      String
+  fullPath  String
+  fileName  String
+  extension String
 }
 enum Role {
   ADMIN
```

