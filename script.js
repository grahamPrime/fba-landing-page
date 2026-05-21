// FBA Landing Page — Netlify AJAX form + inline success

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("waitlist-form");
  const success = document.getElementById("waitlist-success");

  const consultingButtons = document.querySelectorAll(".js-consulting-cta");
  const stageSelect = document.getElementById("current_stage");

  consultingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (stageSelect) {
        stageSelect.value = "Interested in consulting";
      }
    });
  });

  const vimeoIframe = document.getElementById("fba-vimeo-player");
  const videoStage = document.querySelector(".video-stage");

  if (vimeoIframe && videoStage && window.Vimeo && window.Vimeo.Player) {
    const player = new Vimeo.Player(vimeoIframe);

    player.on("ended", () => {
      videoStage.classList.add("video-ended");
    });
  }

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const firstName = document.getElementById("first_name")?.value || "";
      const lastName = document.getElementById("last_name")?.value || "";
      const email = document.getElementById("email")?.value || "";
      const subject = document.getElementById("email_subject");

      if (subject) {
        subject.value = `Waitlist application from ${firstName} ${lastName} ${email}`.trim();
      }

      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton ? submitButton.textContent : "";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
        submitButton.style.opacity = "0.75";
      }

      try {
        const formData = new FormData(form);

        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        });

        form.classList.add("hidden");

        if (success) {
          success.classList.remove("hidden");
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } catch (error) {
        alert("Something went wrong submitting the form. Please try again.");

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
          submitButton.style.opacity = "1";
        }
      }
    });
  }
});
