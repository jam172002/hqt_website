/**
 * Invisible-to-humans spam trap (SRS Section 46 "spam protection"). Bots
 * that blindly fill every field on a form tend to fill this one too; real
 * visitors never see or reach it (off-screen, not display:none - some bots
 * specifically skip display:none fields, off-screen positioning doesn't
 * tip them off the same way). Positioned off-screen rather than
 * display:none/visibility:hidden for that reason; aria-hidden and
 * tabIndex=-1 keep it out of the accessibility tree and tab order for
 * anyone using a screen reader or keyboard.
 *
 * Pair with a submit-time check: if this field has any value, treat the
 * submission as spam (see TrialForm/ContactForm's handleSubmit).
 */
export const HONEYPOT_FIELD_NAME = "company_website";

export default function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
    >
      <label htmlFor={HONEYPOT_FIELD_NAME}>Company website</label>
      <input
        type="text"
        id={HONEYPOT_FIELD_NAME}
        name={HONEYPOT_FIELD_NAME}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
