CREATE TABLE public.industrial_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL DEFAULT auth.uid(),
  student_name TEXT NOT NULL,
  admission_no TEXT,
  campus TEXT,
  department_course TEXT,
  level_module TEXT,
  intake TEXT,
  expected_graduation_date DATE,
  attachment_required BOOLEAN NOT NULL DEFAULT TRUE,
  host_organization TEXT,
  workplace_location TEXT,
  industry_supervisor_contact TEXT,
  start_date DATE,
  status TEXT NOT NULL DEFAULT 'Awaiting Placement',
  expected_end_date DATE,
  assessment_date DATE,
  logbook_status TEXT NOT NULL DEFAULT 'Not Started',
  mtti_supervisor TEXT,
  employer_feedback TEXT,
  support_needs TEXT,
  next_action TEXT,
  responsible_officer TEXT,
  next_follow_up_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.industrial_attachments TO authenticated;
GRANT ALL ON public.industrial_attachments TO service_role;
ALTER TABLE public.industrial_attachments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can read industrial attachments" ON public.industrial_attachments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can create industrial attachments" ON public.industrial_attachments FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Staff can update industrial attachments" ON public.industrial_attachments FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Creators can delete industrial attachments" ON public.industrial_attachments FOR DELETE TO authenticated USING (auth.uid() = created_by);
CREATE INDEX industrial_attachments_admission_no_idx ON public.industrial_attachments (admission_no);
CREATE INDEX industrial_attachments_status_idx ON public.industrial_attachments (status);

CREATE TABLE public.graduate_employment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL DEFAULT auth.uid(),
  graduate_name TEXT NOT NULL,
  admission_no TEXT,
  campus TEXT,
  department_course TEXT,
  qualification_level TEXT,
  year_graduated INTEGER,
  graduation_date DATE,
  employment_status TEXT NOT NULL DEFAULT 'Seeking Work',
  employer_organization TEXT,
  town_county TEXT,
  job_title TEXT,
  employment_type TEXT,
  follow_up_date DATE,
  career_notes TEXT,
  consent_to_follow_up BOOLEAN NOT NULL DEFAULT FALSE,
  responsible_officer TEXT,
  last_contact_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.graduate_employment TO authenticated;
GRANT ALL ON public.graduate_employment TO service_role;
ALTER TABLE public.graduate_employment ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can read graduate employment" ON public.graduate_employment FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can create graduate employment" ON public.graduate_employment FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Staff can update graduate employment" ON public.graduate_employment FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Creators can delete graduate employment" ON public.graduate_employment FOR DELETE TO authenticated USING (auth.uid() = created_by);
CREATE INDEX graduate_employment_status_idx ON public.graduate_employment (employment_status);

CREATE TABLE public.employer_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL DEFAULT auth.uid(),
  organization_name TEXT NOT NULL,
  industry_sector TEXT,
  organization_type TEXT,
  physical_location TEXT,
  website TEXT,
  contact_person TEXT,
  contact_job_title TEXT,
  phone_number TEXT,
  email_address TEXT,
  potential_courses_departments TEXT,
  potential_opportunities TEXT,
  estimated_placement_capacity INTEGER,
  relationship_status TEXT NOT NULL DEFAULT 'Prospect',
  last_contact_date DATE,
  next_contact_date DATE,
  mtti_focal_person TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.employer_organizations TO authenticated;
GRANT ALL ON public.employer_organizations TO service_role;
ALTER TABLE public.employer_organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can read employer organizations" ON public.employer_organizations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can create employer organizations" ON public.employer_organizations FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Staff can update employer organizations" ON public.employer_organizations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Creators can delete employer organizations" ON public.employer_organizations FOR DELETE TO authenticated USING (auth.uid() = created_by);
CREATE INDEX employer_organizations_name_idx ON public.employer_organizations (organization_name);

CREATE TABLE public.industry_engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL DEFAULT auth.uid(),
  engagement_date DATE,
  campus TEXT,
  department_course TEXT,
  organization TEXT NOT NULL,
  engagement_type TEXT NOT NULL DEFAULT 'Visit',
  purpose_opportunity TEXT,
  contact_person TEXT,
  contact_details TEXT,
  outcome_commitment TEXT,
  next_follow_up_date DATE,
  follow_up_flag TEXT NOT NULL DEFAULT 'Not Due',
  placement_slots_offered INTEGER,
  responsible_officer TEXT,
  status TEXT NOT NULL DEFAULT 'Open',
  next_action TEXT,
  last_updated DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.industry_engagements TO authenticated;
GRANT ALL ON public.industry_engagements TO service_role;
ALTER TABLE public.industry_engagements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can read industry engagements" ON public.industry_engagements FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can create industry engagements" ON public.industry_engagements FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Staff can update industry engagements" ON public.industry_engagements FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Creators can delete industry engagements" ON public.industry_engagements FOR DELETE TO authenticated USING (auth.uid() = created_by);
CREATE INDEX industry_engagements_follow_up_idx ON public.industry_engagements (next_follow_up_date);

CREATE TABLE public.partner_mous (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL DEFAULT auth.uid(),
  organization TEXT NOT NULL,
  scope_purpose TEXT,
  courses_departments_covered TEXT,
  campuses_covered TEXT,
  mtti_commitments TEXT,
  partner_commitments TEXT,
  attachment_internship_slots INTEGER,
  other_benefits TEXT,
  start_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'Draft',
  renewal_review_date DATE,
  mtti_signatory_owner TEXT,
  partner_signatory_contact TEXT,
  key_terms TEXT,
  document_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_mous TO authenticated;
GRANT ALL ON public.partner_mous TO service_role;
ALTER TABLE public.partner_mous ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can read partner MOUs" ON public.partner_mous FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can create partner MOUs" ON public.partner_mous FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Staff can update partner MOUs" ON public.partner_mous FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Creators can delete partner MOUs" ON public.partner_mous FOR DELETE TO authenticated USING (auth.uid() = created_by);
CREATE INDEX partner_mous_status_idx ON public.partner_mous (status);
CREATE INDEX partner_mous_end_date_idx ON public.partner_mous (end_date);