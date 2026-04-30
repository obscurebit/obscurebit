# AGENTS.md

## Mixpanel Analytics

- Mode: Quick Start.
- Platform: static web / browser JavaScript.
- SDK: Mixpanel browser SDK, loaded asynchronously in `script.js`.
- Project token location: official Mixpanel bootstrap snippets in `index.html` and `404.html`.
- CDP or warehouse routing: none.
- Consent gate: none. Site owner confirmed Virginia, USA based.
- Value Moment: `project_clicked`, fired when a visitor opens one of the experiment links.

Tracked events:

| Event | Trigger |
| --- | --- |
| `page_viewed` | Mixpanel SDK initializes on page load. |
| `project_clicked` | Visitor clicks an experiment card. |
| `trace_mode_enabled` | URL contains `trace=1`. |
| `easter_egg_triggered` | Visitor triggers hidden interactions such as `418`, `sudo`, `obscure`, or rapid delete/backspace. |
| `sudo_password_submitted` | Visitor submits the fake sudo password prompt. Tracks only `result`, not the entered password. |

Conventions for future tracking:

- Use `snake_case` event and property names.
- Do not track raw passwords, emails, IP addresses, or other sensitive values.
- Keep `project_clicked` as the primary Value Moment unless the site goal changes.
- Add new events close to the triggering UI action in `script.js`.
