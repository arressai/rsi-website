// ============================================================
// collectors.js — client-side password gate for the collector
// preview page.
//
// IMPORTANT SECURITY NOTE:
// This is a static HTML/CSS/JS site with no backend/server, so
// there is no way to truly "protect" this page from someone who
// is determined to view the source code — the images and text
// are still downloaded to the browser once unlocked, and a
// technically savvy visitor could read this file. This gate is
// meant as a simple, low-friction way to keep casual visitors
// and search engines out, and to make it clear the page is
// private. Do not use it for highly sensitive or exclusive
// content you can't afford to have seen without permission.
//
// To change the password:
// 1. Run this in a terminal: echo -n "yourNewPassword" | shasum -a 256
// 2. Copy the resulting hash and paste it below as PASSWORD_HASH.
// ============================================================

const PASSWORD_HASH = "d6721d7c2281eacccc9b25e6d132497cbf5f4000d40dd3bd9e7190649e908854"; // default password: arressai2026

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const gate = document.getElementById("gate");
  const content = document.getElementById("collectorContent");
  const form = document.getElementById("gateForm");
  const input = document.getElementById("gatePassword");
  const error = document.getElementById("gateError");

  // Stay unlocked for this browser session only (closing the tab
  // re-locks it; this is intentional for a "private send" link).
  const isUnlocked = sessionStorage.getItem("collectorUnlocked") === "true";
  if (isUnlocked) {
    gate.classList.add("is-hidden");
    content.classList.remove("is-hidden");
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    const hash = await sha256(value);
    if (hash === PASSWORD_HASH) {
      sessionStorage.setItem("collectorUnlocked", "true");
      gate.classList.add("is-hidden");
      content.classList.remove("is-hidden");
      error.classList.add("is-hidden");
    } else {
      error.classList.remove("is-hidden");
      input.value = "";
      input.focus();
    }
  });
});
