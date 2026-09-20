"use client";

import { useState, type FormEvent } from "react";
import { ApiError, api } from "@/lib/api";
import HoneypotField, { HONEYPOT_FIELD_NAME } from "./HoneypotField";

const inputClass =
  "block w-full rounded-lg border border-primary-100 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/60 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/30";

export interface ContactFormLabels {
  submit: string;
  sending: string;
  successTitle: string;
  successText: string;
}

export default function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = new FormData(event.currentTarget);

    if (form.get(HONEYPOT_FIELD_NAME)) {
      // A bot filled the trap field. Pretend success without actually
      // submitting - no point telling it what gave it away.
      setStatus("success");
      return;
    }

    try {
      await api.crm.submitContactInquiry({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: (form.get("phone") as string) || undefined,
        whatsapp: (form.get("whatsapp") as string) || undefined,
        subject: String(form.get("subject") ?? ""),
        message: String(form.get("message") ?? ""),
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      if (err instanceof ApiError) {
        setErrorMessage(
          err.fieldErrors?.length ? err.fieldErrors.map((f) => f.message).join(" ") : err.message,
        );
      } else {
        setErrorMessage("Something went wrong. Please try again or contact us on WhatsApp.");
      }
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-secondary-500/30 bg-secondary-500/5 p-8 text-center">
        <h3 className="font-heading text-xl font-semibold text-primary-700">{labels.successTitle}</h3>
        <p className="mt-2 text-charcoal-light">{labels.successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <HoneypotField />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-charcoal">
            Name <span className="text-red-500">*</span>
          </span>
          <input name="name" required className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-charcoal">
            Email <span className="text-red-500">*</span>
          </span>
          <input name="email" type="email" required className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-charcoal">Phone</span>
          <input name="phone" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-charcoal">WhatsApp</span>
          <input name="whatsapp" className={inputClass} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-charcoal">
          Subject <span className="text-red-500">*</span>
        </span>
        <input name="subject" required className={inputClass} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-charcoal">
          Message <span className="text-red-500">*</span>
        </span>
        <textarea name="message" rows={5} required className={inputClass} />
      </label>

      {status === "error" && errorMessage && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-primary-500 px-8 py-3.5 font-semibold text-white shadow-md transition-colors hover:bg-primary-600 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? labels.sending : labels.submit}
      </button>
    </form>
  );
}
