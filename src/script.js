import { DateTime } from "luxon";

const container = document.getElementById("events");
const url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQnqKosojxSivxV-55ztpnqJ1adQ0zeSGBmNvysyhJvaBbto-BspZhzJcXIip_WpPU_BC2nK0zUK2t_/pub?output=csv";

fetch(url).then(async r => {
  // Split on newlines, remove header
  const text = (await r.text()).split("\r\n").slice(1);

  // Transform text into objects with dates
  const events = text.map(event => {
    const newEvent = event.split(",");
    newEvent[1] = DateTime.fromISO(newEvent[1]);
    return newEvent;
  });

  // Sort by date
  const sorted = events.sort((a, b) => a[1] - b[1]);

  // Create and append elements for each event
  for (const event of sorted) {
    const element = document.createElement("div");
    element.classList.add("event", event[0]);

    const time = document.createElement("time");
    time.dateTime = event[1].toISO();
    time.textContent = event[1]
      .setLocale("es-AR")
      .toFormat("EEE d 'de' MMM 'a las' t");
    element.appendChild(time);

    const grow = document.createElement("div");
    grow.className = "grow";
    element.appendChild(grow);

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = event[2];
    element.appendChild(title);

    container.appendChild(element);
  }
});
