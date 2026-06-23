import Link from 'next/link';
import type { Metadata } from 'next';
import { getJudgeProfiles } from '@/lib/profiles';

export const metadata: Metadata = {
  title: 'Judge Profiles, Rulings, Court Records, and Source Documents',
  description: 'Source-linked profiles for judges, rulings, confirmation history, public-record issues, and court documents.',
};

export default function JudgesIndexPage() {
  const profiles = getJudgeProfiles();

  return (
    <main>
      <section className="hero compact-hero">
        <div className="eyebrow">Public Office Files</div>
        <h1>Judge profiles built from source receipts, not vibes.</h1>
        <p>
          Each profile connects biography, appointment history, rulings, criticism, and documents back to a visible source library.
          This is the repeatable programmatic SEO standard for judge and public-official pages.
        </p>
      </section>

      <section className="profile-list" aria-label="Judge profiles">
        {profiles.map((profile) => (
          <article className="card profile-card" key={profile.slug}>
            <div>
              <span className="badge">{profile.currentRole.court}</span>
              <h2>{profile.displayName}</h2>
              <p>{profile.neutralSummary.text}</p>
            </div>
            <dl className="facts mini-facts">
              <div><dt>Appointed by</dt><dd>{profile.currentRole.appointedBy}</dd></div>
              <div><dt>Confirmed</dt><dd>{profile.currentRole.confirmed}</dd></div>
              <div><dt>Source count</dt><dd>{profile.sources.length}</dd></div>
            </dl>
            <Link className="button" href={`/judges/${profile.slug}`}>Open profile</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
