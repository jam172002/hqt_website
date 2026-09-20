"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ApiError, api, type Course } from "@/lib/api";
import { COUNTRIES, DAYS_OF_WEEK } from "@/lib/countries";
import HoneypotField, { HONEYPOT_FIELD_NAME } from "./HoneypotField";

function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

export interface TrialFormLabels {
  submit: string;
  submitting: string;
  successTitle: string;
  successText: string;
  whatsappButton: string;
  whatsappHref: string;
}

export default function TrialForm({ courses, labels }: { courses: Course[]; labels: TrialFormLabels }) {
  const timezones = useMemo(() => {
    try {
      return Intl.supportedValuesOf("timeZone");
    } catch {
      return [detectTimezone()];
    }
  }, []);

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function toggleDay(code: string) {
    setSelectedDays((prev) => (prev.includes(code) ? prev.filter((d) => d !== code) : [...prev, code]));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = new FormData(event.currentTarget);

    if (form.get(HONEYPOT_FIELD_NAME)) {
      setStatus("success");
      return;
    }

    const studentAge = Number(form.get("studentAge"));

    if (selectedDays.length === 0) {
      setStatus("error");
      setErrorMessage("Please select at least one preferred day.");
      return;
    }

    try {
      await api.crm.submitTrialRequest({
        studentName: String(form.get("studentName") ?? ""),
        studentAge,
        guardianName: (form.get("guardianName") as string) || undefined,
        countryCode: String(form.get("countryCode") ?? ""),
        whatsapp: String(form.get("whatsapp") ?? ""),
        email: (form.get("email") as string) || undefined,
        phone: (form.get("phone") as string) || undefined,
        courseId: String(form.get("courseId") ?? ""),
        preferredDays: selectedDays,
        preferredTime: (form.get("preferredTime") as string) || undefined,
        timezone: String(form.get("timezone") ?? detectTimezone()),
        message: (form.get("message") as string) || undefined,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      if (err instanceof ApiError) {
        setErrorMessage(
          err.fieldErrors?.length
            ? err.fieldErrors.map((f) => f.message).join(" ")
            : err.message,
        );
      } else {
        setErrorMessage("Something went wrong. Please try again or contact us on WhatsApp.");
      }
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-secondary-500/30 bg-secondary-500/5 p-8 text-center">
        <h3 className="font-heading text-xl font-semibold text-primary-700">
          {labels.successTitle}
        </h3>
        <p className="mt-2 text-charcoal-light">
          {labels.successText}
        </p>
        {labels.whatsappButton && (
          <a
            href={labels.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-[#25D366] px-8 py-3 font-semibold text-white shadow-md transition-opacity hover:opacity-90"
          >
            {labels.whatsappButton}
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <HoneypotField />
      <fieldset className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <legend className="col-span-full mb-1 font-heading text-sm font-semibold text-primary-600">
          Student Information
        </legend>
        <Field label="Student Name" required>
          <input name="studentName" required className={inputClass} placeholder="e.g. Ahmed" />
        </Field>
        <Field label="Student Age" required>
          <input
            name="studentAge"
            type="number"
            min={1}
            max={120}
            required
            className={inputClass}
            placeholder="e.g. 9"
          />
        </Field>
        <Field label="Parent / Guardian Name">
          <input name="guardianName" className={inputClass} placeholder="e.g. Bilal" />
        </Field>
      </fieldset>

      <fieldset className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <legend className="col-span-full mb-1 font-heading text-sm font-semibold text-primary-600">
          Contact Information
        </legend>
        <Field label="Country" required>
          <select name="countryCode" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select country
            </option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="WhatsApp Number" required>
          <input name="whatsapp" required className={inputClass} placeholder="e.g. +923001234567" />
        </Field>
        <Field label="Email">
          <input name="email" type="email" className={inputClass} placeholder="e.g. you@example.com" />
        </Field>
        <Field label="Phone (if different)">
          <input name="phone" className={inputClass} />
        </Field>
      </fieldset>

      <fieldset className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <legend className="col-span-full mb-1 font-heading text-sm font-semibold text-primary-600">
          Course &amp; Schedule
        </legend>
        <Field label="Course" required>
          <select name="courseId" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a course
            </option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Time Zone" required>
          <select name="timezone" required defaultValue={detectTimezone()} className={inputClass}>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-charcoal">
            Preferred Days <span className="text-red-500">*</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {DAYS_OF_WEEK.map((day) => {
              const active = selectedDays.includes(day.code);
              return (
                <button
                  type="button"
                  key={day.code}
                  onClick={() => toggleDay(day.code)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-primary-500 bg-primary-500 text-white"
                      : "border-primary-100 bg-white text-charcoal-light hover:border-primary-300"
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>
        <Field label="Preferred Time">
          <input name="preferredTime" type="time" className={inputClass} />
        </Field>
      </fieldset>

      <fieldset>
        <legend className="mb-1 font-heading text-sm font-semibold text-primary-600">
          Additional Information
        </legend>
        <Field label="Message or Special Requirements">
          <textarea name="message" rows={4} className={inputClass} placeholder="Anything we should know?" />
        </Field>
      </fieldset>

      {status === "error" && errorMessage && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-primary-500 px-8 py-3.5 font-semibold text-white shadow-md transition-colors hover:bg-primary-600 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}

const inputClass =
  "block w-full rounded-lg border border-primary-100 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/60 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/30";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-charcoal">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}
