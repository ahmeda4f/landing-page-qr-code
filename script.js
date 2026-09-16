function cairoDateString() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE_CONFIG.TIME_ZONE,

    year: "numeric",

    month: "2-digit",

    day: "2-digit",
  });

  return formatter.format(new Date());
}

function getConferenceDay() {
  const today = cairoDateString();

  if (today < SITE_CONFIG.DAY_1) {
    return "day1";
  }

  if (today === SITE_CONFIG.DAY_1) {
    return "day1";
  }

  return "day2";
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",

    month: "short",

    year: "numeric",
  }).format(date);
}

function render() {
  const day = getConferenceDay();
  const resources = SITE_CONFIG.resources.filter((item) =>
    item.showOn.includes(day),
  );
  const resourceGrid = document.getElementById("resourceGrid");

  const dayStatus = document.getElementById("dayStatus");

  const dayLabel = document.getElementById("dayLabel");

  const resourceCount = document.getElementById("resourceCount");

  const sectionNote = document.getElementById("sectionNote");

  const resourcesTitle = document.getElementById("resources-title");

  const heroTitle = document.getElementById("heroTitle");

  const heroIntro = document.getElementById("heroIntro");

  const footerTitle = document.getElementById("footerTitle");

  const footerText = document.getElementById("footerText");

  if (day === "day1") {
    dayStatus.innerHTML = `
        <span class="status-dot"></span>
        Interactive activity
      `;

    dayLabel.textContent = `Day 1 · ${formatDate(SITE_CONFIG.DAY_1)}`;

    resourceCount.textContent = "1 activity";

    heroTitle.innerHTML = `
        Can You Guess<br>
        <em>the Topic?</em>
      `;

    heroIntro.textContent =
      "Think you know what this research is about? Take part in the interactive activity and make your guess before exploring the research presentation.";

    resourcesTitle.textContent = "Take part";

    sectionNote.textContent =
      "Make your guess before the research is revealed.";

    footerTitle.textContent = "Thank you for taking part.";

    footerText.textContent =
      "Make your guess, then come back on Day 2 to explore the research presentation and materials.";
  } else {
    dayStatus.innerHTML = `
        <span class="status-dot"></span>
        Research presentation
      `;

    dayLabel.textContent = `Day 2 · ${formatDate(SITE_CONFIG.DAY_2)}`;

    resourceCount.textContent = `${resources.length} ${
      resources.length === 1 ? "resource" : "resources"
    }`;

    heroTitle.innerHTML = `
        ADHD Antenatal<br>
        <em>Risk Factors</em>
      `;

    heroIntro.textContent =
      "Explore the research presentation and access the materials prepared for this study.";

    resourcesTitle.textContent = "Explore the research";

    sectionNote.textContent =
      "Access the presentation and additional research materials below.";

    footerTitle.textContent = "Thank you for your interest in this research.";

    footerText.textContent =
      "For questions about the study or presentation, please contact the research team.";
  }

  resourceGrid.innerHTML = resources
    .map(
      (item, index) => `

        <a

          class="resource-card"

          href="${item.url}"

          target="_blank"

          rel="noopener noreferrer"

          aria-label="${item.title}"

          style="animation-delay: ${index * 70}ms"

        >

          <div class="resource-icon">

            ${item.icon}

          </div>


          <div class="resource-content">

            <h3>

              ${item.title}

            </h3>


            <p>

              ${item.description}

            </p>

          </div>


          <div class="arrow">

            →

          </div>

        </a>

      `,
    )
    .join("");
}

render();
