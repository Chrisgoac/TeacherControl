'use client';

import React, { useState } from 'react';

type Student = {
  id: number;
  name: string;
  course: string;
  pricePerHour: number;
};

export default function ClassForm({ students }: { students: Student[] }) {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/classes', {
      method: 'POST',
      body: JSON.stringify({
        studentId: Number(selectedStudent),
        date,
        time,
      }),
    });

    setDate('');
    setTime('');
    setSelectedStudent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} required>
        <option value="">Selecciona un alumno</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} - {s.course}
          </option>
        ))}
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <button type="submit">Añadir Clase</button>
    </form>
  );
}
