"use client";

import { X, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { formatPriceLabel } from "@/lib/plans";
import type { ConsultingPlan } from "@/lib/types";

interface PurchaseModalProps {
  plan: ConsultingPlan | null;
  onClose: () => void;
}

export function PurchaseModal({ plan, onClose }: PurchaseModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!plan) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, planId: plan.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data.detail ? `${data.error} (${data.detail})` : data.error;
        setError(msg ?? "Something went wrong.");
        return;
      }
      setSuccessMessage(data.message ?? "Invoice sent to your email — check spam.");
      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="pt-4 text-center">
            <h2 id="modal-title" className="text-xl font-semibold text-slate-900">
              Invoice sent
            </h2>
            <p className="mt-3 text-sm text-slate-600">{successMessage}</p>
            <p className="mt-2 text-sm text-slate-500">
              Reply to the email to confirm your order and we will send payment details.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-lg bg-accent py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="modal-title" className="text-xl font-semibold text-slate-900 pr-8">
              Request invoice
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {plan.name} — {formatPriceLabel(plan.price)} one-time · {plan.toolsUnlocked} report generators
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="inv-name" className="mb-1 block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  id="inv-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label htmlFor="inv-email" className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="inv-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-medium text-white hover:bg-accent-dark disabled:opacity-60"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Send invoice to my email
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
