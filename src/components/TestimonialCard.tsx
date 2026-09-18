import { firstImageUrl, type Testimonial } from "@/lib/api";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-accent-500" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" className="h-4 w-4">
          <path
            strokeWidth={1.5}
            strokeLinejoin="round"
            d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85L10 1.5z"
          />
        </svg>
      ))}
    </div>
  );
}

export default async function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const photoUrl = await firstImageUrl("TESTIMONIAL", testimonial.id);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
      <Stars rating={testimonial.rating} />
      <p className="mt-4 flex-1 text-sm leading-6 text-charcoal-light">&ldquo;{testimonial.review}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3 border-t border-primary-50 pt-4">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={testimonial.name} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-600">
            {testimonial.name.charAt(0)}
          </span>
        )}
        <div>
          <p className="font-heading text-sm font-semibold text-charcoal">{testimonial.name}</p>
          <p className="text-xs text-charcoal-light">{testimonial.countryCode}</p>
        </div>
      </div>
    </div>
  );
}
