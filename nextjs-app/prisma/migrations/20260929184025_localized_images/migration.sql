/*
  Warnings:

  - You are about to drop the column `altText` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `Post` table. All the data in the column will be lost.
  - Added the required column `urlEn` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "CorporateHeroImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "urlEn" TEXT NOT NULL,
    "urlFr" TEXT,
    "urlAr" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Banner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "urlEn" TEXT NOT NULL,
    "urlFr" TEXT,
    "urlAr" TEXT,
    "altTextEn" TEXT,
    "altTextFr" TEXT,
    "altTextAr" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Banner" ("createdAt", "id", "order") SELECT "createdAt", "id", "order" FROM "Banner";
DROP TABLE "Banner";
ALTER TABLE "new_Banner" RENAME TO "Banner";
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT,
    "titleEn" TEXT NOT NULL,
    "titleFr" TEXT,
    "titleAr" TEXT,
    "excerptEn" TEXT NOT NULL,
    "excerptFr" TEXT,
    "excerptAr" TEXT,
    "bodyEn" TEXT NOT NULL,
    "bodyFr" TEXT,
    "bodyAr" TEXT,
    "coverImageEn" TEXT,
    "coverImageFr" TEXT,
    "coverImageAr" TEXT,
    "metaTitleEn" TEXT,
    "metaTitleFr" TEXT,
    "metaTitleAr" TEXT,
    "metaDescriptionEn" TEXT,
    "metaDescriptionFr" TEXT,
    "metaDescriptionAr" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("bodyAr", "bodyEn", "bodyFr", "categoryId", "createdAt", "excerptAr", "excerptEn", "excerptFr", "id", "metaDescriptionAr", "metaDescriptionEn", "metaDescriptionFr", "metaTitleAr", "metaTitleEn", "metaTitleFr", "published", "publishedAt", "slug", "titleAr", "titleEn", "titleFr", "updatedAt") SELECT "bodyAr", "bodyEn", "bodyFr", "categoryId", "createdAt", "excerptAr", "excerptEn", "excerptFr", "id", "metaDescriptionAr", "metaDescriptionEn", "metaDescriptionFr", "metaTitleAr", "metaTitleEn", "metaTitleFr", "published", "publishedAt", "slug", "titleAr", "titleEn", "titleFr", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "CorporateHeroImage_slug_key" ON "CorporateHeroImage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImage_slug_key" ON "ProductImage"("slug");
