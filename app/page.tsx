"use client"

import React, { useEffect, useState } from 'react';
import StudentForm from '@/components/StudentForm';
import CalendarView from '@/components/CalendarView';
import ClassForm from '@/components/ClassForm';

export default function HomePage() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const response = await fetch('/api/students');
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Gestión de Clases</h1>

      <div>
        <h2 className="text-xl font-semibold">Añadir Alumno</h2>
        <StudentForm onStudentAdded={fetchStudents} />
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
