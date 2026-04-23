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
} from "lucide-react";

const getIcon = (title) => {
  if (!title) return Tag;
  const lower = title.toLowerCase();

  if (lower.includes("ceremony") || lower.includes("presentation"))
    return Award;
  if (lower.includes("break")) return Coffee;
  if (
    lower.includes("seminar") ||
    lower.includes("talk") ||
    lower.includes("forum")
  )
    return Mic;
  if (lower.includes("activity") || lower.includes("event"))
    return CalendarDays;
  if (
    lower.includes("info") ||
    lower.includes("briefing") ||
    lower.includes("registration")
  )
    return Info;
  if (lower.includes("transport")) return Bus;
  if (lower.includes("workshop")) return Wrench;
  if (lower.includes("networking")) return Users;

  return Tag;
};

export default function Agenda({ data }) {
  const days = Object.keys(data);

  return (
    <section className="w-full px-4 md:px-10 py-20 pt-[15vh]">
      <Tabs defaultValue={days[0]} className="w-full max-w-5xl mx-auto">
        {/* ADDED: A dedicated wrapper to enforce horizontal scrolling on mobile */}
        <div className="w-full overflow-x-auto scrollbar-hide pb-2 mb-6">
          {/* UPDATED: w-max allows it to grow beyond the screen, min-w-full ensures it centers on desktop */}
          <TabsList className="flex w-max min-w-full justify-start md:justify-center flex-nowrap md:flex-wrap gap-2 bg-[#f6f6f6cc] p-1 rounded-lg">
            {days.map((day) => (
              <TabsTrigger
                key={day}
                value={day}
                className="whitespace-nowrap shrink-0 px-6"
              >
                {day}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div>
          {days.map((day) => (
            <TabsContent key={day} value={day}>
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 md:space-y-6 max-h-[80vh] overflow-y-auto pr-2 pb-4"
                >
                  {data[day].slice(0, 50).map((event, i) => {
                    const IconComponent = getIcon(event.label.title);

                    return (
                      <div
                        key={i}
                        className="relative flex flex-row border p-4 md:p-5 rounded-xl shadow-sm bg-[#b68ae9be] overflow-hidden items-center"
                      >
                        {/* Left: Details */}
                        <div className="flex-1 flex flex-col">
                          {/* Top Row: Time */}
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-semibold text-gray-900">
                              {event.time}
                            </span>
                          </div>

                          <h3 className="text-lg md:text-xl font-bold text-gray-900">
                            {event.title}
                          </h3>

                          {/* Color Tags + Lucide Icons */}
                          <div className="flex flex-wrap items-center gap-2 mt-2 mb-2">
                            <span
                              className={`flex items-center justify-center px-3 py-1.5 rounded-full ${event.label.color} text-xs md:text-sm font-semibold text-white shadow-sm`}
                            >
                              <IconComponent className="w-4 h-4 mr-1.5 opacity-90" />
                              {event.label.title}
                            </span>
                          </div>

                          <p className="text-gray-800 mt-1 text-sm md:text-base leading-relaxed">
                            {event.description}
                          </p>
                        </div>

                        {/* Right: Speaker */}
                        {event.speaker && event.speaker.photo && (
                          <div className="ml-4 md:ml-8 flex-shrink-0 flex flex-col items-center">
                            <a
                              href={event.speaker.link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <img
                                src={event.speaker.photo}
                                alt={event.speaker.name}
                                className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover transition-transform duration-300 hover:scale-105 border-4 border-white shadow-lg"
                              />
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </div>
      </Tabs>

      {/* Hide the horizontal scrollbar for cleaner mobile UI */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `,
        }}
      />
    </section>
  );
}
