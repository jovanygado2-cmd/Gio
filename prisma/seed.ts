import { DealStage, LeadStatus, Role, TaskStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "../lib/prisma";

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const owner = await prisma.user.upsert({
    where: { email: "owner@giocrm.com" },
    update: {},
    create: { name: "Owner User", email: "owner@giocrm.com", passwordHash, role: Role.OWNER }
  });

  const company = await prisma.company.create({
    data: { name: "BrightFlow Agency", domain: "brightflow.io", industry: "Marketing", size: "11-50" }
  });

  const contact = await prisma.contact.create({
    data: {
      firstName: "Maya",
      lastName: "Brooks",
      email: "maya@brightflow.io",
      phone: "+1-415-555-1090",
      title: "Marketing Director",
      companyId: company.id
    }
  });

  const lead = await prisma.lead.create({
    data: {
      name: "BrightFlow inbound lead",
      source: "Website",
      status: LeadStatus.QUALIFIED,
      email: contact.email,
      followUpAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      ownerId: owner.id,
      companyId: company.id,
      contactId: contact.id
    }
  });

  await prisma.deal.create({
    data: {
      name: "Retainer Upsell",
      amount: 6000,
      stage: DealStage.PROPOSAL,
      expectedClose: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      ownerId: owner.id,
      leadId: lead.id,
      companyId: company.id,
      contactId: contact.id
    }
  });

  await prisma.task.createMany({
    data: [
      {
        title: "Send proposal follow-up",
        dueAt: new Date(Date.now() + 1000 * 60 * 60 * 12),
        priority: "high",
        status: TaskStatus.OPEN,
        ownerId: owner.id,
        leadId: lead.id
      },
      {
        title: "Call to handle objections",
        dueAt: new Date(Date.now() + 1000 * 60 * 60 * 36),
        priority: "high",
        status: TaskStatus.OPEN,
        ownerId: owner.id,
        leadId: lead.id
      }
    ]
  });

  await prisma.note.create({ data: { body: "Prospect asked for ROI benchmarks before signing.", leadId: lead.id, contactId: contact.id } });
  await prisma.activity.create({ data: { message: "Seeded workspace with starter sales data", userId: owner.id } });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
