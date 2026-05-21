// Force fresh page loads to start at top unless an intentional hash anchor is present.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
});

// FBA Landing Page vNext r2 — lightweight behavior only

document.addEventListener("DOMContentLoaded", () => {

  const vimeoIframe = document.getElementById("fba-vimeo-player");
  const videoStage = document.querySelector(".video-stage");

  if (vimeoIframe && videoStage && window.Vimeo && window.Vimeo.Player) {
    const player = new Vimeo.Player(vimeoIframe);

    player.on("ended", () => {
      videoStage.classList.add("video-ended");
    });
  }


const form = document.querySelector(".waitlist-form");


  const consultingButtons = document.querySelectorAll(".js-consulting-cta");
  const stageSelect = document.getElementById("current_stage");

  consultingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (stageSelect) {
        stageSelect.value = "Interested in consulting";
      }
    });
  });

  if (form) {
    form.addEventListener("submit", () => {
      const firstName = document.getElementById("first_name")?.value || "";
      const lastName = document.getElementById("last_name")?.value || "";
      const email = document.getElementById("email")?.value || "";
      const subject = document.getElementById("email_subject");

      if (subject) {
        subject.value = `Waitlist application from ${firstName} ${lastName} ${email}`.trim();
      }

      if (window.fbaAnalyticsDebug) {
        console.log("FBA waitlist form submitted", subject?.value);
      }
    });
  }
});
