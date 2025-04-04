import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request) {
  try {
    const data = await req.json(); // Obtén el cuerpo de la solicitud

    const { id, ...updateData } = data.params; // Desestructuramos `id` y los datos a actualizar
    
    const updated = await prisma.class.update({
      where: { id: Number(id) }, // Convertimos `id` al tipo esperado (número)
      data: updateData, // Aplicamos la actualización con los datos recibidos
    });

    return NextResponse.json({ message: `Registro con ID: ${id} actualizado exitosamente.`, updated });
  } catch (error) {
    console.error('Error al actualizar:', error);
    return NextResponse.json({ error: 'No se pudo actualizar el registro.' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const data = await req.json();

    const {id} = data.params // Desestructuramos el parámetro dinámico `id`
    
    await prisma.class.delete({
      where: { id: Number(id) }, // Asegúrate de convertir `id` al tipo esperado (número)
    });

    return NextResponse.json({ message: `Registro con ID: ${id} eliminado exitosamente.` }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar:', error);
    return NextResponse.json({ error: 'No se pudo eliminar el registro.' }, { status: 500 });
  }
}


