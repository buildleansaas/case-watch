import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  executiveOrderConfidenceLabel,
  executiveOrderSourceLabel,
  getExecutiveOrder,
  getExecutiveOrders,
} from '@/lib/executive-orders';

type ExecutiveOrderPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getExecutiveOrders().map((order) => ({ slug: order.slug }));
}

export async function generateMetadata({ params }: ExecutiveOrderPageProps): Promise<Metadata> {
  const { slug } = await params;
  const order = getExecutiveOrder(slug);
  if (!order) return {};
  return {
    title: order.metaTitle,
    description: order.metaDescription,
  };
}

function SourceMarks({ sourceIds, order }: { sourceIds: string[]; order: NonNullable<ReturnType<typeof getExecutiveOrder>> }) {
  return <span className="source-marks">{sourceIds.map((id) => executiveOrderSourceLabel(order, id)).join(' · ')}</span>;
}

function claimClass(finding: string) {
  if (finding === 'supported-by-order-text') return 'claim-supported';
  if (finding === 'partially-supported') return 'claim-partial';
  if (finding === 'not-in-order-text') return 'claim-not-found';
  return 'claim-open';
}

export default async function ExecutiveOrderPage({ params }: ExecutiveOrderPageProps) {
  const { slug } = await params;
  const order = getExecutiveOrder(slug);
  if (!order) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: order.metaTitle,
    description: order.metaDescription,
    dateModified: order.lastUpdated,
    mainEntityOfPage: `https://case-watch.vercel.app/executive-orders/${order.slug}`,
    about: order.topics,
    citation: order.sources.map((source) => source.url),
  };

  return (
    <main className="newspaper-shell eo-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="newspaper-masthead" aria-label="Case Watch masthead">
        <div>
          <p className="paper-name">Case Watch</p>
          <p className="paper-tagline">Executive orders, implementation clocks, and civic claim ledgers</p>
        </div>
        <div className="edition-box">
          <span>{order.orderNumber}</span>
          <strong>Updated {order.lastUpdated}</strong>
        </div>
      </section>

      <section className="profile-frontpage eo-frontpage">
        <div className="frontpage-copy">
          <div className="eyebrow">{order.kicker}</div>
          <h1>{order.headline}</h1>
          <p className="dek">{order.deck}</p>
          <p className="nutgraf">{order.whyItMatters.text}</p>
          <SourceMarks sourceIds={order.whyItMatters.sourceIds} order={order} />
          <div className="receipt-row" aria-label="Executive order receipts">
            <a href={order.officialUrl}>Official order</a>
            <a href="#section-by-section">Section reader</a>
            <a href="#claims">Claim board</a>
            <a href="#sources">Source ledger</a>
          </div>
        </div>

        <aside className="fact-rail" aria-label="At a glance">
          <div className="rail-label">Order file</div>
          <h2>{order.title}</h2>
          <dl className="facts">
            <div><dt>Order</dt><dd>{order.orderNumber}</dd></div>
            <div><dt>Signed</dt><dd>{order.signedDate}</dd></div>
            <div><dt>President</dt><dd>{order.president}</dd></div>
            <div><dt>Status</dt><dd>{order.status.replaceAll('-', ' ')}</dd></div>
          </dl>
        </aside>
      </section>

      <section className="stat-strip" aria-label="Order metrics">
        <article><span>Sections parsed</span><strong>{order.sections.length}</strong><p>Plain-English reader cards.</p></article>
        <article><span>Agency roles</span><strong>{order.agencyMap.length}</strong><p>Named implementation lanes.</p></article>
        <article><span>Claims tracked</span><strong>{order.claims.length}</strong><p>Social/commentary claims labeled by receipt status.</p></article>
        <article><span>Deadline clock</span><strong>180 days</strong><p>Main strategy-update instruction.</p></article>
      </section>

      <section className="editorial-grid">
        <article className="main-column">
          <section className="story-block">
            <div className="section-kicker">Official text summary</div>
            <h2>What the order actually says</h2>
            <p>{order.summary.text}</p>
            <SourceMarks sourceIds={order.summary.sourceIds} order={order} />
            <div className="topic-row">
              {order.topics.map((topic) => <span key={topic}>{topic}</span>)}
            </div>
          </section>

          <section className="story-block" id="section-by-section">
            <div className="section-kicker">Section by section</div>
            <h2>The readable order text</h2>
            <div className="eo-section-list">
              {order.sections.map((section) => (
                <article key={section.section}>
                  <span>Section {section.section}</span>
                  <h3>{section.title}</h3>
                  <p>{section.plainEnglish}</p>
                  <blockquote>{section.quote}</blockquote>
                  <SourceMarks sourceIds={section.sourceIds} order={order} />
                </article>
              ))}
            </div>
          </section>

          <section className="story-block" id="claims">
            <div className="section-kicker">Claim board</div>
            <h2>What the order supports, and what still needs receipts</h2>
            <div className="claim-grid">
              {order.claims.map((claim) => (
                <article className={claimClass(claim.finding)} key={claim.claim}>
                  <span>{claim.finding.replaceAll('-', ' ')}</span>
                  <h3>{claim.claim}</h3>
                  <p>{claim.analysis}</p>
                  <dl className="facts mini-facts">
                    <div><dt>Origin</dt><dd>{claim.origin}</dd></div>
                    <div><dt>Next receipt</dt><dd>{claim.nextReceipt}</dd></div>
                  </dl>
                  <SourceMarks sourceIds={claim.sourceIds} order={order} />
                </article>
              ))}
            </div>
          </section>
        </article>

        <aside className="side-column">
          <section className="side-paper-card">
            <h2>Implementation clock</h2>
            <ul className="citation-list">
              {order.implementationTasks.map((task) => (
                <li key={`${task.agency}-${task.action}`}>
                  <strong>{task.agency}</strong>
                  <span>{task.action}</span>
                  <small>{task.due} · {task.status.replaceAll('-', ' ')}</small>
                </li>
              ))}
            </ul>
          </section>

          <section className="side-paper-card">
            <h2>Agency map</h2>
            <ul className="education-list">
              {order.agencyMap.map((agency) => (
                <li key={agency.agency}>
                  <strong>{agency.agency}</strong>
                  <span>{agency.role}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </section>

      <section className="section-panel" id="sources">
        <div className="section-kicker">Source ledger</div>
        <h2>The order page keeps social seeds separate from official text</h2>
        <div className="source-grid">
          {order.sources.map((source) => (
            <a key={source.id} href={source.url}>
              <span>{executiveOrderConfidenceLabel(source.confidence)}</span>
              <strong>{source.label}</strong>
              {source.note ? <p>{source.note}</p> : null}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
