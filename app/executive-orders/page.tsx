import Link from 'next/link';
import type { Metadata } from 'next';
import { getExecutiveOrders } from '@/lib/executive-orders';

export const metadata: Metadata = {
  title: 'Executive Order Watch: Text, Deadlines, Agencies, and Claim Trackers',
  description: 'Source-linked executive order pages that separate official text, implementation deadlines, agency follow-through, and social claims.',
};

export default function ExecutiveOrdersIndexPage() {
  const orders = getExecutiveOrders();

  return (
    <main>
      <section className="hero compact-hero">
        <div className="eyebrow">Executive Order Watch</div>
        <h1>Official orders, viral claims, agency deadlines, and source receipts in one ledger.</h1>
        <p>
          Social posts can surface real civic material fast. These pages keep the seed, but make the official order text, agency assignments,
          implementation clock, and claim status visible before anyone turns commentary into fact.
        </p>
      </section>

      <section className="profile-list" aria-label="Executive order records">
        {orders.map((order) => (
          <article className="card profile-card" key={order.slug}>
            <div>
              <span className="badge">{order.orderNumber}</span>
              <h2>{order.title}</h2>
              <p>{order.summary.text}</p>
            </div>
            <dl className="facts mini-facts">
              <div><dt>Signed</dt><dd>{order.signedDate}</dd></div>
              <div><dt>President</dt><dd>{order.president}</dd></div>
              <div><dt>Claims tracked</dt><dd>{order.claims.length}</dd></div>
            </dl>
            <Link className="button" href={`/executive-orders/${order.slug}`}>Open order file</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
