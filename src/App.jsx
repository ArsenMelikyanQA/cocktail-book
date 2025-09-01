import React, { useMemo, useState } from "react";

// Quick notes:
// - Replace finalImage/bottleImage with your real photos later
// - Add more cocktails by copying objects in COCKTAILS

const COCKTAILS = [
  {
    id: "moscow-mule",
    name: "Moscow Mule",
    tags: ["vodka", "ginger", "refreshing"],
    finalImage: "/images/moscow-mule.jpg",
    description:
      "A crisp, zesty highball with vodka, lime, and fiery ginger beer. Traditionally served in a copper mug.",
    ingredients: [
      { name: "Vodka", amount: 50, unit: "ml", bottleImage: "/images/absolute.jpg" },
      { name: "Fresh lime juice", amount: 15, unit: "ml", bottleImage: "https://placehold.co/600x800/png?text=Lime+Juice" },
      { name: "Ginger beer (top up)", amount: null, unit: null, bottleImage: "https://placehold.co/600x800/png?text=Ginger+Beer" },
      { name: "Simple syrup (optional)", amount: 5, unit: "ml", bottleImage: "https://placehold.co/600x800/png?text=Simple+Syrup" },
      { name: "Mint sprig & lime wedge (garnish)", amount: null, unit: null, bottleImage: "https://placehold.co/600x800/png?text=Mint" },
    ],
    recipe: [
      "Fill a copper mug with ice.",
      "Add vodka and fresh lime juice (and simple syrup if using).",
      "Top with chilled ginger beer and give a gentle stir.",
      "Garnish with a mint sprig and a lime wedge.",
    ],
  },
  {
    id: "margarita-cadillac",
    name: "Margarita Cadillac",
    tags: ["tequila", "citrus", "top-shelf"],
    finalImage: "https://placehold.co/1200x900/png?text=Cadillac+Margarita",
    description:
      "A premium take on the classic: reposado tequila, orange liqueur, fresh lime, with a Grand Marnier float.",
    ingredients: [
      { name: "Reposado tequila", amount: 50, unit: "ml", bottleImage: "https://placehold.co/600x800/png?text=Tequila+Reposado" },
      { name: "Cointreau (or triple sec)", amount: 20, unit: "ml", bottleImage: "https://placehold.co/600x800/png?text=Cointreau" },
      { name: "Fresh lime juice", amount: 25, unit: "ml", bottleImage: "https://placehold.co/600x800/png?text=Lime+Juice" },
      { name: "Agave syrup", amount: 5, unit: "ml", bottleImage: "https://placehold.co/600x800/png?text=Agave+Syrup" },
      { name: "Grand Marnier (float)", amount: 10, unit: "ml", bottleImage: "https://placehold.co/600x800/png?text=Grand+Marnier" },
      { name: "Salt for rim (optional)", amount: null, unit: null, bottleImage: "https://placehold.co/600x800/png?text=Salt" },
    ],
    recipe: [
      "Rim a rocks glass with salt (optional) and fill with fresh ice.",
      "Shake tequila, Cointreau, lime juice and agave syrup with ice for 10–15 seconds.",
      "Strain into the prepared glass.",
      "Float Grand Marnier on top and garnish with a lime wheel.",
    ],
  },
  {
    id: "amador",
    name: "Amador",
    tags: ["whiskey", "stirred", "classic"],
    finalImage: "/images/amador.jpg",
    description:
      "A smooth, spirit-forward whiskey cocktail built for sipping. Customize with your favorite Amador whiskey.",
    ingredients: [
      { name: "Amador whiskey", amount: 60, unit: "ml", bottleImage: "https://placehold.co/600x800/png?text=Amador+Whiskey" },
      { name: "Demerara syrup", amount: 7.5, unit: "ml", bottleImage: "https://placehold.co/600x800/png?text=Demerara+Syrup" },
      { name: "Angostura bitters (2 dashes)", amount: null, unit: null, bottleImage: "https://placehold.co/600x800/png?text=Angostura" },
      { name: "Orange peel (expressed)", amount: null, unit: null, bottleImage: "https://placehold.co/600x800/png?text=Orange+Peel" },
    ],
    recipe: [
      "Add whiskey, demerara syrup and bitters to a mixing glass with ice.",
      "Stir until well-chilled, then strain over a large cube in a rocks glass.",
      "Express orange oils over the drink and garnish with the peel.",
    ],
  },
];

