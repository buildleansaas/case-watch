import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getJudgeProfile, getJudgeProfiles, sourceLabel } from '@/lib/profiles';

export function generateStaticParams() {
  return getJudgeProfiles().map((profile) => ({ slug: profile.slug }));
}

type JudgePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: JudgePageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getJudgeProfile(slug);
  if (!profile) return {};
  return {
    title: profile.metaTitle,
    description: profile.metaDescription,
  };
}

export default async function JudgeProfilePage({ params }: JudgePageProps) {
  const { slug } = await params;
  const profile = getJudgeProfile(slug);
  if (!profile) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: profile.metaTitle,
    description: profile.metaDescription,
    mainEntity: {
      '@type': 'Person',
      name: profile.fullName,
      jobTitle: profile.currentRole.title,
      worksFor: {
        '@type': 'GovernmentOrganization',
        name: profile.currentRole.court,
      },
      alumniOf: profile.education.map((item) => item.institution),
    },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="hero profile-hero">
        <div className="eyebrow">Judge profile</div>
        <h1>{profile.displayName}</h1>
        <p>{profile.neutralSummary.text}</p>
        <div className="receipt-row" aria-label="Profile receipts">
          <a href="#sources">{profile.sources.length} sources</a>
          <a href="#documents">{profile.documents.length} documents</a>
          <a href="#rulings">{profile.notableRulings.length} notable ruling</a>
          <a href="/methodology">Methodology</a>
        </div>
      </section>

      <section className="two-column">
        <article className="card">
          <h2>Quick ID</h2>
          <dl className="facts">
            <div><dt>Current role</dt><dd>{profile.currentRole.title}</dd></div>
            <div><dt>Court</dt><dd>{profile.currentRole.court}</dd></div>
            <div><dt>Appointed by</dt><dd>{profile.currentRole.appointedBy}</dd></div>
            <div><dt>Confirmed</dt><dd>{profile.currentRole.confirmed}</dd></div>
            {profile.currentRole.confirmationVote ? <div><dt>Vote</dt><dd>{profile.currentRole.confirmationVote}</dd></div> : null}
          </dl>
        </article>

        <article className="card">
          <h2>Source-backed facts</h2>
          <ul className="list citation-list">
            {profile.quickFacts.map((fact) => (
              <li key={fact.label}>
                <strong>{fact.label}:</strong> {fact.value}{' '}
                <span className="citation">[{fact.sourceIds.map((id) => sourceLabel(profile, id)).join('; ')}]</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="card">
        <h2>Career timeline</h2>
        <ol className="timeline">
          {profile.careerTimeline.map((item) => (
            <li key={`${item.start}-${item.title}`}>
              <span>{item.end ? `${item.start}-${item.end}` : `${item.start}-present`}</span>
              <div><strong>{item.title}</strong>{item.organization ? `, ${item.organization}` : ''}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="card" id="rulings">
        <h2>Notable rulings</h2>
        <div className="stack">
          {profile.notableRulings.map((ruling) => (
            <article className="inset" key={ruling.slug}>
              <span className="badge">{ruling.status}</span>
              <h3>{ruling.title}</h3>
              <p>{ruling.summary}</p>
              <dl className="facts mini-facts">
                <div><dt>Date</dt><dd>{ruling.date}</dd></div>
                <div><dt>Court</dt><dd>{ruling.court}</dd></div>
                <div><dt>Docket</dt><dd>{ruling.docket}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Public record and criticism</h2>
        <div className="stack">
          {profile.publicRecord.map((item) => (
            <article className="inset" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <p className="citation">Sources: {item.sourceIds.map((id) => sourceLabel(profile, id)).join('; ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card" id="documents">
        <h2>Document library</h2>
        <div className="stack">
          {profile.documents.map((document) => (
            <article className="document-row" key={document.id}>
              <div>
                <h3>{document.title}</h3>
                <p>{[document.court, document.docket, document.filed].filter(Boolean).join(' • ')}</p>
              </div>
              <a className="button secondary" href={document.url}>Open document</a>
            </article>
          ))}
        </div>
      </section>

      <section className="card" id="sources">
        <h2>Source library</h2>
        <div className="source-grid">
          {profile.sources.map((source) => (
            <a className="source-card" key={source.id} href={source.url}>
              <span>{source.type}</span>
              <strong>{source.label}</strong>
              {source.note ? <small>{source.note}</small> : null}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
