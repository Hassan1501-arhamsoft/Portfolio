import { useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Loader2,
  Radio,
  Send,
} from 'lucide-react';
import { CONTACT_DATA } from '../data/contact.data';
import emailjs from '@emailjs/browser';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '', // Honeypot field — must stay empty
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const QUICK_SUBJECTS = [
  'AI / RAG Engineering Role',
  'Full-Stack MERN Build',
  'System Architecture Inquiry',
];

const EMAILJS_SERVICE_ID = 'service_x327tdf';
const EMAILJS_TEMPLATE_ID = 'template_ck7suxs';
const EMAILJS_PUBLIC_KEY = 'Kyzybq2rkIOpzSGjR';

function validateForm(values) {
  const errors = {};

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Enter your name (at least 2 characters).';
  }
  if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.subject.trim() || values.subject.trim().length < 3) {
    errors.subject = 'Enter a brief subject.';
  }
  if (!values.message.trim() || values.message.trim().length < 15) {
    errors.message = 'Message must be at least 15 characters.';
  }

  return errors;
}

export function ContactForm() {
  const formRef = useRef(null);
  const [values, setValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Live field readiness signals for the tethered Uplink Hub
  const signalNodes = useMemo(() => {
    const nameReady = values.name.trim().length >= 2;
    const emailReady = EMAIL_REGEX.test(values.email.trim());
    const subjectReady = values.subject.trim().length >= 3;
    const messageReady = values.message.trim().length >= 15;

    return [
      { id: 'name', code: '01', label: 'Identity', ready: nameReady },
      { id: 'email', code: '02', label: 'Return Path', ready: emailReady },
      { id: 'subject', code: '03', label: 'Subject', ready: subjectReady },
      { id: 'message', code: '04', label: 'Payload', ready: messageReady },
    ];
  }, [values.name, values.email, values.subject, values.message]);

  const readyCount = signalNodes.filter((n) => n.ready).length;
  const allSignalsLocked = readyCount === signalNodes.length;

  const handleMouseMove = (e) => {
    const form = formRef.current;
    if (!form) return;
    const rect = form.getBoundingClientRect();
    form.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    form.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSelectPreset = (preset) => {
    setValues((prev) => ({ ...prev, subject: preset }));
    if (errors.subject) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.subject;
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Silently ignore bot submissions that fill the hidden honeypot
    if (values.website) return;

    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('submitting');
    setFeedbackMessage('');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setStatus('success');
      setFeedbackMessage(
        'Transmission received. I will get back to you within 24 hours.'
      );
      setValues(INITIAL_FORM);
      setErrors({});
    } catch {
      setStatus('error');
      setFeedbackMessage(
        `Could not transmit message right now. Please email ${CONTACT_DATA.email} directly.`
      );
    }
  };

  const getInputClasses = (hasError) =>
    `w-full px-4 py-3 text-sm text-zinc-100 bg-[#070908]/95 border rounded-xl placeholder:text-zinc-500 transition-all duration-200 focus:outline-none focus:ring-2 ${
      hasError
        ? 'border-rose-500/70 focus:border-rose-400 focus:ring-rose-500/25'
        : 'border-white/[0.09] hover:border-white/[0.18] focus:border-[#47f59c]/75 focus:ring-[#47f59c]/25'
    }`;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onMouseMove={handleMouseMove}
      noValidate
      className="group relative p-6 sm:p-8 rounded-3xl bg-[#0b0e0d]/95 backdrop-blur-2xl border border-white/[0.09] shadow-[0_28px_70px_-15px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.1)] overflow-hidden space-y-6"
    >
      {/* Top Specular Mint Edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#47f59c]/55 to-transparent"
      />

      {/* Corner Aerospace Bracket Ticks */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-[#47f59c]/60 rounded-tl-sm"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-[#47f59c]/60 rounded-br-sm"
      />

      {/* Cursor-Tracking Radial Mint Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
        style={{
          background:
            'radial-gradient(460px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(71, 245, 156, 0.085), transparent 50%)',
        }}
      />

      {/* Live Tethered Uplink Telemetry Hub (Central Circle + 4 Connected Field Nodes) */}
      <div className="relative z-10 p-4 rounded-2xl bg-[#060807]/90 border border-[#47f59c]/20 shadow-[inset_0_0_30px_rgba(71,245,156,0.04)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left 2 Tethered Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 w-full sm:w-auto">
            {signalNodes.slice(0, 2).map((node) => (
              <div
                key={node.id}
                className={`flex items-center justify-between sm:justify-start gap-2 px-3 py-1.5 rounded-full font-mono text-[11px] border transition-all duration-300 ${
                  node.ready
                    ? 'bg-[#0f2419]/90 text-white border-[#47f59c]/60 shadow-[0_0_16px_-4px_rgba(71,245,156,0.5)]'
                    : 'bg-white/[0.025] text-zinc-400 border-white/[0.08]'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      node.ready
                        ? 'bg-[#47f59c] shadow-[0_0_8px_#47f59c]'
                        : 'bg-zinc-600'
                    }`}
                  />
                  <span>{node.label}</span>
                </span>
                {node.ready && (
                  <Check className="w-3 h-3 text-[#47f59c] shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Center Silk Tether + Core Uplink Circle */}
          <div className="relative flex items-center justify-center flex-1 w-full sm:w-auto py-1">
            {/* Horizontal Silk Tether SVG */}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 40"
              preserveAspectRatio="none"
              className="hidden sm:block absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-8 pointer-events-none"
            >
              <line
                x1="0"
                y1="12"
                x2="100"
                y2="20"
                stroke={
                  signalNodes[0].ready
                    ? '#47f59c'
                    : 'rgba(255, 255, 255, 0.12)'
                }
                strokeWidth={signalNodes[0].ready ? '1.5' : '1'}
                strokeDasharray={signalNodes[0].ready ? 'none' : '3 3'}
              />
              <line
                x1="0"
                y1="28"
                x2="100"
                y2="20"
                stroke={
                  signalNodes[1].ready
                    ? '#47f59c'
                    : 'rgba(255, 255, 255, 0.12)'
                }
                strokeWidth={signalNodes[1].ready ? '1.5' : '1'}
                strokeDasharray={signalNodes[1].ready ? 'none' : '3 3'}
              />
              <line
                x1="200"
                y1="12"
                x2="100"
                y2="20"
                stroke={
                  signalNodes[2].ready
                    ? '#47f59c'
                    : 'rgba(255, 255, 255, 0.12)'
                }
                strokeWidth={signalNodes[2].ready ? '1.5' : '1'}
                strokeDasharray={signalNodes[2].ready ? 'none' : '3 3'}
              />
              <line
                x1="200"
                y1="28"
                x2="100"
                y2="20"
                stroke={
                  signalNodes[3].ready
                    ? '#47f59c'
                    : 'rgba(255, 255, 255, 0.12)'
                }
                strokeWidth={signalNodes[3].ready ? '1.5' : '1'}
                strokeDasharray={signalNodes[3].ready ? 'none' : '3 3'}
              />
            </svg>

            {/* Central Uplink Circle */}
            <div
              className={`relative z-10 flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#0b100e] border transition-all duration-500 ${
                allSignalsLocked || status === 'success'
                  ? 'border-[#47f59c] shadow-[0_0_30px_rgba(71,245,156,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]'
                  : 'border-[#47f59c]/40 shadow-[0_0_20px_rgba(71,245,156,0.16)]'
              }`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1.5 rounded-full border border-dashed border-[#47f59c]/35 animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
              />
              <Radio
                className={`w-4 h-4 mb-0.5 transition-colors ${
                  allSignalsLocked ? 'text-[#47f59c]' : 'text-zinc-300'
                }`}
              />
              <span className="font-mono text-[11px] font-bold text-white leading-none">
                {status === 'success' ? 'SENT' : `${readyCount}/4`}
              </span>
              <span className="font-mono text-[8px] tracking-widest uppercase text-[#47f59c] mt-0.5">
                {allSignalsLocked ? 'Locked' : 'Uplink'}
              </span>
            </div>
          </div>

          {/* Right 2 Tethered Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 w-full sm:w-auto">
            {signalNodes.slice(2, 4).map((node) => (
              <div
                key={node.id}
                className={`flex items-center justify-between sm:justify-end gap-2 px-3 py-1.5 rounded-full font-mono text-[11px] border transition-all duration-300 ${
                  node.ready
                    ? 'bg-[#0f2419]/90 text-white border-[#47f59c]/60 shadow-[0_0_16px_-4px_rgba(71,245,156,0.5)]'
                    : 'bg-white/[0.025] text-zinc-400 border-white/[0.08]'
                }`}
              >
                {node.ready && (
                  <Check className="w-3 h-3 text-[#47f59c] shrink-0 hidden sm:block" />
                )}
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors sm:order-2 ${
                      node.ready
                        ? 'bg-[#47f59c] shadow-[0_0_8px_#47f59c]'
                        : 'bg-zinc-600'
                    }`}
                  />
                  <span>{node.label}</span>
                </span>
                {node.ready && (
                  <Check className="w-3 h-3 text-[#47f59c] shrink-0 sm:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Honeypot anti-spam field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      {/* Name & Email Row */}
      <div className="relative z-10 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="flex items-center justify-between mb-2 font-mono text-[11px] font-semibold tracking-wider uppercase text-zinc-300"
          >
            <span>01 · Your Name</span>
            {signalNodes[0].ready && (
              <span className="text-[10px] text-[#47f59c]">Verified</span>
            )}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            className={getInputClasses(Boolean(errors.name))}
          />
          {errors.name && (
            <p id="error-name" className="mt-1.5 text-xs text-rose-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="flex items-center justify-between mb-2 font-mono text-[11px] font-semibold tracking-wider uppercase text-zinc-300"
          >
            <span>02 · Email Address</span>
            {signalNodes[1].ready && (
              <span className="text-[10px] text-[#47f59c]">Verified</span>
            )}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            className={getInputClasses(Boolean(errors.email))}
          />
          {errors.email && (
            <p id="error-email" className="mt-1.5 text-xs text-rose-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Subject + 1-Click Intent Nodes */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <label
            htmlFor="contact-subject"
            className="font-mono text-[11px] font-semibold tracking-wider uppercase text-zinc-300"
          >
            03 · Subject
          </label>

          <div className="flex flex-wrap items-center gap-1.5">
            {QUICK_SUBJECTS.map((preset) => {
              const isSelected = values.subject === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] border transition-colors ${
                    isSelected
                      ? 'bg-[#47f59c]/15 text-[#47f59c] border-[#47f59c]/50'
                      : 'bg-white/[0.03] text-zinc-400 border-white/[0.08] hover:text-zinc-200 hover:border-[#47f59c]/35'
                  }`}
                >
                  {preset}
                </button>
              );
            })}
          </div>
        </div>

        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="Full-Stack / AI Engineering Opportunity"
          value={values.subject}
          onChange={handleChange}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'error-subject' : undefined}
          className={getInputClasses(Boolean(errors.subject))}
        />
        {errors.subject && (
          <p id="error-subject" className="mt-1.5 text-xs text-rose-400">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Payload */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="contact-message"
            className="font-mono text-[11px] font-semibold tracking-wider uppercase text-zinc-300"
          >
            04 · Message Payload
          </label>
          <span
            className={`font-mono text-[10px] ${
              signalNodes[3].ready ? 'text-[#47f59c]' : 'text-zinc-500'
            }`}
          >
            {values.message.trim().length} / 15 min chars
          </span>
        </div>

        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Share role details, project scope, or timeline..."
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : undefined}
          className={`${getInputClasses(Boolean(errors.message))} resize-y`}
        />
        {errors.message && (
          <p id="error-message" className="mt-1.5 text-xs text-rose-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submission Status Banner */}
      {feedbackMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`relative z-10 flex items-start gap-2.5 p-3.5 text-xs rounded-xl border ${
            status === 'success'
              ? 'bg-[#47f59c]/10 text-[#7efcc0] border-[#47f59c]/35'
              : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
          }`}
        >
          {status === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-[#47f59c] shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Submit Action */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-1">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-zinc-950 bg-[#47f59c] rounded-full shadow-[0_0_28px_-4px_rgba(71,245,156,0.55)] hover:bg-[#5ef9ab] hover:shadow-[0_0_36px_-2px_rgba(71,245,156,0.75)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060708]"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Transmit Message</span>
            </>
          )}
        </button>

        <span className="font-mono text-[11px] text-zinc-500">
          Direct response within 24h
        </span>
      </div>
    </form>
  );
}