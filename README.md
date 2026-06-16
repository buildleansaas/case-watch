# Case Watch

Open-source public-record explorer for Virginia criminal case outcomes.

Case Watch starts with Virginia, with local priority around Hanover, Henrico, Richmond, and Fairfax, then expands to every Virginia county/city and eventually every state/county.

The project tracks:

- official court records
- original charges vs amended/final charges
- statute and sentencing range context
- sentence imposed, suspended time, active incarceration, probation
- custody/release status where public
- judge and prosecutor/office attribution where available
- offender registry matches where public
- source snapshots and confidence labels

Principle: social posts and news are seed claims. Official records are receipts.

## Dev

```bash
pnpm install
pnpm validate:data
pnpm build
pnpm dev
```
