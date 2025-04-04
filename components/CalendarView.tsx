"use client"

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (!selectedDate) return;
    const fetchClasses = async () => {
      // Crear una nueva instancia de Date basada en selectedDate
      const adjustedDate = new Date(selectedDate);
      // Sumar un día
      adjustedDate.setDate(adjustedDate.getDate() + 1);
  
      // Convertir la nueva fecha al formato YYYY-MM-DD
      const date = adjustedDate.toISOString().split('T')[0];
  
      const res = await fetch(`/api/classes?date=${date}`);
      const data = await res.json();
      setClasses(data);
    };
  
    fetchClasses();
  }, [selectedDate]);
  

  return (
    <div>
      <Calendar onChange={(value) => setSelectedDate(value as Date)} />
      {selectedDate && (
        <div className="mt-4">
          <h2>Clases para {selectedDate.toDateString()}</h2>
          <ul>
            {classes.map((c: any) => (
              <li key={c.id} className="border p-2 mb-2">
                {c.time} - {c.student.name} - Hecha: {c.done ? '✅' : '❌'} - Pagada: {c.paid ? '💸' : '❌'}
                <div className="space-x-2 mt-1">
                  <button onClick={() => toggleStatus(c.id, 'done', !c.done)}>Toggle Hecha</button>
                  <button onClick={() => toggleStatus(c.id, 'paid', !c.paid)}>Toggle Pagada</button>
                  <button onClick={() => deleteClass(c.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  async function toggleStatus(id: number, field: 'done' | 'paid', value: boolean) {
    await fetch(`/api/classes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ [field]: value }),
    });
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  async function deleteClass(id: number) {
    await fetch(`/api/classes/${id}`, {
      method: 'DELETE',
    });
    setClasses((prev) => prev.filter((c) => c.id !== id));
  }
}
