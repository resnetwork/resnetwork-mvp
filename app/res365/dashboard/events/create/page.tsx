import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { createEvent } from "@/app/lib/actions";
import CreateEventForm from "./CreateEventForm";

export default async function CreateEventPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/res365");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { company: true }
  });

  if (!user || (user.role !== "COMPANY_ADMIN" && user.role !== "SYSTEM_ADMIN") || !user.companyId) {
    redirect("/res365/dashboard"); // Доступ только для админов
  }

  // Создаем Server Action обертку для передачи companyId и userId
  const createEventAction = async (formData: FormData) => {
    "use server";
    const result = await createEvent(formData, user.id, user.companyId!);
    if (result.success) {
      redirect("/res365/dashboard");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-2">Создать новое событие</h1>
        <p className="text-emerald-400/60">Добавьте мероприятие в общую афишу RES Network</p>
      </div>

      <CreateEventForm 
        userRole={user.role} 
        onSubmitAction={createEventAction} 
      />
    </div>
  );
}
