-- CreateTable
CREATE TABLE "Gigs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "deliveryTime" INTEGER NOT NULL,
    "revisions" INTEGER NOT NULL,
    "features" TEXT[],
    "price" INTEGER NOT NULL,
    "images" TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Gigs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Gigs" ADD CONSTRAINT "Gigs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
