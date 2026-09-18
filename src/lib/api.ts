const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api/v1";

export interface PaginatedResult<T> {
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

export interface Course {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description?: string;
  suitableFor: string | null;
  ageGroup: string | null;
  teachingMethod?: string | null;
  classFormat?: string | null;
  status: string;
  sortOrder: number;
}

export interface CourseSection {
  id: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface CourseFaq {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
}

export interface CourseTeacherSummary {
  id: string;
  firstName: string;
  lastName: string;
  shortBio: string | null;
}

export interface CourseDetail extends Course {
  sections: CourseSection[];
  faqs: CourseFaq[];
  teachers: CourseTeacherSummary[];
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  shortBio: string | null;
  qualification: string;
  experienceYears: number | null;
  teachingPhilosophy: string | null;
  countryCode: string;
  status: string;
}

export interface Testimonial {
  id: string;
  name: string;
  countryCode: string;
  rating: number;
  review: string;
  category: string | null;
  courseId: string | null;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sortOrder: number;
}

export interface Package {
  id: string;
  name: string;
  description: string | null;
  classesPerPeriod: number | null;
  classDurationMin: number | null;
  billingPeriod: "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY";
  price: number;
  currency: string;
}

export interface TrialRequestInput {
  studentName: string;
  studentAge: number;
  guardianName?: string;
  countryCode: string;
  whatsapp: string;
  email?: string;
  phone?: string;
  courseId: string;
  preferredDays: string[];
  preferredTime?: string;
  timezone: string;
  message?: string;
  specialRequirements?: string;
}

export interface ContactInquiryInput {
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  subject: string;
  message: string;
}

export interface MediaAttachment {
  id: string;
  mediaFileId: string;
  entityType: string;
  entityId: string;
  file: { id: string; mimeType: string; visibility: string };
}

/** Entity types the Platform media system accepts attachments for (must match the backend's allow-list). */
export type MediaEntityType = "STUDENT_PROFILE" | "TEACHER_PROFILE" | "COURSE" | "TESTIMONIAL";

/** An admin-managed content block (SRS "Website Content Management"), keyed by name (e.g. "home.hero"). */
export interface WebsiteContentBlock {
  key: string;
  title: string | null;
  content: string | null;
  data: Record<string, unknown> | null;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fieldErrors?: Array<{ field: string; message: string }>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    cache: init?.method ? "no-store" : "no-store",
  });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    let fieldErrors: Array<{ field: string; message: string }> | undefined;
    try {
      const body = await res.json();
      message = body?.error?.message ?? message;
      fieldErrors = body?.error?.fieldErrors;
    } catch {
      // response had no JSON body
    }
    throw new ApiError(message, res.status, fieldErrors);
  }

  if (res.status === 204) {
    return undefined as T;
  }
  return res.json() as Promise<T>;
}

export { ApiError };

export const api = {
  courses: {
    list: () => apiFetch<PaginatedResult<Course>>("/courses?limit=50"),
    bySlug: (slug: string) => apiFetch<CourseDetail>(`/courses/${slug}`),
  },
  teachers: {
    list: () => apiFetch<PaginatedResult<Teacher>>("/people/teachers?limit=50"),
    byId: (id: string) => apiFetch<Teacher>(`/people/teachers/${id}`),
  },
  testimonials: {
    list: () => apiFetch<PaginatedResult<Testimonial>>("/cms/testimonials?limit=50"),
  },
  faqs: {
    list: () => apiFetch<Faq[]>("/cms/faqs"),
  },
  packages: {
    list: () => apiFetch<Package[]>("/billing/packages"),
  },
  crm: {
    submitTrialRequest: (input: TrialRequestInput) =>
      apiFetch("/crm/trial-requests", { method: "POST", body: JSON.stringify(input) }),
    submitContactInquiry: (input: ContactInquiryInput) =>
      apiFetch("/crm/contact-inquiries", { method: "POST", body: JSON.stringify(input) }),
  },
  media: {
    /** Attachments for one entity - the media API already filters PRIVATE files out for anonymous callers. */
    listForEntity: (entityType: MediaEntityType, entityId: string) =>
      apiFetch<MediaAttachment[]>(`/media/entity/${entityType}/${entityId}`),
    /** Direct, public, unauthenticated file URL - safe to use as an <img src> for a PUBLIC file. */
    fileUrl: (mediaFileId: string) => `${API_BASE_URL}/media/${mediaFileId}/file`,
  },
  content: {
    /** Public read of one content block - 404s until an admin publishes that key. */
    get: (key: string) => apiFetch<WebsiteContentBlock>(`/cms/content/${key}`),
  },
};

/** Content block for `key`, or null if it doesn't exist/isn't published yet - callers fall back to hardcoded copy. */
export async function getContentBlock(key: string): Promise<WebsiteContentBlock | null> {
  try {
    return await api.content.get(key);
  } catch {
    return null;
  }
}

/** First image attachment for an entity, or null if none is attached yet (falls back to a placeholder). */
export async function firstImageUrl(entityType: MediaEntityType, entityId: string): Promise<string | null> {
  try {
    const attachments = await api.media.listForEntity(entityType, entityId);
    const image = attachments.find((a) => a.file.mimeType.startsWith("image/"));
    return image ? api.media.fileUrl(image.mediaFileId) : null;
  } catch {
    return null;
  }
}
