-- CreateTable
CREATE TABLE "CustomCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT,
    "titleFr" TEXT,
    "descEn" TEXT NOT NULL,
    "descAr" TEXT,
    "descFr" TEXT,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomCategory_slug_key" ON "CustomCategory"("slug");
