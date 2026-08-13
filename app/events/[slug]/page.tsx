import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { EVENTS } from "../../data/events";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = EVENTS.find((item) => item.slug === slug);
  if (!event) notFound();
  return (
    <main className="min-h-screen px-6 py-12 md:px-16" style={{ backgroundColor: "#061D3D" }}>
      <div className="mx-auto max-w-4xl">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: "#B8D97A" }}><ArrowLeft size={17}/> На главную</a>
        <article className="mt-10 overflow-hidden rounded-3xl bg-white" style={{ boxShadow: "0 30px 80px rgba(0,0,0,.25)" }}>
          <img src={event.image} alt={event.title} className="h-72 w-full object-cover md:h-96" />
          <div className="p-8 md:p-14">
            <span className="text-xs font-extrabold tracking-[.14em]" style={{ color: "#318455" }}>{event.category.toUpperCase()}</span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl" style={{ color: "#061D3D" }}>{event.title}</h1>
            <div className="mt-8 grid gap-3 rounded-2xl p-5 text-sm font-semibold md:grid-cols-2" style={{ backgroundColor: "#EEF5E7", color: "#245E42" }}>
              <p className="flex gap-2"><CalendarDays size={18}/>{event.date}</p>
              <p className="flex gap-2"><MapPin size={18}/>{event.location}</p>
            </div>
            <p className="mt-9 text-xl leading-relaxed" style={{ color: "#455363" }}>{event.summary}</p>
            <h2 className="mt-10 text-2xl font-bold" style={{ color: "#061D3D" }}>В программе</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed" style={{ color: "#455363" }}>{event.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            {event.contact && (
              <div className="mt-10 rounded-2xl p-5 leading-relaxed" style={{ backgroundColor: "#061D3D", color: "#FFF" }}>
                {event.contact.map((line, i) => <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>)}
              </div>
)}
            {event.source && <a className="mt-10 inline-block rounded-full px-6 py-3 text-sm font-bold text-white" style={{ backgroundColor: "#318455" }} href={event.source} target="_blank" rel="noreferrer">Перейти на страницу организатора</a>}
          </div>
        </article>
      </div>
    </main>
  );
}