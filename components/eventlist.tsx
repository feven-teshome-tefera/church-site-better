'use client';
import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { loadEvents, Event } from "@/lib/eventstore";
export  function Eventlist(){
      const [events, setEvents] = useState<Event[]>([]);
    
      useEffect(() => {
        loadEvents().then(setEvents);
      }, []);
    return(
            <section className="py-16 md:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="border border-border rounded-lg p-8 hover:shadow-md transition">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div>
                      <span className="inline-block bg-primary-gradient text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold mb-3">
                        {event.category}
                      </span>
                      <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                    </div>
                  </div>

                  <p className="text-foreground/70 mb-6">{event.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-foreground/70">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-primary" />
                      <span>{event.date}</span>

                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* {event.details && (
                    <button className="mt-6 text-primary font-semibold hover:text-primary/80 transition">
                      Learn More →
                    </button>
                  )} */}
                </div>
              ))}
            </div>
          </div>
        </section>
)}