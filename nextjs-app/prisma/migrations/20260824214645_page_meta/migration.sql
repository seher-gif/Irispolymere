-- CreateTable
CREATE TABLE "PageMeta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "metaTitleEn" TEXT,
    "metaTitleFr" TEXT,
    "metaTitleAr" TEXT,
    "metaDescriptionEn" TEXT,
    "metaDescriptionFr" TEXT,
    "metaDescriptionAr" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PageMeta_key_key" ON "PageMeta"("key");
