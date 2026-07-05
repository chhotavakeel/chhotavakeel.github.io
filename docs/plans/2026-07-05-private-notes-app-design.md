# Private Notes App — Design Plan

**Date:** 2026-07-05
**For:** Pranav Butalia
**Status:** Draft for review

## Summary

The existing public site (this repo, `chhotavakeel.github.io` → pranavbutalia.com, Jekyll on GitHub Pages) stays exactly as it is. A new, separate system adds a private, password-protected notes app on a subdomain (e.g. `notes.pranavbutalia.com`), hosted on Oracle Cloud free tier. It serves Pranav's private Obsidian vault: daily notes, full markdown editing from the phone, task checkboxes that persist, an aggregated task view, and task rollover. Git is the sync bridge between the app and Obsidian on the Mac. An MCP interface for agent access is designed for, but not built yet.

## Topology: two repos, two vaults

| | Public | Private |
|---|---|---|
| Repo | `chhotavakeel.github.io` (public, unchanged) | `pranav-private-notes` (new, **private** GitHub repo) |
| Obsidian vault | Existing vault rooted at this repo (`_notes/Public` etc.) | New second vault = a clone of the private repo |
| Rendered by | Jekyll / GitHub Pages | The new notes app |
| URL | pranavbutalia.com | notes.pranavbutalia.com |
| Editors | Obsidian on Mac (+ any editor) via git push | Obsidian on Mac via git; the web app on phone |

Obsidian supports multiple vaults, so on the Mac Pranav opens whichever vault he's working in. Nothing private ever touches the public repo, and nothing about the public workflow changes.

### Private repo layout (adjust to match Pranav's sample files when provided)

```
pranav-private-notes/
├── Daily/              # daily notes, YYYY-MM-DD.md (match his Obsidian daily-notes settings)
├── Notes/              # everything else
├── Templates/
│   └── daily.md        # daily-note template (Pranav to supply structure)
└── .obsidian/          # vault config — gitignore workspace files, commit shared settings
```

**Open inputs from Pranav:** sample vault files (naming, frontmatter, folder conventions) and the daily-note template. The app must match whatever his Obsidian daily-notes plugin produces so both tools create identical files.

## The notes app

A single small Node.js app (Fastify or Express), server-rendered, mobile-first. No database — **the markdown files in the private repo are the only source of truth**. A git clone is a complete backup.

### Components

1. **Auth** — one password, argon2/bcrypt hash in env config, long-lived signed session cookie (~90 days) so the phone rarely re-prompts. Rate-limited login. Everything except `/login` requires the session. HTTPS via Caddy (automatic Let's Encrypt) in front of the app.

2. **Renderer** — `markdown-it` with plugins for:
   - Task checkboxes (`- [ ]` / `- [x]`) rendered as live checkboxes
   - Wiki-links `[[Note Name]]` resolving to private notes
   - YAML frontmatter (tags, dates)
   - Obsidian conventions per Pranav's sample files (callouts, embeds — scope after seeing samples)

3. **Editor** — full editing of any note: a mobile-friendly textarea/CodeMirror view with a save button, plus new-note creation. Reading view is the default; edit is one tap away. Checkbox taps in reading view write straight through to the file without entering edit mode.

4. **Daily notes** — `/today` opens today's note, creating it from `Templates/daily.md` if absent, with unfinished tasks from previous daily notes rolled in (rollover marks the task in the old note, e.g. `- [>]`, so it isn't double-counted — exact convention to match Pranav's preference).

5. **Tasks** — `/tasks` scans the vault for open checkboxes and shows them grouped by note, each tickable in place. Computed on request with a small in-memory cache invalidated on any write/pull; trivial at personal-vault scale.

6. **Git bridge** — the app holds a clone of the private repo (deploy key with write access):
   - **On write** (save, checkbox, new note): write file → `git commit` (message like `app: update Daily/2026-07-05.md`) → push (async, debounced).
   - **On read**: `git pull --rebase` on a short interval (e.g. every 60s) and before rendering `/today` and `/tasks`, so Mac-side edits appear quickly.
   - **Conflicts**: single user makes them rare. On a rebase conflict, keep both versions (conflict markers committed to a `conflict/` copy, original restored from remote) and surface a banner in the app. Never silently drop content.

### Designed-for-later: MCP

All note/task operations (read note, write note, append to daily note, list open tasks, toggle task) live in one internal service module with a clean function API — routes are thin wrappers over it. The future MCP server (Streamable HTTP endpoint on the same app, token-authenticated) wraps the same module. No MCP code is built now; the seam is the deliverable.

## Deployment (Oracle Cloud free tier)

- One Always-Free ARM VM (Ampere A1 — generous: up to 4 OCPU/24GB, far more than needed).
- Docker Compose: `caddy` (TLS, reverse proxy) + `notes-app`. The private-repo clone lives on a mounted volume.
- DNS: `A` record for `notes.pranavbutalia.com` → the VM's IP (public apex stays pointed at GitHub Pages).
- Secrets via env file on the VM: password hash, session secret, GitHub deploy key.
- OCI security list: only 80/443 (and SSH from Pranav's IP) open.
- Backups are inherent: the private GitHub repo is the canonical copy; the VM is disposable.

## What is explicitly out of scope

- Any change to this public repo, the Jekyll build, or the Obsidian-to-Pages workflow.
- Multi-user support, sharing, or granular permissions — one password, one user.
- A database, search index, or sync protocol beyond git.
- Building the MCP server (designed for only).

## Implementation phases

1. **Repo & vault setup** — create the private repo, agree layout with Pranav's sample files, set up the second Obsidian vault on the Mac with obsidian-git (or his preferred push/pull habit).
2. **App core** — auth, rendering, browsing notes; deploy to OCI behind Caddy end-to-end early.
3. **Editing & git bridge** — save/create from the browser, commit/push/pull loop, conflict handling.
4. **Daily notes & tasks** — template creation, `/today`, `/tasks`, checkbox write-through, rollover.
5. **Polish** — mobile ergonomics (PWA manifest so it installs to the home screen), pull-interval tuning, conflict banner.

Each phase ends deployed and usable; phase 2 alone already gives phone access to the private vault read-only behind a login.

## Risks / open questions

- **Daily-note conventions must match Obsidian exactly** (filename format, folder, template variables) — blocked on Pranav's samples.
- **Rollover marker convention** (`- [>]` vs delete-and-move) — Pranav to choose.
- **Obsidian sync cadence on the Mac**: if he doesn't push often, phone and Mac diverge harmlessly until he does; obsidian-git with auto-pull/push is the smoothest option.
- This plan file lives in the public repo — it contains no secrets, but move it to the private repo if that feels wrong.
