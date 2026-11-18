<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project decisions
- Keep industrial liaison data in focused, purpose-specific tables and pages; use the existing browser data client with database row-level security for shared staff workflows.
- Keep the application’s staff workspace behind a client-session route gate, with private reads and writes enforced again by authenticated database policies.
