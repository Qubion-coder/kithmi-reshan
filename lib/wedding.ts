export const WEDDING = {
  brideName: 'Kithmi',
  groomName: 'Reshan',
};

export const GUEST_PREFIXES = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'] as const;
export type GuestPrefix = (typeof GUEST_PREFIXES)[number];

/**
 * Combines prefix and name into the name shown to the guest.
 * "Dear" is a greeting style, not a title, so it adds nothing here —
 * the message greeting already starts with "Dear".
 */
export function formatGuestName(prefix: GuestPrefix, rawName: string): string {
  const name = rawName.trim().replace(/\s+/g, ' ');
  if (!name) return '';
  switch (prefix) {
    case 'Family':
      return `${name} and Family`;
    case 'Dear':
      return name;
    default:
      return `${prefix} ${name}`;
  }
}

export function buildInvitationLink(baseUrl: string, displayName: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/${encodeURIComponent(displayName)}`;
}

export function decodeGuestSegment(segment: string | undefined): string {
  if (!segment) return '';
  try {
    return decodeURIComponent(segment).trim();
  } catch {
    return segment.trim();
  }
}

export function buildInvitationMessage(displayName: string, link: string): string {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${WEDDING.groomName} & ${WEDDING.brideName}`;
}
