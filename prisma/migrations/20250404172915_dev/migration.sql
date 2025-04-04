-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "pricePerHour" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
