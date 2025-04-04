import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const dateParam = req.nextUrl.searchParams.get('date');
  if (!dateParam) return new Response('Missing date', { status: 400 });

  // Convertir la fecha a UTC a las 00:00:00
  const startDate = new Date(Date.UTC(
    parseInt(dateParam.split('-')[0]), // Año
    parseInt(dateParam.split('-')[1]) - 1, // Mes (0-based en JS)
    parseInt(dateParam.split('-')[2]), // Día
    0, 0, 0, 0 // Hora, minuto, segundo, milisegundo a 0
  ));

  // Calcular el final del día, a las 23:59:59.999 (fin del día)
  const endDate = new Date(startDate);
  endDate.setUTCDate(startDate.getUTCDate()); // Un día más
  endDate.setUTCHours(23, 59, 59, 999); // Ajustamos la hora al final del día

  console.log({ startDate, endDate });

  const classes = await prisma.class.findMany({
    where: {
      date: {
        gte: startDate,  // Desde las 00:00:00
        lt: endDate,     // Hasta las 23:59:59.999
      },
    },
    include: {
      student: true,
    },
  });

  console.log({ startDate, endDate, count: classes.length });
  return new Response(JSON.stringify(classes));
}

export async function POST(req: Request) {
  const { date, time, studentId } = await req.json();

  // Desglosar la fecha y hora recibida
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);

  // Crear la fecha en UTC
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0, 0));  // Restamos 1 al mes porque en JS el mes es 0-based

  const newClass = await prisma.class.create({
    data: {
      date: utcDate, // Almacenamos la fecha en UTC
      time,
      student: {
        connect: {
          id: studentId,
        },
      },
      done: false,
      paid: false,
    },
  });

  return new Response(JSON.stringify(newClass), { status: 201 });
}
