(() => {
  const MIXPANEL_TOKEN = "507278c7e96ec74c3a554c73db81fa8f";
  const secret = "obscure";
  const poemSecret = "418";
  const sudoSecret = "sudo";
  const statusLine = document.querySelector("#status-line");
  const defaultStatus = statusLine?.textContent ?? "";
  const egg = document.querySelector(".easter-egg");
  const sudoOverlay = document.querySelector(".sudo-overlay");
  const sudoOutput = document.querySelector(".sudo-output");
  const sudoCommandsDenied = [
    "mounting /dev/blackglass -> /experiments",
    "scanning entropy sectors: 03 17 23 31",
    "opening socket: hidden-corners.local:418",
    "handshake: kettle/1.1 ceremonial",
    "grep -R \"alive\" ./bits ./oav ./dj",
    "found 3 active signals, 27 reserved frequencies",
    "loading module: rhythm_clock.ko",
    "loading module: synthetic_weather.ko",
    "loading module: daily_dispatch.ko",
    "checking permissions on /root/obscurebit",
    "capability audit: CAP_CURIOUS required",
    "escalating curiosity token",
    "token rejected: insufficient wonder",
    "rolling back imaginary privileges",
    "writing incident report to /var/log/nope.log",
    "access denied. but nice try."
  ];
  const getSudoCommandsCurious = () => {
    const traceEnabled = document.body.classList.contains("trace-mode");

    return [
      "mounting /dev/blackglass -> /experiments",
      "scanning entropy sectors: 03 17 23 31",
      "opening socket: hidden-corners.local:418",
      "handshake: kettle/1.1 ceremonial",
      "credential accepted: curiosity",
      traceEnabled
        ? "capability audit: CAP_CURIOUS present"
        : "capability audit: CAP_CURIOUS present, but /?trace=0",
      ...(traceEnabled ? ["trace mode enabled: /?trace=1"] : []),
      "granting partial clearance: read-only wonder",
      "grep -R \"alive\" ./bits ./oav ./dj",
      "found 3 active signals, 27 reserved frequencies",
      "checking /root/obscurebit",
      "root remains sealed; future payload unavailable",
      "writing clue to /var/tmp/next-signal",
      "dead drop: /signal.txt",
      "access denied. but nice try. deeper later."
    ];
  };
  let buffer = "";
  let numericBuffer = "";
  let deleteHits = [];
  let timer = 0;
  let poemTimer = 0;
  let sudoTimer = 0;
  let sudoActive = false;
  let sudoAwaitingPassword = false;
  let sudoPassword = "";
  let sudoPasswordLength = 0;
  let analyticsReady = false;
  const analyticsQueue = [];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const analyticsProperties = () => ({
    path: window.location.pathname,
    search: window.location.search,
    title: document.title,
    trace_enabled: document.body.classList.contains("trace-mode")
  });

  const track = (eventName, properties = {}) => {
    const payload = { ...analyticsProperties(), ...properties };

    if (analyticsReady && window.mixpanel?.track) {
      window.mixpanel.track(eventName, payload);
      return;
    }

    if (analyticsQueue.length < 50) {
      analyticsQueue.push([eventName, payload]);
    }
  };

  const loadAnalytics = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
    script.onload = () => {
      if (!window.mixpanel?.init) {
        return;
      }

      window.mixpanel.init(MIXPANEL_TOKEN, {
        debug: ["localhost", "127.0.0.1"].includes(window.location.hostname),
        persistence: "localStorage"
      });
      analyticsReady = true;
      track("page_viewed", {
        referrer_host: document.referrer ? new URL(document.referrer).hostname : ""
      });

      while (analyticsQueue.length > 0) {
        const [eventName, properties] = analyticsQueue.shift();
        window.mixpanel.track(eventName, properties);
      }
    };
    document.head.append(script);
  };

  loadAnalytics();

  const enableTrace = (source = "url") => {
    document.body.classList.add("trace-mode");
    document.body.dataset.trace = "enabled";
    if (statusLine) {
      statusLine.textContent = "trace enabled: packets are ceremonial, routes are real";
    }
    revealSignal("trace=enabled; diagnostic ghosts are visible");
    track("trace_mode_enabled", { source });
  };

  if (window.location.href.includes("trace=1")) {
    window.setTimeout(() => enableTrace("url"), 250);
  }

  document.querySelectorAll(".project-card[href]").forEach((card) => {
    card.addEventListener("click", () => {
      track("project_clicked", {
        project: card.querySelector("h2")?.textContent?.trim() ?? "",
        destination: card.href,
        project_number: card.querySelector(".project-number")?.textContent?.trim() ?? ""
      });
    });
  });

  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        card.style.setProperty("--tilt-x", `${(-y * 1.6).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${(x * 1.8).toFixed(2)}deg`);
      });

      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });
  }

  if (!reducedMotion && statusLine) {
    window.setInterval(() => {
      if (document.body.classList.contains("signal-open") || !sudoOverlay?.hidden) {
        return;
      }

      const current = statusLine.textContent ?? "";
      if (current.length < 8) {
        return;
      }

      const index = Math.floor(Math.random() * current.length);
      const replacement = current[index] === " " ? " " : "█";
      statusLine.textContent = `${current.slice(0, index)}${replacement}${current.slice(index + 1)}`;

      window.setTimeout(() => {
        statusLine.textContent = current;
      }, 90);
    }, 7600);
  }

  const revealSignal = (message = "418 - obscure bits encountered") => {
    document.body.classList.add("signal-open");
    if (egg) {
      egg.textContent = message;
    }
    if (statusLine) {
      statusLine.textContent = message;
    }

    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      document.body.classList.remove("signal-open");
      if (statusLine) {
        statusLine.textContent = document.body.classList.contains("trace-mode")
          ? "trace enabled: packets are ceremonial, routes are real"
          : defaultStatus;
      }
    }, 4200);
  };

  const revealPoem = () => {
    document.body.classList.add("poem-open");
    revealSignal("http/1.1 418 - ai teapot refuses coffee; serving signal instead");
    track("easter_egg_triggered", { egg: "ai_teapot_poem" });

    window.clearTimeout(poemTimer);
    poemTimer = window.setTimeout(() => {
      document.body.classList.remove("poem-open");
    }, 6200);
  };

  const closeSudo = () => {
    if (!sudoOverlay || !sudoOutput) {
      return;
    }

    window.clearTimeout(sudoTimer);
    sudoOverlay.hidden = true;
    sudoOverlay.classList.remove("is-complete");
    sudoOutput.textContent = "";
    sudoActive = false;
    sudoAwaitingPassword = false;
    sudoPassword = "";
    sudoPasswordLength = 0;
  };

  const continueSudo = (commands) => {
    let index = 0;
    const writeNextLine = () => {
      sudoOutput.textContent += `${commands[index]}\n`;
      index += 1;

      if (index >= commands.length) {
        sudoOverlay.classList.add("is-complete");
        sudoActive = false;
        return;
      }

      const delay = index > commands.length - 4 ? 620 : 120 + Math.random() * 180;
      sudoTimer = window.setTimeout(writeNextLine, delay);
    };

    sudoTimer = window.setTimeout(writeNextLine, 260);
  };

  const renderPasswordPrompt = () => {
    if (!sudoOutput) {
      return;
    }

    sudoOutput.textContent = `$ sudo ./wake --node obscurebit\n[sudo] password for curious: ${"*".repeat(sudoPasswordLength)}`;
  };

  const runSudo = () => {
    if (!sudoOverlay || !sudoOutput || sudoActive) {
      return;
    }

    sudoActive = true;
    sudoAwaitingPassword = true;
    sudoPassword = "";
    sudoPasswordLength = 0;
    sudoOverlay.hidden = false;
    sudoOverlay.classList.remove("is-complete");
    renderPasswordPrompt();
    revealSignal("sudo: password required; audit trail enabled");
    track("easter_egg_triggered", { egg: "sudo_terminal" });
  };

  const handleSudoPassword = (event) => {
    if (!sudoAwaitingPassword || !sudoOutput) {
      return false;
    }

    event.preventDefault();

    if (event.key === "Enter") {
      sudoAwaitingPassword = false;
      const curious = sudoPassword.toLowerCase() === "curiosity";
      sudoOutput.textContent += "\nverifying credential against /etc/shadowbox\n";
      sudoOutput.textContent += curious
        ? "credential hash: match enough for a clue\n"
        : "credential hash: mismatch\n";
      track("sudo_password_submitted", {
        result: curious ? "curiosity" : "denied"
      });
      continueSudo(curious ? getSudoCommandsCurious() : sudoCommandsDenied);
      sudoPassword = "";
      return true;
    }

    if (event.key === "Backspace" || event.key === "Delete") {
      sudoPassword = sudoPassword.slice(0, -1);
      sudoPasswordLength = Math.max(0, sudoPasswordLength - 1);
      renderPasswordPrompt();
      return true;
    }

    if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      sudoPassword = `${sudoPassword}${event.key}`.slice(0, 32);
      sudoPasswordLength = sudoPassword.length;
      renderPasswordPrompt();
      return true;
    }

    return true;
  };

  sudoOverlay?.addEventListener("click", (event) => {
    if (!sudoActive && event.target === sudoOverlay) {
      closeSudo();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sudoOverlay && !sudoOverlay.hidden) {
      closeSudo();
      return;
    }

    if (handleSudoPassword(event)) {
      return;
    }

    if (event.key === "Delete" || event.key === "Backspace") {
      const now = Date.now();
      deleteHits = [...deleteHits, now].filter((hit) => now - hit < 1400);
      if (deleteHits.length >= 5) {
        revealSignal("rm: cannot remove './experiments': permission denied; try sudo curiosity");
        track("easter_egg_triggered", { egg: "delete_permission_denied" });
        deleteHits = [];
      }
      return;
    }

    if (event.metaKey || event.ctrlKey || event.altKey || event.key.length !== 1) {
      return;
    }

    const key = event.key.toLowerCase();
    buffer = `${buffer}${key}`.slice(-secret.length);
    numericBuffer = `${numericBuffer}${key}`.slice(-poemSecret.length);

    if (buffer.endsWith(secret)) {
      revealSignal();
      track("easter_egg_triggered", { egg: "obscure" });
      buffer = "";
    }

    if (numericBuffer === poemSecret) {
      revealPoem();
      numericBuffer = "";
    }

    if (buffer.endsWith(sudoSecret)) {
      runSudo();
      buffer = "";
    }

  });
})();
