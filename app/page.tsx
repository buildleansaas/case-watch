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
