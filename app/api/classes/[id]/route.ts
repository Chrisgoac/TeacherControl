import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { params } = context; // Desestructuras params de context
  const data = await req.json();
  
  const updated = await prisma.class.update({
    where: { id: Number(params.id) },
    data,
  });

  return new Response(JSON.stringify(updated));
}


export async function DELETE(
  req: Request,
  context: { params: { id: string } } // Específico para Next.js App Router
) {
  const { id } = context.params; // Obtén `id` del contexto
  await prisma.class.delete({
    where: { id: Number(id) },
  });

  return new Response(null, { status: 204 });
}

