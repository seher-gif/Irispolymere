-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descFr" TEXT NOT NULL,
    "descAr" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_key_key" ON "Certificate"("key");
