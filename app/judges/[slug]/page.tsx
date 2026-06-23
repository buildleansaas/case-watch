import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getJudgeProfile, getJudgeProfiles, sourceConfidenceLabel, sourceLabel } from '@/lib/profiles';

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

function SourceMarks({ sourceIds, profile }: { sourceIds: string[]; profile: NonNullable<ReturnType<typeof getJudgeProfile>> }) {
  return <span className="source-marks">{sourceIds.map((id) => sourceLabel(profile, id)).join(' · ')}</span>;
}

export default async function JudgeProfilePage({ params }: JudgePageProps) {
  const { slug } = await params;
  const profile = getJudgeProfile(slug);
  if (!profile) notFound();

  const ruling = profile.notableRulings[0];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: profile.metaTitle,
    description: profile.metaDescription,
    dateModified: profile.lastUpdated,
    mainEntity: {
      '@type': 'Person',
      name: profile.fullName,
      jobTitle: profile.currentRole.title,
      worksFor: {
        '@type': 'GovernmentOrganization',
        name: profile.currentRole.court,
      },
      alumniOf: profile.education.map((item) => item.institution),
      subjectOf: profile.documents.map((document) => ({ '@type': 'DigitalDocument', name: document.title, url: document.url })),
    },
  };

  return (
    <main className="newspaper-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="newspaper-masthead" aria-label="Case Watch masthead">
        <div>
          <p className="paper-name">Case Watch</p>
          <p className="paper-tagline">Public records, rulings, and civic accountability profiles</p>
        </div>
        <div className="edition-box">
          <span>Profile edition</span>
          <strong>Updated {profile.lastUpdated}</strong>
        </div>
      </section>

      <section className="profile-frontpage">
        <div className="frontpage-copy">
          <div className="eyebrow">{profile.kicker}</div>
          <h1>{profile.headline}</h1>
          <p className="dek">{profile.deck}</p>
          <p className="nutgraf">{profile.nutGraf.text}</p>
          <SourceMarks sourceIds={profile.nutGraf.sourceIds} profile={profile} />
          <div className="receipt-row" aria-label="Profile receipts">
            <a href="#sources">{profile.sources.length} sources</a>
            <a href="#documents">{profile.documents.length} documents</a>
            <a href="#ruling-explainer">Ruling explainer</a>
            <a href="/methodology">Methodology</a>
          </div>
        </div>

        <aside className="fact-rail" aria-label="At a glance">
          <div className="rail-label">At a glance</div>
          <h2>{profile.displayName}</h2>
          <dl className="facts">
            <div><dt>Role</dt><dd>{profile.currentRole.title}</dd></div>
            <div><dt>Court</dt><dd>{profile.currentRole.court}</dd></div>
            <div><dt>Appointed by</dt><dd>{profile.currentRole.appointedBy}</dd></div>
            <div><dt>Confirmed</dt><dd>{profile.currentRole.confirmed}</dd></div>
            {profile.currentRole.confirmationVote ? <div><dt>Vote</dt><dd>{profile.currentRole.confirmationVote}</dd></div> : null}
          </dl>
        </aside>
      </section>

      <section className="stat-strip" aria-label="Profile metrics">
        {profile.stats.map((stat) => (
          <article key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <p>{stat.context}</p>
          </article>
        ))}
      </section>

      <section className="editorial-grid">
        <article className="main-column">
          <section className="story-block">
            <div className="section-kicker">Why this profile exists</div>
            <h2>Source-linked biography, not a vibe check.</h2>
            <p>{profile.neutralSummary.text}</p>
            <SourceMarks sourceIds={profile.neutralSummary.sourceIds} profile={profile} />
          </section>

          <section className="story-block" id="ruling-explainer">
            <div className="section-kicker">Ruling at issue</div>
            <h2>{ruling.explainer.title}</h2>
            <p className="lede">{ruling.summary}</p>
            <div className="ruling-card">
              <dl className="facts mini-facts">
                <div><dt>Caption</dt><dd>{ruling.explainer.caseCaption}</dd></div>
                <div><dt>Docket</dt><dd>{ruling.explainer.docket}</dd></div>
                <div><dt>Date</dt><dd>{ruling.explainer.date}</dd></div>
                <div><dt>Court</dt><dd>{ruling.explainer.court}</dd></div>
              </dl>
              <div className="ruling-split">
                <article>
                  <h3>Challenged action</h3>
                  <p>{ruling.explainer.challengedAction}</p>
                </article>
                <article>
                  <h3>Holding</h3>
                  <p>{ruling.explainer.holding}</p>
                </article>
                <article>
                  <h3>Remedy</h3>
                  <p>{ruling.explainer.remedy}</p>
                </article>
                <article>
                  <h3>Why it matters</h3>
                  <p>{ruling.explainer.whyItMatters}</p>
                </article>
              </div>
              <div className="legal-hooks">
                {ruling.explainer.legalHooks.map((hook) => <span key={hook}>{hook}</span>)}
              </div>
              <SourceMarks sourceIds={ruling.explainer.sourceIds} profile={profile} />
            </div>
          </section>

          <section className="story-block">
            <div className="section-kicker">Career chronology</div>
            <h2>The receipt-backed path to the bench</h2>
            <ol className="timeline newspaper-timeline">
              {profile.careerTimeline.map((item) => (
                <li key={`${item.start}-${item.title}`}>
                  <span>{item.end ? `${item.start}-${item.end}` : item.start}</span>
                  <div>
                    <strong>{item.title}</strong>
                    {item.organization ? <em>{item.organization}</em> : null}
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="story-block">
            <div className="section-kicker">Record map</div>
            <h2>What is verified, what is reported, and what still needs documents</h2>
            <div className="record-map">
              {profile.profileSections.map((section) => (
                <article key={section.title}>
                  <span>{section.eyebrow}</span>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                  <SourceMarks sourceIds={section.sourceIds} profile={profile} />
                </article>
              ))}
            </div>
          </section>
        </article>

        <aside className="side-column">
          <section className="side-paper-card">
            <h2>Source-backed facts</h2>
            <ul className="citation-list">
              {profile.quickFacts.map((fact) => (
                <li key={fact.label}>
                  <strong>{fact.label}</strong>
                  <span>{fact.value}</span>
                  <SourceMarks sourceIds={fact.sourceIds} profile={profile} />
                </li>
              ))}
            </ul>
          </section>

          <section className="side-paper-card">
            <h2>Education</h2>
            <ul className="education-list">
              {profile.education.map((item) => (
                <li key={item.institution}>
                  <strong>{item.institution}</strong>
                  <span>{item.degree}, {item.year}{item.honors ? `, ${item.honors}` : ''}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="side-paper-card">
            <h2>How to read this page</h2>
            <p>Official and primary-document sources carry the profile. Secondary sources are labeled for context or criticism. Social posts are only treated as leads.</p>
            <a className="text-link" href="/methodology">Read methodology</a>
          </section>
        </aside>
      </section>

      <section className="section-panel">
        <div className="section-kicker">Public record and criticism</div>
        <h2>Separated lanes prevent unsupported claims from sneaking into the biography</h2>
        <div className="record-list">
          {profile.publicRecord.map((item) => (
            <article key={item.title}>
              <span className={`treatment treatment-${item.treatment}`}>{item.treatment.replaceAll('-', ' ')}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <SourceMarks sourceIds={item.sourceIds} profile={profile} />
            </article>
          ))}
        </div>
      </section>

      <section className="section-panel" id="documents">
        <div className="section-kicker">Document library</div>
        <h2>Primary records and source pages used in this profile</h2>
        <div className="document-list">
          {profile.documents.map((document) => (
            <article className="document-row" key={document.id}>
              <div>
                <span>{document.type.replaceAll('-', ' ')}</span>
                <h3>{document.title}</h3>
                <p>{[document.court, document.docket, document.filed].filter(Boolean).join(' · ')}</p>
              </div>
              <a className="button secondary" href={document.url}>Open document</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-panel">
        <div className="section-kicker">Open research leads</div>
        <h2>The next reporting pass</h2>
        <div className="lead-grid">
          {profile.researchLeads.map((lead) => (
            <article key={lead.title}>
              <span>{lead.status.replaceAll('-', ' ')}</span>
              <h3>{lead.title}</h3>
              <p>{lead.why}</p>
              <small>Next source: {lead.nextSource}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section-panel" id="sources">
        <div className="section-kicker">Source library</div>
        <h2>Source ledger</h2>
        <div className="source-grid">
          {profile.sources.map((source) => (
            <a className="source-card" key={source.id} href={source.url}>
              <span>{sourceConfidenceLabel(source.confidence)}</span>
              <strong>{source.label}</strong>
              <small>{source.type}</small>
              {source.note ? <p>{source.note}</p> : null}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
