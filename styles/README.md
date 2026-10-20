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
| `--fg` | 13.5:1 | 14.4:1 | **everything you read** |
| `--fg-muted` | 4.5:1 | 8.6:1 | meta only — dates, tags, labels |
| `--fg-faint` | 3.3:1 | 5.2:1 | decorative, never body text |

Note `--fg` is not pure black or white — `#2E2E2E` / `#E6E6E6`. Pure white on
near-black glares. All pass WCAG AA; keep it that way.

## Components

Each CSS block has a React component in `components/ui/`:

| class | component |
|---|---|
| `.btn`, `.btn-sm`, `.btn-square`, `.btn-primary` | `Button.tsx` |
| `.section` | `Section.tsx` |
| `.t-link` + arrow | `ArrowLink.tsx` |
| `.list`, `.list-row` | `ProjectList.tsx` |

Change the class, every instance follows. Don't style these inline.

## Disposable

`experiments.css` styles the `/try` preview routes. Delete both together.
