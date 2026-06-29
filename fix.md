Replace all tags with next/image
Repo Avatar
Betta-Pay/BettaPay-Frontend
Description: The project uses rawtags in several places (app/auth/layout.tsx, app/(merchant)/wallet/page.tsx, app/page.tsx). Next.js's component provides automatic WebP/AVIF conversion, responsive sizing, lazy loading, and blur-up placeholders — all of which improve LCP (Largest Contentful Paint) and overall performance.

Requirements:

Replace everytag with from next/image
Add explicit width and height attributes to each Image
Use priority on above-the-fold images (logo in auth layout, landing page hero)
Use placeholder="blur" with a blurDataURL for important images
Keep the existing alt text
Suggested execution steps:

Import Image from next/image in every file with tags
Replace
DRIPS LOGO
with
For the logo: add priority since it's in the header of every auth page
For wallet page logo: add width={32} height={32}
Run npm run build to verify no image-related errors
