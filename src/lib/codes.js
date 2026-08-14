// Short human-friendly codes derived from internal ids, used so customers
// can reference their booking/order without exposing the full id.
// Strips separators (ids look like "apt_<ts36>_<rand5>") so the code is
// always a clean alphanumeric string.
export function shortCode(id) {
  return id ? id.replace(/[^a-zA-Z0-9]/g, "").slice(-6).toUpperCase() : "";
}
