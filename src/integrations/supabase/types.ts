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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      agent_events: {
        Row: {
          action: string
          agent: string
          confidence: number | null
          created_at: string
          id: string
          input_tokens: number | null
          latency_ms: number | null
          metadata: Json
          outcome: string | null
          output_tokens: number | null
          sources_retrieved: number
          user_id: string | null
        }
        Insert: {
          action: string
          agent: string
          confidence?: number | null
          created_at?: string
          id?: string
          input_tokens?: number | null
          latency_ms?: number | null
          metadata?: Json
          outcome?: string | null
          output_tokens?: number | null
          sources_retrieved?: number
          user_id?: string | null
        }
        Update: {
          action?: string
          agent?: string
          confidence?: number | null
          created_at?: string
          id?: string
          input_tokens?: number | null
          latency_ms?: number | null
          metadata?: Json
          outcome?: string | null
          output_tokens?: number | null
          sources_retrieved?: number
          user_id?: string | null
        }
        Relationships: []
      }
      asset_bids: {
        Row: {
          asset_id: string
          bid_amount: number
          bidder_id: string
          created_at: string
          currency: string
          id: string
          message: string | null
          status: string
        }
        Insert: {
          asset_id: string
          bid_amount: number
          bidder_id: string
          created_at?: string
          currency?: string
          id?: string
          message?: string | null
          status?: string
        }
        Update: {
          asset_id?: string
          bid_amount?: number
          bidder_id?: string
          created_at?: string
          currency?: string
          id?: string
          message?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "asset_bids_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "impact_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_transactions: {
        Row: {
          amount_usd: number
          asset_id: string
          bid_id: string | null
          buyer_id: string
          fee_usd: number
          id: string
          net_usd: number
          seller_id: string
          settled_at: string
        }
        Insert: {
          amount_usd: number
          asset_id: string
          bid_id?: string | null
          buyer_id: string
          fee_usd?: number
          id?: string
          net_usd?: number
          seller_id: string
          settled_at?: string
        }
        Update: {
          amount_usd?: number
          asset_id?: string
          bid_id?: string | null
          buyer_id?: string
          fee_usd?: number
          id?: string
          net_usd?: number
          seller_id?: string
          settled_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "asset_transactions_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "impact_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_transactions_bid_id_fkey"
            columns: ["bid_id"]
            isOneToOne: false
            referencedRelation: "asset_bids"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          actor_name: string | null
          created_at: string
          details: Json
          entity_id: string | null
          entity_type: string
          id: string
          subject_user_id: string | null
          summary: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_name?: string | null
          created_at?: string
          details?: Json
          entity_id?: string | null
          entity_type: string
          id?: string
          subject_user_id?: string | null
          summary: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_name?: string | null
          created_at?: string
          details?: Json
          entity_id?: string | null
          entity_type?: string
          id?: string
          subject_user_id?: string | null
          summary?: string
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          parts: Json | null
          role: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          parts?: Json | null
          role: string
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          parts?: Json | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          likes: number
          replies: number
          user_id: string
        }
        Insert: {
          category?: string
          content: string
          created_at?: string
          id?: string
          likes?: number
          replies?: number
          user_id: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          likes?: number
          replies?: number
          user_id?: string
        }
        Relationships: []
      }
      decision_report_versions: {
        Row: {
          funding_request_id: string
          generated_at: string
          human_approval: string
          human_decided_at: string | null
          human_decided_by: string | null
          human_decided_by_name: string | null
          human_decision_notes: string | null
          id: string
          report: Json
          version: number
        }
        Insert: {
          funding_request_id: string
          generated_at?: string
          human_approval?: string
          human_decided_at?: string | null
          human_decided_by?: string | null
          human_decided_by_name?: string | null
          human_decision_notes?: string | null
          id?: string
          report: Json
          version: number
        }
        Update: {
          funding_request_id?: string
          generated_at?: string
          human_approval?: string
          human_decided_at?: string | null
          human_decided_by?: string | null
          human_decided_by_name?: string | null
          human_decision_notes?: string | null
          id?: string
          report?: Json
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "decision_report_versions_funding_request_id_fkey"
            columns: ["funding_request_id"]
            isOneToOne: false
            referencedRelation: "funding_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      economic_edges: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          relationship: string
          source_id: string
          target_id: string
          weight: number
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json
          relationship: string
          source_id: string
          target_id: string
          weight?: number
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          relationship?: string
          source_id?: string
          target_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "economic_edges_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "economic_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "economic_edges_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "economic_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      economic_nodes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          kind: Database["public"]["Enums"]["node_type"]
          metadata: Json
          name: string
          owner_user_id: string | null
          region: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          kind: Database["public"]["Enums"]["node_type"]
          metadata?: Json
          name: string
          owner_user_id?: string | null
          region?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["node_type"]
          metadata?: Json
          name?: string
          owner_user_id?: string | null
          region?: string | null
        }
        Relationships: []
      }
      ephemeral_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          purpose: string
          token: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          purpose: string
          token: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          purpose?: string
          token?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      funding_requests: {
        Row: {
          amount_requested: number
          attachments: Json
          created_at: string
          currency: string
          current_version: number
          decision_report: Json | null
          final_version_id: string | null
          human_approval: string
          human_decided_at: string | null
          human_decided_by: string | null
          human_decision_notes: string | null
          id: string
          pitch: string
          region: string | null
          sector: string | null
          status: Database["public"]["Enums"]["funding_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_requested?: number
          attachments?: Json
          created_at?: string
          currency?: string
          current_version?: number
          decision_report?: Json | null
          final_version_id?: string | null
          human_approval?: string
          human_decided_at?: string | null
          human_decided_by?: string | null
          human_decision_notes?: string | null
          id?: string
          pitch: string
          region?: string | null
          sector?: string | null
          status?: Database["public"]["Enums"]["funding_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_requested?: number
          attachments?: Json
          created_at?: string
          currency?: string
          current_version?: number
          decision_report?: Json | null
          final_version_id?: string | null
          human_approval?: string
          human_decided_at?: string | null
          human_decided_by?: string | null
          human_decision_notes?: string | null
          id?: string
          pitch?: string
          region?: string | null
          sector?: string | null
          status?: Database["public"]["Enums"]["funding_status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "funding_requests_final_version_id_fkey"
            columns: ["final_version_id"]
            isOneToOne: false
            referencedRelation: "decision_report_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      impact_assets: {
        Row: {
          ask_price_usd: number | null
          currency: string
          description: string | null
          funding_request_id: string | null
          id: string
          kind: string
          minted_at: string
          owner_user_id: string
          quantity: number
          region: string | null
          sdg_tags: string[]
          sector: string | null
          status: string
          title: string
          unit: string
          verification_event_id: string | null
          verification_score: number
        }
        Insert: {
          ask_price_usd?: number | null
          currency?: string
          description?: string | null
          funding_request_id?: string | null
          id?: string
          kind: string
          minted_at?: string
          owner_user_id: string
          quantity: number
          region?: string | null
          sdg_tags?: string[]
          sector?: string | null
          status?: string
          title: string
          unit: string
          verification_event_id?: string | null
          verification_score?: number
        }
        Update: {
          ask_price_usd?: number | null
          currency?: string
          description?: string | null
          funding_request_id?: string | null
          id?: string
          kind?: string
          minted_at?: string
          owner_user_id?: string
          quantity?: number
          region?: string | null
          sdg_tags?: string[]
          sector?: string | null
          status?: string
          title?: string
          unit?: string
          verification_event_id?: string | null
          verification_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "impact_assets_funding_request_id_fkey"
            columns: ["funding_request_id"]
            isOneToOne: false
            referencedRelation: "funding_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "impact_assets_verification_event_id_fkey"
            columns: ["verification_event_id"]
            isOneToOne: false
            referencedRelation: "verification_events"
            referencedColumns: ["id"]
          },
        ]
      }
      interaction_steps: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          status: string
          step: string
          user_id: string | null
          workflow_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json
          status?: string
          step: string
          user_id?: string | null
          workflow_id: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          status?: string
          step?: string
          user_id?: string | null
          workflow_id?: string
        }
        Relationships: []
      }
      knowledge_documents: {
        Row: {
          chunk_index: number
          content: string
          created_at: string
          doc_kind: string
          embedding: string | null
          file_name: string
          file_type: string | null
          funding_request_id: string | null
          id: string
          storage_path: string | null
          tags: string[]
          total_chunks: number
          user_id: string
        }
        Insert: {
          chunk_index?: number
          content: string
          created_at?: string
          doc_kind?: string
          embedding?: string | null
          file_name: string
          file_type?: string | null
          funding_request_id?: string | null
          id?: string
          storage_path?: string | null
          tags?: string[]
          total_chunks?: number
          user_id: string
        }
        Update: {
          chunk_index?: number
          content?: string
          created_at?: string
          doc_kind?: string
          embedding?: string | null
          file_name?: string
          file_type?: string | null
          funding_request_id?: string | null
          id?: string
          storage_path?: string | null
          tags?: string[]
          total_chunks?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_documents_funding_request_id_fkey"
            columns: ["funding_request_id"]
            isOneToOne: false
            referencedRelation: "funding_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          created_at: string
          email_decision: boolean
          email_review_needed: boolean
          email_submission: boolean
          inapp_decision: boolean
          inapp_review_needed: boolean
          inapp_submission: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_decision?: boolean
          email_review_needed?: boolean
          email_submission?: boolean
          inapp_decision?: boolean
          inapp_review_needed?: boolean
          inapp_submission?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_decision?: boolean
          email_review_needed?: boolean
          email_submission?: boolean
          inapp_decision?: boolean
          inapp_review_needed?: boolean
          inapp_submission?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          kind: string
          link: string | null
          metadata: Json
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          kind: string
          link?: string | null
          metadata?: Json
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          kind?: string
          link?: string | null
          metadata?: Json
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          region: string | null
          subscription_plan: string
          subscription_status: string
          trust_score: number
          updated_at: string
          user_id: string
          verified: boolean
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          region?: string | null
          subscription_plan?: string
          subscription_status?: string
          trust_score?: number
          updated_at?: string
          user_id: string
          verified?: boolean
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          region?: string | null
          subscription_plan?: string
          subscription_status?: string
          trust_score?: number
          updated_at?: string
          user_id?: string
          verified?: boolean
        }
        Relationships: []
      }
      risk_scores: {
        Row: {
          computed_at: string
          flags: Json
          id: string
          rationale: string | null
          recommendation: string | null
          risk_level: string
          signals: Json
          trust_score: number
          user_id: string
        }
        Insert: {
          computed_at?: string
          flags?: Json
          id?: string
          rationale?: string | null
          recommendation?: string | null
          risk_level?: string
          signals?: Json
          trust_score?: number
          user_id: string
        }
        Update: {
          computed_at?: string
          flags?: Json
          id?: string
          rationale?: string | null
          recommendation?: string | null
          risk_level?: string
          signals?: Json
          trust_score?: number
          user_id?: string
        }
        Relationships: []
      }
      subscription_events: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          event_type: string
          id: string
          metadata: Json
          plan: string
          user_id: string
        }
        Insert: {
          amount_cents?: number
          created_at?: string
          currency?: string
          event_type: string
          id?: string
          metadata?: Json
          plan: string
          user_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          event_type?: string
          id?: string
          metadata?: Json
          plan?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          granted_at: string
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      verification_events: {
        Row: {
          created_at: string
          evidence_url: string | null
          id: string
          kind: string
          notes: string | null
          status: Database["public"]["Enums"]["verification_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          evidence_url?: string | null
          id?: string
          kind: string
          notes?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          user_id: string
        }
        Update: {
          created_at?: string
          evidence_url?: string | null
          id?: string
          kind?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      agent_performance: {
        Row: {
          action: string | null
          agent: string | null
          avg_confidence_pct: number | null
          avg_latency_ms: number | null
          avg_sources: number | null
          avg_tokens: number | null
          error_count: number | null
          last_call_at: string | null
          total_calls: number | null
        }
        Relationships: []
      }
      rve_marketplace_stats: {
        Row: {
          asset_types: number | null
          listed: number | null
          sold: number | null
          total_assets: number | null
          total_listed_value: number | null
          unique_sellers: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      accept_asset_bid: {
        Args: { _actor_id: string; _bid_id: string }
        Returns: Json
      }
      expire_sessions: { Args: never; Returns: undefined }
      get_notif_pref: {
        Args: { _channel: string; _event: string; _user: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_post_likes: { Args: { post_id: string }; Returns: undefined }
      is_reviewer: { Args: { _user_id: string }; Returns: boolean }
      log_audit: {
        Args: {
          _action: string
          _actor: string
          _details: Json
          _entity_id: string
          _entity_type: string
          _subject: string
          _summary: string
        }
        Returns: undefined
      }
      notify_user: {
        Args: {
          _body: string
          _kind: string
          _link: string
          _metadata: Json
          _title: string
          _user: string
        }
        Returns: undefined
      }
      queue_sanctum_email: {
        Args: {
          _body: string
          _heading: string
          _link: string
          _subject: string
          _template: string
          _user: string
        }
        Returns: undefined
      }
      recalc_trust_score: { Args: { _user_id: string }; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "reviewer" | "member"
      funding_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "declined"
        | "withdrawn"
      node_type:
        | "business"
        | "investor"
        | "supplier"
        | "community"
        | "partnership"
      verification_status: "pending" | "verified" | "rejected"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "reviewer", "member"],
      funding_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "declined",
        "withdrawn",
      ],
      node_type: [
        "business",
        "investor",
        "supplier",
        "community",
        "partnership",
      ],
      verification_status: ["pending", "verified", "rejected"],
    },
  },
} as const
