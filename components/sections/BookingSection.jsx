"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, MessageCircle, ShieldCheck } from "lucide-react";
import { clinic, services, whatsappUrl } from "@/lib/clinic";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

const times = ["10:00 AM", "11:30 AM", "1:00 PM", "4:30 PM", "6:00 PM"];

export function BookingSection({ standalone = false }) {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState({
    service: services[0].title,
    date: "",
    time: "",
    name: "",
    phone: "",
    message: "",
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);

  const whatsappMessage = useMemo(
    () =>
      `Hello Doctor, I would like to request an appointment.
Service: ${form.service}
Preferred date: ${form.date || "Not selected"}
Preferred time: ${form.time || "Not selected"}
Name: ${form.name || "Not provided"}
Phone: ${form.phone || "Not provided"}
Concern: ${form.message || "Not provided"}`,
    [form]
  );

  function update(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function submit(event) {
    event.preventDefault();
    const request = {
      ...form,
      id: `APT-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending"
    };
    const existing = JSON.parse(window.localStorage.getItem("lumine-appointments") || "[]");
    window.localStorage.setItem(
      "lumine-appointments",
      JSON.stringify([request, ...existing].slice(0, 20))
    );
    setSubmitted(true);
  }

  return (
    <section className={`booking-section ${standalone ? "standalone" : ""}`} id="booking">
      <Reveal className="booking-copy">
        <p className="eyebrow">Low-friction booking</p>
        <h2>{t.bookingTitle}</h2>
        <p>{t.bookingBody}</p>
        <div className="booking-assurance">
          <span>
            <ShieldCheck size={18} />
            {t.noLogin}
          </span>
          <span>
            <MessageCircle size={18} />
            WhatsApp confirmation friendly
          </span>
          <span>
            <CalendarCheck size={18} />
            Built for Muzaffarnagar patients
          </span>
        </div>
      </Reveal>
      <Reveal className="booking-card" delay={120}>
        <form onSubmit={submit}>
          <label>
            {t.service}
            <select name="service" value={form.service} onChange={update}>
              {services.map((service) => (
                <option key={service.id} value={service.title}>
                  {lang === "hi" ? service.titleHi : service.title}
                </option>
              ))}
            </select>
          </label>
          <div className="form-row">
            <label>
              {t.date}
              <input name="date" type="date" value={form.date} onChange={update} required />
            </label>
            <label>
              {t.time}
              <select name="time" value={form.time} onChange={update} required>
                <option value="">Select</option>
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              {t.name}
              <input name="name" value={form.name} onChange={update} placeholder="Patient name" required />
            </label>
            <label>
              {t.phone}
              <input
                name="phone"
                value={form.phone}
                onChange={update}
                placeholder="+91..."
                inputMode="tel"
                required
              />
            </label>
          </div>
          <label>
            {t.message}
            <textarea
              name="message"
              value={form.message}
              onChange={update}
              placeholder="Pain, implant query, wisdom tooth, emergency..."
              rows={4}
            />
          </label>
          <label className="consent">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={update}
              required
            />
            <span>{t.consent}</span>
          </label>
          <button className="primary-button form-submit" type="submit">
            {t.submit}
          </button>
          {submitted && (
            <div className="success-box">
              <p>{t.success}</p>
              <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noreferrer">
                <MessageCircle size={17} />
                Send on WhatsApp
              </a>
            </div>
          )}
        </form>
      </Reveal>
    </section>
  );
}
