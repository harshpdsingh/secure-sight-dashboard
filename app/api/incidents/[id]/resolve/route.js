import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function PATCH(req, { params }) {
  const { id } = params

  const updated = await prisma.incident.update({
    where: { id: Number(id) },
    data: { resolved: true },
  })

  return Response.json(updated)
}
