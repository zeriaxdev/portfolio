# Styles

`app/globals.css` imports these and defines nothing itself.

## Where do I change…

| I want to… | Open |
|---|---|
| a colour, in either theme | `tokens.css` — semantic block |
| a font size anywhere | `tokens.css` — type scale |
| page width, gutter, line length | `tokens.css` — layout |
| how headings or body text look | `typography.css` |
| a button, row, card, the nav bar | `components.css` |
| blog post / markdown styling | `prose.css` |
| a page layout: home, work frames, consoles, rows | `site.css` |

## Rules

1. **Components never hardcode a colour or size.** They use a token.
   `color: var(--fg-muted)`, never `color: #B5B5B5`.
2. **One class per text role.** `.t-body`, not `.t-body .t-small text-sm`.
   If a size isn't in `typography.css`, it shouldn't be on the page.
3. **Dark mode is tokens only.** `.dark` in `tokens.css` reassigns the same
   semantic names. No component should ever need a `dark:` variant.
4. **Tailwind for one-off layout** (`mt-8`, `flex`, `span-body`).
   **A class for anything repeated or multi-state** (`.btn` has 5 states).

## Typography

Four sizes. That is the whole scale.

```
--text-1  15px   labels, meta, footer
--text-2  18px   body, headings, links
--text-3  27px   page titles
--text-4  42px   hero (desktop)
```

```
.t-display   hero, once per page          42px
.t-title     page title                   27px
.t-heading   section / card heading       18px medium
.t-body      paragraphs                   18px
.t-small     labels, secondary            15px
.t-mono      dates, tags, meta            13px  ← the only muted one
.t-link      inline link
.t-stack     wraps paragraphs, spaces them evenly
```

## Colour

**All reading text is one colour.** Hierarchy comes from size and weight,
never from dimming text. This is measured from base-ui.com, where the h1,
body paragraphs, h2 and links are all `#E6E6E6` at 14.88:1.

| token | light | dark | use |
|---|---|---|---|
| `--fg` | 17.9:1 | 16.9:1 | **everything you read** |
| `--fg-muted` | 5.3:1 | 7.1:1 | notes beside work, dates, labels |
| `--fg-faint` | 2.8:1 | 3.6:1 | decorative, never body text |
| `--chip` | | | the soft fill of quiet buttons and the current nav item |

Grounds are `#FFFFFF` / `#0B0B0B`; `--fg` is `#171717` / `#EDEDED`, not pure
black or white. `--fg` and `--fg-muted` pass WCAG AA; keep it that way.

## Components

Each CSS block has a React component in `components/ui/`:

| class | component |
|---|---|
| `.btn`, `.btn-sm`, `.btn-square`, `.btn-primary` | `Button.tsx` |
| `.section` | `Section.tsx` |
| `.t-link` + arrow | `ArrowLink.tsx` |
| `.list`, `.list-row` | `ProjectList.tsx` |

Change the class, every instance follows. Don't style these inline.

## Pages

`site.css` holds the page compositions (design.how is the reference: centered,
quiet, very little text, real work in frames). Consoles of real tool output
live in `lib/work.ts` and render through `components/work/parts.tsx`.
