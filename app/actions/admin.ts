"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendApprovalEmail } from "@/app/lib/email";

// --- Server Actions для категорий и логотипов ---
export async function addCategoryAction(formData: FormData) {
  const title = formData.get("title") as string;
  const direction = (formData.get("direction") as string) || "left";
  if (!title) return;
  
  const lastCat = await prisma.partnerCategory.findFirst({
    orderBy: { order: 'desc' }
  });
  const newOrder = lastCat ? lastCat.order + 1 : 0;

  await prisma.partnerCategory.create({
    data: { title, direction, order: newOrder }
  });
  revalidatePath("/res365/admin");
}

export async function deleteCategoryAction(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.partnerCategory.delete({ where: { id } });
  revalidatePath("/res365/admin");
}

export async function deleteLogoAction(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.partnerLogo.delete({ where: { id } });
  revalidatePath("/res365/admin");
}

export async function addLogoAction(categoryId: string, name: string, base64: string) {
  await prisma.partnerLogo.create({
    data: {
      name,
      imageUrl: base64,
      categoryId
    }
  });
  revalidatePath("/res365/admin");
}

// --- Server Actions для Ивентов ---
export async function toggleEventPublicAction(id: string, currentStatus: boolean) {
  await prisma.event.update({
    where: { id },
    data: { isPublic: !currentStatus }
  });
  revalidatePath("/res365/admin");
}

export async function deleteEventAction(id: string) {
  await prisma.event.delete({ where: { id } });
  revalidatePath("/res365/admin");
}

export async function updateEventFeaturedOrderAction(id: string, order: number | null) {
  // If an order is provided (1, 2, 3, 4), make sure to remove this order from any other event first to avoid duplicates
  if (order !== null) {
    await prisma.event.updateMany({
      where: { featuredOrder: order },
      data: { featuredOrder: null }
    });
  }
  await prisma.event.update({
    where: { id },
    data: { featuredOrder: order }
  });
  revalidatePath("/res365/admin");
}

// --- Server Actions для Заявок ---
export async function processContactRequestAction(id: string) {
  await prisma.contactRequest.update({
    where: { id },
    data: { status: "PROCESSED" }
  });
  revalidatePath("/res365/admin");
}

// --- Server Actions для Регистраций ---
export async function approveRegistrationAction(id: string, email: string, name: string, category: string) {
  const approvedReg = await prisma.registrationRequest.update({
    where: { id },
    data: { status: "APPROVED" }
  });

  const newCompany = await prisma.company.create({
    data: {
      name: name,
      bin: `MOCK-${Date.now()}`,
      status: "APPROVED",
      email: email,
      category: category
    }
  });

  const randomPassword = "res-" + Math.random().toString(36).slice(-6);

  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: randomPassword,
      role: category === "INDIVIDUAL" ? "EMPLOYEE" : "COMPANY_ADMIN",
      companyId: newCompany.id,
    }
  });

  if (email) {
    await sendApprovalEmail(email, name, randomPassword);
  }

  revalidatePath("/res365/admin");
}

export async function rejectRegistrationAction(id: string) {
  await prisma.registrationRequest.update({
    where: { id },
    data: { status: "REJECTED" }
  });
  revalidatePath("/res365/admin");
}
