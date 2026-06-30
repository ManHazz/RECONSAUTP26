import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Award,
  Coffee,
  Mic,
  CalendarDays,
  Info,
  Bus,
  Wrench,
  Users,
  Tag,
  MapPin,
  Clock,
} from "lucide-react";

const ICON_MAP = [
  { match: ["ceremony", "presentation"], icon: Award },
  { match: ["break"], icon: Coffee },
  { match: ["seminar", "talk", "forum"], icon: Mic },
  { match: ["activity", "event"], icon: CalendarDays },
  { match: ["info", "briefing", "registration"], icon: Info },
  { match: ["transport"], icon: Bus },
  { match: ["workshop"], icon: Wrench },
  { match: ["networking"], icon: Users },
];

const getIcon = (title) => {
  if (!title) return Tag;
  const lower = title.toLowerCase();
  for (const { match, icon } of ICON_MAP) {
    if (match.some((m) => lower.includes(m))) return icon;
  }
  return Tag;
};

// Tailwind bg-* class → accent hex (for the timeline rail dot)
const LABEL_HEX = {
  "bg-blue-500": "#3b82f6",
  "bg-gray-400": "#9ca3af",
  "bg-purple-500": "#a855f7",
  "bg-green-500": "#22c55e",
  "bg-indigo-500": "#6366f1",
  "bg-pink-500": "#ec4899",
  "bg-amber-500": "#f59e0b",
  "bg-red-500": "#ef4444",
  "bg-teal-500": "#14b8a6",
};

export default function Agenda({ data }) {
  const days = Object.keys(data);

  return (
    <section className="w-full px-4 md:px-10 py-16 pt-[14vh]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-Poppins font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl text-white">
            Conference Agenda
          </h2>
          <p className="mt-2 text-white/70 text-sm md:text-base">
            Five days of seminars, workshops, cultural exchanges and networking.
          </p>
        </div>

        <Tabs defaultValue={days[0]} className="w-full">
          {/* Day tabs */}
          <div className="w-full overflow-x-auto scrollbar-hide pb-2 mb-8 sticky top-[10vh] z-20 backdrop-blur-md">
            <TabsList className="flex w-max min-w-full justify-start md:justify-center flex-nowrap gap-1.5 bg-white/10 border border-white/15 p-1.5 rounded-full">
              {days.map((day) => (
                <TabsTrigger
                  key={day}
                  value={day}
                  className="whitespace-nowrap shrink-0 px-5 py-2 rounded-full text-sm md:text-base font-medium text-white/70 data-[state=active]:bg-white data-[state=active]:text-[#461B61] data-[state=active]:shadow-md transition-all"
                >
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Day content */}
          {days.map((day) => (
            <TabsContent key={day} value={day}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                  className="relative pl-6 md:pl-10"
                >
                  {/* Vertical rail */}
                  <div
                    aria-hidden
                    className="absolute left-2 md:left-3 top-2 bottom-2 w-px bg-gradient-to-b from-white/10 via-white/30 to-white/10"
                  />

                  {data[day].length === 0 && (
                    <p className="text-white/60 italic">
                      No sessions scheduled for {day}.
                    </p>
                  )}

                  <ul className="space-y-4 md:space-y-5">
                    {data[day].map((event, i) => {
                      const IconComponent = getIcon(event.label?.title);
                      const dotColor =
                        LABEL_HEX[event.label?.color] || "#9f44db";

                      return (
                        <li key={i} className="relative">
                          {/* Rail dot */}
                          <span
                            className="absolute -left-[18px] md:-left-[26px] top-5 w-3 h-3 rounded-full ring-4 ring-[#461B61]"
                            style={{ backgroundColor: dotColor }}
                          />

                          <article className="group rounded-xl bg-white/8 hover:bg-white/12 border border-white/15 backdrop-blur-sm px-4 md:px-6 py-4 md:py-5 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                              {/* Left meta */}
                              <div className="md:w-56 shrink-0 flex md:flex-col md:items-start items-center gap-3 md:gap-1.5">
                                <div className="flex items-center gap-1.5 text-white font-semibold text-sm md:text-base whitespace-nowrap">
                                  <Clock className="w-4 h-4 shrink-0 text-white/60" />
                                  <span>{event.time}</span>
                                </div>
                                {event.location &&
                                  event.location !== "TBD" && (
                                    <div className="flex items-center gap-1 text-white/55 text-xs">
                                      <MapPin className="w-3 h-3" />
                                      <span>{event.location}</span>
                                    </div>
                                  )}
                              </div>

                              {/* Main */}
                              <div className="flex-1 min-w-0">
                                {event.label?.title && (
                                  <span
                                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] md:text-xs font-medium uppercase tracking-wider text-white shadow-sm"
                                    style={{ backgroundColor: dotColor }}
                                  >
                                    <IconComponent className="w-3 h-3" />
                                    {event.label.title}
                                  </span>
                                )}
                                <h3 className="mt-2 text-base md:text-lg lg:text-xl font-semibold text-white leading-snug">
                                  {event.title}
                                </h3>
                                {event.description && (
                                  <p className="mt-1.5 text-white/70 text-sm md:text-[15px] leading-relaxed">
                                    {event.description}
                                  </p>
                                )}
                              </div>

                              {/* Speaker */}
                              {event.speaker && event.speaker.photo && (
                                <a
                                  href={event.speaker.link || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="shrink-0 self-start flex items-center gap-3 md:flex-col md:text-center group/spk"
                                >
                                  <img
                                    src={event.speaker.photo}
                                    alt={event.speaker.name || "Speaker"}
                                    className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover border-2 border-white/30 group-hover/spk:border-white transition"
                                  />
                                  {event.speaker.name && (
                                    <span className="text-xs text-white/80 md:max-w-[88px] leading-tight">
                                      {event.speaker.name}
                                    </span>
                                  )}
                                </a>
                              )}
                            </div>
                          </article>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
