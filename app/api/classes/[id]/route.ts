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
  { params }: { params: Record<string, string> } // Ajusta el tipo correctamente
) {
  const { id } = params; // Obtén `id` de forma correcta desde `params`
  await prisma.class.delete({
    where: { id: Number(id) },
  });

  return new Response(null, { status: 204 });
}

