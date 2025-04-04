'use client';

import React, { useState } from 'react';

interface StudentFormProps {
  onStudentAdded?: () => Promise<void>; // Prop opcional para manejar actualizaciones en el padre
}

export default function StudentForm({ onStudentAdded }: StudentFormProps) {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          course,
          pricePerHour: parseFloat(pricePerHour),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al añadir el estudiante');
      }

      const data = await response.json();
      console.log('Estudiante añadido:', data);

      // Limpiar los campos del formulario después de un envío exitoso
      setName('');
      setCourse('');
      setPricePerHour('');

      // Notificar al padre que se añadió un estudiante
      if (onStudentAdded) {
        await onStudentAdded();
      }
    } catch (error: any) {
      setError(error.message || 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        required
      />
      <input
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        placeholder="Curso"
        required
      />
      <input
        type="number"
        value={pricePerHour}
        onChange={(e) => setPricePerHour(e.target.value)}
        placeholder="€/h"
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Añadiendo...' : 'Añadir alumno'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
