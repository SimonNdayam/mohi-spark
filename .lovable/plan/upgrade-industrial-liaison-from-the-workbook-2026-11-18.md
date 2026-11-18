# Upgrade industrial liaison from the workbook

## What will change
- Evolve Attachment and Job Placement into operational trackers based on the workbook: student progress, workplace assessment, logbooks, feedback, support needs, next actions, and responsible officers.
- Add employer directory, industry engagement log, MOU register, and follow-up views with search, filters, status indicators, and CSV/Excel/PDF exports.
- Add a liaison dashboard for attachment and graduate outcomes, engagement follow-ups, active/expiring agreements, and partner capacity. Keep the workbook's Week 4 figures clearly labeled as reference baselines, not live student records.
- Use Lovable Cloud for persistent records with staff-only access controls. Do not import workbook sample people or expose confidential salary details in the UI until staff access rules are in place.
- Preserve the current MOHI styling and adapt forms, filters, tables, and navigation for smaller screens.

## Technical details
- Add focused database tables and row-level security for attachment cases, graduate outcomes, employer organizations, industry engagements, and MOUs. Keep one record per placement/graduate/organization/engagement/agreement; use the workbook headings as the field guide.
- Wire liaison pages to authenticated data access, including required sign-in and staff profiles/roles where needed; do not rely on browser-only permissions.
- Reuse the existing export tools and add validation for workbook-derived fields. Leave the uploaded workbook unchanged.
- Verify the public entry and signed-in liaison workflow, filters, exports, and phone layout.
