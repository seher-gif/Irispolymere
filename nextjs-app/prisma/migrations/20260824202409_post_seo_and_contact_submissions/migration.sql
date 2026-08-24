-- AlterTable
ALTER TABLE "Post" ADD COLUMN "metaDescriptionAr" TEXT;
ALTER TABLE "Post" ADD COLUMN "metaDescriptionEn" TEXT;
ALTER TABLE "Post" ADD COLUMN "metaDescriptionFr" TEXT;
ALTER TABLE "Post" ADD COLUMN "metaTitleAr" TEXT;
ALTER TABLE "Post" ADD COLUMN "metaTitleEn" TEXT;
ALTER TABLE "Post" ADD COLUMN "metaTitleFr" TEXT;

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "productInterest" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
