import StudentForm from '@/components/StudentForm';
import CalendarView from '@/components/CalendarView';
import ClassForm from '@/components/ClassForm';
import { prisma } from '@/lib/prisma';
import React from 'react';

export default async function HomePage() {
  const students = await prisma.student.findMany();

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Gestión de Clases</h1>

      <div>
        <h2 className="text-xl font-semibold">Añadir Alumno</h2>
        <StudentForm />
      </div>

      <div>
        <h2 className="text-xl font-semibold">Añadir Clase</h2>
        <ClassForm students={students} />
      </div>

      <div className="p-8 space-y-8">
        <h1 className="text-2xl font-bold">Gestor de Clases</h1>
        <CalendarView />
      </div>
    </div>
  );
}