function Tag({ label }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide bg-white/60 dark:bg-white/5 border-black/10 dark:border-white/10">
      {label}
    </span>
  );
}

function BottleStrip({ ingredients }) {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold opacity-70">Bottles &amp; Components</h4>
      <div className="mt-2 flex gap-3 overflow-x-auto pb-2">
        {ingredients.map((ing, idx) => (
          <figure
            key={idx}
            className="shrink-0 w-24 rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 p-2 text-center"
            title={ing.name}
          >
            <img
              src={ing.bottleImage}
              alt={ing.name}
              className="h-24 w-full object-cover rounded-md"
              loading="lazy"
            />
            <figcaption className="mt-1 text-[10px] leading-tight opacity-75">
              {ing.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function IngredientList({ ingredients }) {
  return (
    <ul className="mt-3 space-y-2">
      {ingredients.map((ing, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/30 dark:bg-white/40" />
          <span className="text-sm">
            {ing.amount ? (
              <strong className="font-medium">{ing.amount}{ing.unit ? ` ${ing.unit}` : ""}</strong>
            ) : (
              <strong className="font-medium">to taste</strong>
            )}
            {" — "}
            {ing.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-start justify-center p-4 sm:p-8 overflow-y-auto">
        <div className="relative w-full max-w-3xl rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:scale-105 transition"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

function Card({ cocktail, onOpen }) {
  return (
    <button
      onClick={() => onOpen(cocktail)}
      className="group relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 shadow-sm bg-white dark:bg-neutral-900 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none"
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={cocktail.finalImage}
          alt={cocktail.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-semibold drop-shadow-sm">{cocktail.name}</h3>
        <div className="mt-1 flex flex-wrap gap-1">
          {cocktail.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [themeDark, setThemeDark] = useState(true);
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COCKTAILS;
    return COCKTAILS.filter((c) => {
      const hay = [c.name, c.description, ...(c.tags || []), ...(c.ingredients?.map((i) => i.name) || [])]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  return (
    <div className={(themeDark ? "dark bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900") + " min-h-screen antialiased"}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <header className="sticky top-0 z-40 -mx-4 -mt-2 mb-6 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-neutral-950/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 22h16M7 22V8a5 5 0 1110 0v14" />
                  <path d="M9 11h6M9 15h6M9 19h6" />
                </svg>
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Cocktail Book</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative w-56 sm:w-72">
                <input
                  type="text"
                  placeholder="Search: name, ingredient, tag..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-400/70"
                />
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-60">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-3.6-3.6" />
                  </svg>
                </span>
              </div>
              <button
                onClick={() => setThemeDark((v) => !v)}
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 px-3 py-2 text-sm hover:scale-[1.02] transition"
                title={themeDark ? "Light theme" : "Dark theme"}
              >
                {themeDark ? (
                  <>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                    Theme
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.95-1.41-1.41M6.46 6.46 5.05 5.05m13.49 0-1.41 1.41M6.46 17.54 5.05 18.95"/></svg>
                    Theme
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-20 text-center opacity-80">
            <p className="text-lg">No results found.</p>
            <p className="text-sm mt-1">Try a different keyword or add your cocktails to the <code>COCKTAILS</code> array.</p>
          </div>
        )}

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <Card key={c.id} cocktail={c} onOpen={setActive} />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 flex items-center justify-between text-xs opacity-70">
          <p>Add your photos for a polished look: final cocktail + ingredient bottles.</p>
          <p>❤ Made for your home bar book</p>
        </footer>

        {/* Modal */}
        <Modal open={!!active} onClose={() => setActive(null)}>
          {active && (
            <article>
              <div className="overflow-hidden rounded-t-3xl">
                <img src={active.finalImage} alt={active.name} className="w-full max-h-[360px] object-cover" />
              </div>
              <div className="p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight">{active.name}</h2>
                  <div className="flex flex-wrap gap-1">{active.tags?.map((t) => <Tag key={t} label={t} />)}</div>
                </div>
                <p className="mt-3 text-sm opacity-90 leading-relaxed">{active.description}</p>

                <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold opacity-70">Ingredients</h3>
                    <IngredientList ingredients={active.ingredients || []} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold opacity-70">Method</h3>
                    <ol className="mt-3 space-y-2">
                      {active.recipe?.map((step, idx) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-[11px] font-semibold">{idx + 1}</span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </section>

                <BottleStrip ingredients={active.ingredients || []} />
              </div>
            </article>
          )}
        </Modal>
      </div>
    </div>
  );
}
