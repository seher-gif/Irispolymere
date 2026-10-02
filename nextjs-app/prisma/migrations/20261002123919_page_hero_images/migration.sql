-- CreateTable
CREATE TABLE "PageHeroImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PageHeroImage_slug_key" ON "PageHeroImage"("slug");
