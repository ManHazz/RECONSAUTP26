import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";

export default function Agenda({ data }) {
  const days = Object.keys(data);

  return (
    <section className="w-full px-10 py-20 pt-[15vh]">
      <Tabs defaultValue={days[0]} className="w-full">
        <TabsList className="flex justify-center flex-wrap gap-2 mb-6 bg-[#f6f6f6cc]">
          {days.map((day) => (
            <TabsTrigger key={day} value={day}>
              {day}
            </TabsTrigger>
          ))}
        </TabsList>

        <div>
          {days.map((day) => (
            <TabsContent key={day} value={day}>
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 max-h-[80vh] overflow-y-auto pr-2"
                >
                  {data[day].slice(0, 50).map((event, i) => (
                    <div
                      key={i}
                      className="relative flex flex-row border p-4 rounded-xl shadow-sm bg-[#9eabffbe] overflow-hidden items-center"
                    >
                      {/* Left: Details */}
                      <div className="flex-1 flex flex-col">
                        {/* Top Row: Time + Label */}
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold">{event.time}</span>
                          <div className="flex items-center gap-2">
                            <span
                              className={`flex items-center justify-center px-3 h-7 min-w-[48px] rounded-full ${event.label.color} text-xs font-semibold text-white`}
                              style={{ borderRadius: "999px" }}
                            >
                              {event.label.title}
                            </span>
                          </div>
                        </div>
                        {/* Details Below */}
                        <h3 className="text-lg font-bold">{event.title}</h3>
                        <p className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" /> {event.location}
                        </p>
                        <p className="text-gray-700 mt-2">
                          {event.description}
                        </p>
                      </div>
                      {/* Right: Speaker */}
                      {event.speaker && event.speaker.photo && (
                        <div className="ml-8 flex-shrink-0 flex flex-col items-center">
                          <a
                            href={event.speaker.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <img
                              src={event.speaker.photo}
                              alt={event.speaker.name}
                              className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover transition-transform duration-300 hover:scale-105 border-4 border-white shadow-lg"
                            />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </section>
  );
}
