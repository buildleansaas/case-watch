import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology for Source-Linked Public-Official Profiles',
  description: 'How Case Watch labels sources, verifies public-record claims, and decides when a profile is ready to publish.',
};

const labels = [
  { name: 'Official', use: 'Court, FJC, Senate, agency, or other government/institutional source for identity, role, dates, and documents.' },
  { name: 'Primary document', use: 'Court orders, opinions, filings, disclosures, questionnaires, transcripts, and archived source PDFs.' },
  { name: 'Secondary', use: 'News, institutional articles, legal profiles, or analysis used for context, never as sole proof for contested claims.' },
  { name: 'Seed only', use: 'Social posts or tips that explain why we looked, not what we verified.' },
  { name: 'Open lead', use: 'Promising but incomplete research item that needs a specific official or primary source before becoming a profile fact.' },
];

export default function MethodologyPage() {
  return (
    <main className="newspaper-shell">
      <section className="newspaper-masthead" aria-label="Case Watch methodology masthead">
        <div>
          <p className="paper-name">Case Watch</p>
          <p className="paper-tagline">Methodology desk</p>
        </div>
        <div className="edition-box"><span>Standard</span><strong>Source-linked profiles</strong></div>
      </section>

      <section className="hero compact-hero">
        <div className="eyebrow">Methodology</div>
        <h1>Every profile starts as a claim and earns its way into the record.</h1>
        <p>
          Social posts, news articles, and commentary are useful leads. They do not become verified profile facts until official biographies,
          court documents, nomination records, dockets, or primary documents support the claim.
        </p>
      </section>

      <section className="section-panel">
        <div className="section-kicker">Source labels</div>
        <h2>The label tells readers how much weight to give a claim.</h2>
        <div className="source-grid">
          {labels.map((label) => (
            <article className="source-card" key={label.name}>
              <span>{label.name}</span>
              <strong>{label.use}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="grid">
        <article className="card"><span className="badge">1</span><h2>Seed</h2><p>Capture the original post, article, docket clue, or public tip as a source trail, not a conclusion.</p></article>
        <article className="card"><span className="badge">2</span><h2>Resolve</h2><p>Identify the person, office, court, case, document IDs, and relevant timeline through official or primary records.</p></article>
        <article className="card"><span className="badge">3</span><h2>Cite</h2><p>Every meaningful public fact stores source IDs and renders source cards on the public page.</p></article>
        <article className="card"><span className="badge">4</span><h2>Separate lanes</h2><p>Verified facts, reported context, criticism, and open leads render as separate sections so readers can see the difference.</p></article>
        <article className="card"><span className="badge">5</span><h2>Explain</h2><p>Important rulings get a plain-language explainer with posture, holding, remedy, document links, and why it matters.</p></article>
        <article className="card"><span className="badge">6</span><h2>Publish</h2><p>A profile needs source cards, unique title/meta, JSON-LD, sitemap inclusion, internal links, and a visible correction path.</p></article>
      </section>

      <section className="card">
        <h2>Publish threshold</h2>
        <ul className="list">
          <li>At least two official or primary sources.</li>
          <li>One clear role, office, court, or jurisdiction.</li>
          <li>Cited education or career timeline when available.</li>
          <li>At least one source-backed ruling, case, vote, action, or public-record issue.</li>
          <li>Visible source cards, unique title/meta, JSON-LD, sitemap inclusion, and internal links.</li>
          <li>Open research leads must say exactly what source would upgrade the profile.</li>
        </ul>
      </section>
    </main>
  );
}
