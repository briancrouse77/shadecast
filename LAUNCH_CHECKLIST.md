# ShadeCast Launch & Search Console Indexing Checklist

This checklist tracks the manual steps required to submit ShadeCast for indexation, validate social sharing previews, and monitor baseline launch metrics.

---

## 1. Search Console Setup
- [ ] Log into [Google Search Console](https://search.google.com/search-console/welcome).
- [ ] Add a new **URL Prefix** property:
  ```text
  https://briancrouse77.github.io/shadecast/
  ```
- [ ] Verify ownership using the default GitHub Pages domain configuration (HTML file upload or HTML meta tag integration if necessary).

---

## 2. Sitemap Submission
- [ ] Navigate to the **Sitemaps** section in Search Console.
- [ ] Submit the following sitemap URL path:
  ```text
  https://briancrouse77.github.io/shadecast/sitemap.xml
  ```
- [ ] Verify that Google returns a "Success" status indicating the sitemap was successfully read.

---

## 3. URL Inspection List
Use GSC's **URL Inspection Tool** to inspect and manually click **"Request Indexing"** for the following 6 entry routes:
1. [ ] Home Page: `https://briancrouse77.github.io/shadecast/`
2. [ ] Driving Guide: `https://briancrouse77.github.io/shadecast/best-driving-sunglasses/`
3. [ ] Fishing Guide: `https://briancrouse77.github.io/shadecast/best-fishing-sunglasses/`
4. [ ] Disc Golf Guide: `https://briancrouse77.github.io/shadecast/best-disc-golf-sunglasses/`
5. [ ] Running Guide: `https://briancrouse77.github.io/shadecast/best-running-sunglasses/`
6. [ ] Skiing Guide: `https://briancrouse77.github.io/shadecast/best-skiing-sunglasses/`

---

## 4. Social Preview Validation
Test how the pages crawl and render links across social networks. Confirm metadata (`og:title`, `og:description`, `og:image`, `twitter:card`) loads properly on:
- [ ] **Facebook**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] **Twitter/X**: [X Card Validator / Inspector](https://cards-dev.twitter.com/validator)
- [ ] **LinkedIn**: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [ ] **iMessage / Discord**: Perform a manual copy-paste test in a private chat.

---

## 5. Launch Baseline Metrics (Day 0)

| Metric | Baseline (YYYY-MM-DD) | Day 7 Review | Day 30 Review |
| :--- | :--- | :--- | :--- |
| **Indexed Pages** | 0 / 6 | | |
| **Search Impressions** | 0 | | |
| **Organic Clicks** | 0 | | |
| **Average Search Position** | - | | |
| **Top Performing Queries** | None | | |
| **Top Performing Landing Pages**| None | | |
| **Affiliate Referral Clicks** | 0 | | |
| **Demo Outbound Clicks** | 0 | | |

---

## 6. Next 7-Day Review Checklist
- [ ] **Check Sitemap Status**: Verify Google successfully parsed all 6 URLs inside the index file.
- [ ] **Monitor Crawl Errors**: Check the "Pages" report for coverage anomalies, redirection blocks, or crawl flags.
- [ ] **Log Telemetry**: Log into the ShadeCast Admin dashboard (Password: `shadecast` after trigger input `shade` or 5 title clicks) to review regional lead queries and tint demand.
