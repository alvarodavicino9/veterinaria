function pad(n) {
  return String(n).padStart(2, "0");
}

function toGCalStamp(d) {
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    "00Z"
  );
}

// Builds a Google Calendar "quick add" link for a date (YYYY-MM-DD) + time (HH:mm)
// in the visitor's local timezone.
export function googleCalendarLink({ title, details, location, date, time, durationMin = 30 }) {
  const [h, m] = time.split(":").map(Number);
  const [y, mo, da] = date.split("-").map(Number);
  const start = new Date(y, mo - 1, da, h, m);
  const end = new Date(start.getTime() + durationMin * 60000);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toGCalStamp(start)}/${toGCalStamp(end)}`,
    details: details || "",
    location: location || "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
