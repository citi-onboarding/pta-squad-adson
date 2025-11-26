-- CreateTable
CREATE TABLE "Consultation" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "doctorName" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "idPatient" INTEGER NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_idPatient_fkey" FOREIGN KEY ("idPatient") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
