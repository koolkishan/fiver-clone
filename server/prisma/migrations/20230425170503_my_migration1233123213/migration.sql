/*
  Warnings:

  - A unique constraint covering the columns `[paymentIntent]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Orders_paymentIntent_key" ON "Orders"("paymentIntent");
