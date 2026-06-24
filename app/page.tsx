import { getCases } from '@/lib/cases';

const cases = getCases();

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="eyebrow">Case Watch</div>
        <h1>Public-record accountability for criminal case outcomes.</h1>
        <p>
          Open-source explorer for Virginia case records, custody/release data, judges,
          prosecutors, statutes, charge reductions, sentencing outcomes, and source receipts.
          Starting local to Hanover, Henrico, Richmond, and Fairfax, then expanding statewide.
        </p>
      </section>

      <section className="grid">
        <a className="card link-card" href="/judges/sparkle-l-sooknanan"><span className="badge">new</span><h2>Judge profile engine</h2><p>Source-linked public-official profiles with biography, timeline, rulings, documents, criticism, metadata, and JSON-LD.</p></a>
        <a className="card link-card" href="/executive-orders/eo-14411-quantum-innovation"><span className="badge">new</span><h2>Executive Order Watch</h2><p>Read official order text, agency assignments, implementation clocks, source ledgers, and social-claim status in one newspaper file.</p></a>
        <a className="card link-card" href="/judges/kandice-pickett"><span className="badge">new</span><h2>State judge profile</h2><p>Deep profile for Judge Kandice Pickett with court role, prosecutor background, reported bond hearing, and open document leads.</p></a>
        <div className="card"><span className="badge">v0</span><h2>Source matrix first</h2><p>Map every county/city court, jail, sheriff, prosecutor, police, registry, FOIA, and news source before scraping.</p></div>
        <div className="card"><span className="badge">v0</span><h2>Claim verifier</h2><p>Social/news claims stay labeled as claims until official court, registry, jail, or agency records verify them.</p></div>
        <div className="card"><span className="badge">v0</span><h2>Neutral scoring</h2><p>Build a by-the-book baseline, then flag unusually lenient or unusually harsh deviations from statute and sentencing ranges.</p></div>
      </section>

      <section className="card">
        <h2>Seed cases</h2>
        <table className="table">
          <thead><tr><th>Case</th><th>Jurisdiction</th><th>Status</th><th>Flags</th></tr></thead>
          <tbody>
            {cases.map((item) => (
              <tr key={item.id}>
                <td>{item.defendant}</td>
                <td>{item.jurisdiction}</td>
                <td>{item.status}</td>
                <td>{item.flags.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
