import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology for Source-Linked Public-Official Profiles',
  description: 'How Case Watch labels sources, verifies public-record claims, and decides when a profile is ready to publish.',
};

export default function MethodologyPage() {
  return (
    <main>
      <section className="hero compact-hero">
        <div className="eyebrow">Methodology</div>
        <h1>Every profile starts as a claim and earns its way into the record.</h1>
        <p>
          Social posts, news articles, and commentary are useful leads. They do not become verified profile facts until official biographies,
          court documents, nomination records, dockets, or primary documents support the claim.
        </p>
      </section>

      <section className="grid">
        <article className="card"><span className="badge">1</span><h2>Seed</h2><p>Capture the original post, article, docket clue, or public tip as a source trail, not a conclusion.</p></article>
        <article className="card"><span className="badge">2</span><h2>Resolve</h2><p>Identify the person, office, court, case, and document IDs through official or primary records.</p></article>
        <article className="card"><span className="badge">3</span><h2>Cite</h2><p>Every meaningful fact stores source IDs and renders source cards on the public page.</p></article>
        <article className="card"><span className="badge">4</span><h2>Publish</h2><p>A profile needs official identity records, a timeline, source-backed public actions, page metadata, JSON-LD, sitemap inclusion, and a correction path.</p></article>
      </section>

      <section className="card">
        <h2>Publish threshold</h2>
        <ul className="list">
          <li>At least two official or primary sources.</li>
          <li>One clear role, office, court, or jurisdiction.</li>
          <li>Cited education or career timeline when available.</li>
          <li>At least one source-backed ruling, case, vote, action, or public-record issue.</li>
          <li>Visible source cards, unique title/meta, JSON-LD, sitemap inclusion, and internal links.</li>
        </ul>
      </section>
    </main>
  );
}
