/* =========================================================
   THE NEW WAVE — Freshers Celebration
   Site interactions
   ========================================================= */

(function () {
  "use strict";

  /* -------------------------------------------------------
     🔧 EVENT CONFIG — edit these two lines for your event
  ------------------------------------------------------- */
  // Format: new Date(YYYY, MONTH_INDEX(0-11), DAY, HOUR, MINUTE)
  const EVENT_DATE = new Date(2026, 7, 20, 10, 0); // 15 Sep 2026, 10:00 AM (placeholder — update to the real date)
  const EVENT_DURATION_HOURS = 3;
  const EVENT_TITLE = "The New Wave — Freshers Celebration";
  const EVENT_LOCATION = "AI Classroom, Marudhar Kesari Jain College for Women, Vaniyambadi";
  const EVENT_DETAILS = "Freshers Celebration by the Department of B.Sc. Artificial Intelligence. Dress code: Open — colourful, cheerful & expressive!";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------------
     Curtain reveal
  ------------------------------------------------------- */
  const stage = document.getElementById("curtainStage");
  const openBtn = document.getElementById("openInvite");
  const audioToggle = document.getElementById("audioToggle");
  const bgm = document.getElementById("bgm");
  let opened = false;

  function fireConfettiBurst() {
    if (typeof confetti !== "function") return;
    const colors = ["#e50914", "#cfa347", "#f4efe4", "#8a0710"];

    confetti({
      particleCount: 120,
      spread: 100,
      startVelocity: 45,
      origin: { y: 0.35 },
      colors,
      scalar: 1
    });

    // side bursts for a fuller celebratory feel
    setTimeout(() => {
      confetti({ particleCount: 60, angle: 60, spread: 70, origin: { x: 0, y: 0.5 }, colors });
      confetti({ particleCount: 60, angle: 120, spread: 70, origin: { x: 1, y: 0.5 }, colors });
    }, 250);
  }

  function tryPlayAudio() {
    if (!bgm) return;
    // Only attempt playback if a real source has been provided.
    bgm.volume = 0.35;
    const playPromise = bgm.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          audioToggle.hidden = false;
          audioToggle.setAttribute("aria-pressed", "true");
        })
        .catch(() => {
          // Autoplay blocked or no audio file present — still expose the control
          // so the user can start music manually once a track is added.
          audioToggle.hidden = false;
          audioToggle.setAttribute("aria-pressed", "false");
        });
    }
  }

  function openCurtains() {
    if (opened) return;
    opened = true;

    stage.classList.add("is-open");
    fireConfettiBurst();
    tryPlayAudio();

    // Reveal the audio control regardless of playback success
    if (audioToggle) audioToggle.hidden = false;

    const transitionMs = prefersReducedMotion ? 0 : 1500;
    setTimeout(() => {
      stage.classList.add("is-fully-open");
      document.getElementById("mainContent").scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    }, transitionMs);
  }

  if (openBtn) {
    openBtn.addEventListener("click", openCurtains);
    openBtn.addEventListener("keyup", (e) => {
      if (e.key === "Enter" || e.key === " ") openCurtains();
    });
  }

  if (audioToggle) {
    audioToggle.addEventListener("click", () => {
      if (!bgm) return;
      if (bgm.paused) {
        bgm.play().catch(() => {});
        audioToggle.setAttribute("aria-pressed", "true");
      } else {
        bgm.pause();
        audioToggle.setAttribute("aria-pressed", "false");
      }
    });
  }

  /* -------------------------------------------------------
     Scroll-triggered reveal animations
  ------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  /* -------------------------------------------------------
     Countdown timer
  ------------------------------------------------------- */
  const cdDays = document.getElementById("cd-days");
  const cdHours = document.getElementById("cd-hours");
  const cdMins = document.getElementById("cd-mins");
  const cdSecs = document.getElementById("cd-secs");
  const countdownDateEl = document.getElementById("countdownDate");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function formatEventDate(date) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options) + " · 10:00 AM";
  }

  if (countdownDateEl) countdownDateEl.textContent = formatEventDate(EVENT_DATE);

  function updateCountdown() {
    const now = new Date();
    let diff = EVENT_DATE.getTime() - now.getTime();

    if (diff <= 0) {
      cdDays.textContent = "00";
      cdHours.textContent = "00";
      cdMins.textContent = "00";
      cdSecs.textContent = "00";
      if (countdownDateEl) countdownDateEl.textContent = "The celebration has begun! 🎉";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);
    const secs = Math.floor(diff / 1000);

    cdDays.textContent = pad(days);
    cdHours.textContent = pad(hours);
    cdMins.textContent = pad(mins);
    cdSecs.textContent = pad(secs);
  }

  if (cdDays) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* -------------------------------------------------------
     RSVP form
  ------------------------------------------------------- */
  const rsvpForm = document.getElementById("rsvpForm");
  const rsvpFields = document.getElementById("rsvpFields");
  const rsvpSuccess = document.getElementById("rsvpSuccess");
  const rsvpNameEcho = document.getElementById("rsvpNameEcho");

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("studentName");
      const rollInput = document.getElementById("rollSection");
      let valid = true;

      [nameInput, rollInput].forEach((input) => {
        if (!input.value.trim()) {
          input.classList.add("is-invalid");
          valid = false;
        } else {
          input.classList.remove("is-invalid");
        }
      });

      if (!valid) return;

      rsvpNameEcho.textContent = nameInput.value.trim().split(" ")[0] || "Fresher";
      rsvpFields.hidden = true;
      rsvpSuccess.hidden = false;

      fireConfettiBurst();
    });

    // Clear invalid state as the user types
    rsvpForm.querySelectorAll(".form-control").forEach((input) => {
      input.addEventListener("input", () => input.classList.remove("is-invalid"));
    });
  }

  /* -------------------------------------------------------
     Add to Google Calendar
  ------------------------------------------------------- */
  const calendarBtn = document.getElementById("addToCalendar");

  function toGCalDate(date) {
    return date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z");
  }

  if (calendarBtn) {
    calendarBtn.addEventListener("click", () => {
      const start = EVENT_DATE;
      const end = new Date(EVENT_DATE.getTime() + EVENT_DURATION_HOURS * 60 * 60 * 1000);

      const url = new URL("https://calendar.google.com/calendar/render");
      url.searchParams.set("action", "TEMPLATE");
      url.searchParams.set("text", EVENT_TITLE);
      url.searchParams.set("dates", `${toGCalDate(start)}/${toGCalDate(end)}`);
      url.searchParams.set("details", EVENT_DETAILS);
      url.searchParams.set("location", EVENT_LOCATION);

      window.open(url.toString(), "_blank", "noopener");
    });
  }
})();
