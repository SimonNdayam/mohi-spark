export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      employer_organizations: {
        Row: {
          contact_job_title: string | null
          contact_person: string | null
          created_at: string
          created_by: string
          email_address: string | null
          estimated_placement_capacity: number | null
          id: string
          industry_sector: string | null
          last_contact_date: string | null
          mtti_focal_person: string | null
          next_contact_date: string | null
          notes: string | null
          organization_name: string
          organization_type: string | null
          phone_number: string | null
          physical_location: string | null
          potential_courses_departments: string | null
          potential_opportunities: string | null
          relationship_status: string
          updated_at: string
          website: string | null
        }
        Insert: {
          contact_job_title?: string | null
          contact_person?: string | null
          created_at?: string
          created_by?: string
          email_address?: string | null
          estimated_placement_capacity?: number | null
          id?: string
          industry_sector?: string | null
          last_contact_date?: string | null
          mtti_focal_person?: string | null
          next_contact_date?: string | null
          notes?: string | null
          organization_name: string
          organization_type?: string | null
          phone_number?: string | null
          physical_location?: string | null
          potential_courses_departments?: string | null
          potential_opportunities?: string | null
          relationship_status?: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          contact_job_title?: string | null
          contact_person?: string | null
          created_at?: string
          created_by?: string
          email_address?: string | null
          estimated_placement_capacity?: number | null
          id?: string
          industry_sector?: string | null
          last_contact_date?: string | null
          mtti_focal_person?: string | null
          next_contact_date?: string | null
          notes?: string | null
          organization_name?: string
          organization_type?: string | null
          phone_number?: string | null
          physical_location?: string | null
          potential_courses_departments?: string | null
          potential_opportunities?: string | null
          relationship_status?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      graduate_employment: {
        Row: {
          admission_no: string | null
          campus: string | null
          career_notes: string | null
          consent_to_follow_up: boolean
          created_at: string
          created_by: string
          department_course: string | null
          employer_organization: string | null
          employment_status: string
          employment_type: string | null
          follow_up_date: string | null
          graduate_name: string
          graduation_date: string | null
          id: string
          job_title: string | null
          last_contact_date: string | null
          qualification_level: string | null
          responsible_officer: string | null
          town_county: string | null
          updated_at: string
          year_graduated: number | null
        }
        Insert: {
          admission_no?: string | null
          campus?: string | null
          career_notes?: string | null
          consent_to_follow_up?: boolean
          created_at?: string
          created_by?: string
          department_course?: string | null
          employer_organization?: string | null
          employment_status?: string
          employment_type?: string | null
          follow_up_date?: string | null
          graduate_name: string
          graduation_date?: string | null
          id?: string
          job_title?: string | null
          last_contact_date?: string | null
          qualification_level?: string | null
          responsible_officer?: string | null
          town_county?: string | null
          updated_at?: string
          year_graduated?: number | null
        }
        Update: {
          admission_no?: string | null
          campus?: string | null
          career_notes?: string | null
          consent_to_follow_up?: boolean
          created_at?: string
          created_by?: string
          department_course?: string | null
          employer_organization?: string | null
          employment_status?: string
          employment_type?: string | null
          follow_up_date?: string | null
          graduate_name?: string
          graduation_date?: string | null
          id?: string
          job_title?: string | null
          last_contact_date?: string | null
          qualification_level?: string | null
          responsible_officer?: string | null
          town_county?: string | null
          updated_at?: string
          year_graduated?: number | null
        }
        Relationships: []
      }
      industrial_attachments: {
        Row: {
          admission_no: string | null
          assessment_date: string | null
          attachment_required: boolean
          campus: string | null
          created_at: string
          created_by: string
          department_course: string | null
          employer_feedback: string | null
          expected_end_date: string | null
          expected_graduation_date: string | null
          host_organization: string | null
          id: string
          industry_supervisor_contact: string | null
          intake: string | null
          level_module: string | null
          logbook_status: string
          mtti_supervisor: string | null
          next_action: string | null
          next_follow_up_date: string | null
          responsible_officer: string | null
          start_date: string | null
          status: string
          student_name: string
          support_needs: string | null
          updated_at: string
          workplace_location: string | null
        }
        Insert: {
          admission_no?: string | null
          assessment_date?: string | null
          attachment_required?: boolean
          campus?: string | null
          created_at?: string
          created_by?: string
          department_course?: string | null
          employer_feedback?: string | null
          expected_end_date?: string | null
          expected_graduation_date?: string | null
          host_organization?: string | null
          id?: string
          industry_supervisor_contact?: string | null
          intake?: string | null
          level_module?: string | null
          logbook_status?: string
          mtti_supervisor?: string | null
          next_action?: string | null
          next_follow_up_date?: string | null
          responsible_officer?: string | null
          start_date?: string | null
          status?: string
          student_name: string
          support_needs?: string | null
          updated_at?: string
          workplace_location?: string | null
        }
        Update: {
          admission_no?: string | null
          assessment_date?: string | null
          attachment_required?: boolean
          campus?: string | null
          created_at?: string
          created_by?: string
          department_course?: string | null
          employer_feedback?: string | null
          expected_end_date?: string | null
          expected_graduation_date?: string | null
          host_organization?: string | null
          id?: string
          industry_supervisor_contact?: string | null
          intake?: string | null
          level_module?: string | null
          logbook_status?: string
          mtti_supervisor?: string | null
          next_action?: string | null
          next_follow_up_date?: string | null
          responsible_officer?: string | null
          start_date?: string | null
          status?: string
          student_name?: string
          support_needs?: string | null
          updated_at?: string
          workplace_location?: string | null
        }
        Relationships: []
      }
      industry_engagements: {
        Row: {
          campus: string | null
          contact_details: string | null
          contact_person: string | null
          created_at: string
          created_by: string
          department_course: string | null
          engagement_date: string | null
          engagement_type: string
          follow_up_flag: string
          id: string
          last_updated: string | null
          next_action: string | null
          next_follow_up_date: string | null
          organization: string
          outcome_commitment: string | null
          placement_slots_offered: number | null
          purpose_opportunity: string | null
          responsible_officer: string | null
          status: string
          updated_at: string
        }
        Insert: {
          campus?: string | null
          contact_details?: string | null
          contact_person?: string | null
          created_at?: string
          created_by?: string
          department_course?: string | null
          engagement_date?: string | null
          engagement_type?: string
          follow_up_flag?: string
          id?: string
          last_updated?: string | null
          next_action?: string | null
          next_follow_up_date?: string | null
          organization: string
          outcome_commitment?: string | null
          placement_slots_offered?: number | null
          purpose_opportunity?: string | null
          responsible_officer?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          campus?: string | null
          contact_details?: string | null
          contact_person?: string | null
          created_at?: string
          created_by?: string
          department_course?: string | null
          engagement_date?: string | null
          engagement_type?: string
          follow_up_flag?: string
          id?: string
          last_updated?: string | null
          next_action?: string | null
          next_follow_up_date?: string | null
          organization?: string
          outcome_commitment?: string | null
          placement_slots_offered?: number | null
          purpose_opportunity?: string | null
          responsible_officer?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      partner_mous: {
        Row: {
          attachment_internship_slots: number | null
          campuses_covered: string | null
          courses_departments_covered: string | null
          created_at: string
          created_by: string
          document_url: string | null
          end_date: string | null
          id: string
          key_terms: string | null
          mtti_commitments: string | null
          mtti_signatory_owner: string | null
          organization: string
          other_benefits: string | null
          partner_commitments: string | null
          partner_signatory_contact: string | null
          renewal_review_date: string | null
          scope_purpose: string | null
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          attachment_internship_slots?: number | null
          campuses_covered?: string | null
          courses_departments_covered?: string | null
          created_at?: string
          created_by?: string
          document_url?: string | null
          end_date?: string | null
          id?: string
          key_terms?: string | null
          mtti_commitments?: string | null
          mtti_signatory_owner?: string | null
          organization: string
          other_benefits?: string | null
          partner_commitments?: string | null
          partner_signatory_contact?: string | null
          renewal_review_date?: string | null
          scope_purpose?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          attachment_internship_slots?: number | null
          campuses_covered?: string | null
          courses_departments_covered?: string | null
          created_at?: string
          created_by?: string
          document_url?: string | null
          end_date?: string | null
          id?: string
          key_terms?: string | null
          mtti_commitments?: string | null
          mtti_signatory_owner?: string | null
          organization?: string
          other_benefits?: string | null
          partner_commitments?: string | null
          partner_signatory_contact?: string | null
          renewal_review_date?: string | null
          scope_purpose?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
