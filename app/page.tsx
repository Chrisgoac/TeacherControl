"use client"

import React, { useEffect, useState } from 'react';
import StudentForm from '@/components/StudentForm';
import CalendarView from '@/components/CalendarView';
import ClassForm from '@/components/ClassForm';
import ButtonComponent from '@/components/ButtonComponent';

export default function HomePage() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const response = await fetch('/api/students');
    const data = await response.json();
    setStudents(data);
  };

  const [hideStudentForm, setHideStudentForm] = useState(true)
  const [hideClassForm, setHideClassForm] = useState(true)

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Gestión de Clases</h1>

      <ButtonComponent setHide={setHideStudentForm} value={hideStudentForm} name="Show 'Añadir alumno'"></ButtonComponent> <br />
      <ButtonComponent setHide={setHideClassForm} value={hideClassForm} name="Show 'Añadir clase'"></ButtonComponent>


      <div hidden={hideStudentForm}>
        <h2 className="text-xl font-semibold">Añadir alumno</h2>
        <StudentForm onStudentAdded={fetchStudents} />
      </div>

      <div hidden={hideClassForm}>
        <h2 className="text-xl font-semibold">Añadir clase</h2>
        <ClassForm students={students} />
      </div>

      <div className="p-8 space-y-8">
        <h1 className="text-2xl font-bold">Gestor de clases</h1>
        <CalendarView />
      </div>
    </div>
  );
}
