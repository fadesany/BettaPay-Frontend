Description: The KPI stat card pattern (icon + title + value + trend) is repeated inline across 3 pages with ~11 instances total. A reusable StatCard component would reduce duplication and ensure consistent styling.

Requirements:

Create components/shared/StatCard.tsx
Props: title, value (ReactNode), icon, trend?, trendLabel?, color? (amber/blue/emerald/purple), className?
Handle the gradient overlay, icon background, and trend display internally
Use the component in dashboard, settlement, and admin overview pages
Suggested execution steps:

Create components/shared/StatCard.tsx
Define the prop interface with all needed fields
Implement the card with gradient overlay, icon, value, and optional trend
Replace the 4 inline stat cards in app/(merchant)/dashboard/page.tsx
Replace the 3 stat cards in app/(merchant)/settlement/page.tsx
Replace the 4 stat cards in app/(admin)/overview/page.tsx
Verify all look identical to the original