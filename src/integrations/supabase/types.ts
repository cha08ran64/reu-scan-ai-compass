export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      community_items: {
        Row: {
          bin_type: string | null
          category: string | null
          created_at: string
          description: string | null
          downvotes: number | null
          id: string
          image_url: string | null
          item_name: string
          material_type: string | null
          upvotes: number | null
          user_id: string
          verified: boolean | null
        }
        Insert: {
          bin_type?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          downvotes?: number | null
          id?: string
          image_url?: string | null
          item_name: string
          material_type?: string | null
          upvotes?: number | null
          user_id: string
          verified?: boolean | null
        }
        Update: {
          bin_type?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          downvotes?: number | null
          id?: string
          image_url?: string | null
          item_name?: string
          material_type?: string | null
          upvotes?: number | null
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      educational_content: {
        Row: {
          category: string | null
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          published: boolean | null
          tags: string[] | null
          title: string
          video_url: string | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean | null
          tags?: string[] | null
          title: string
          video_url?: string | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean | null
          tags?: string[] | null
          title?: string
          video_url?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          message: string | null
          read: boolean | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          message?: string | null
          read?: boolean | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          message?: string | null
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      recycling_centers: {
        Row: {
          accepted_materials: string[] | null
          address: string
          created_at: string
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          operating_hours: Json | null
          phone: string | null
          website: string | null
        }
        Insert: {
          accepted_materials?: string[] | null
          address: string
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          operating_hours?: Json | null
          phone?: string | null
          website?: string | null
        }
        Update: {
          accepted_materials?: string[] | null
          address?: string
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          operating_hours?: Json | null
          phone?: string | null
          website?: string | null
        }
        Relationships: []
      }
      scan_history: {
        Row: {
          ai_generated_info: string | null
          bin_type: string | null
          carbon_saved: number | null
          category: string | null
          confidence_score: number | null
          created_at: string
          eco_advice: string | null
          eco_points: number | null
          fun_facts: string | null
          id: string
          image_url: string | null
          item_name: string
          material_type: string | null
          recyclable: boolean | null
          reusable: boolean | null
          user_id: string
        }
        Insert: {
          ai_generated_info?: string | null
          bin_type?: string | null
          carbon_saved?: number | null
          category?: string | null
          confidence_score?: number | null
          created_at?: string
          eco_advice?: string | null
          eco_points?: number | null
          fun_facts?: string | null
          id?: string
          image_url?: string | null
          item_name: string
          material_type?: string | null
          recyclable?: boolean | null
          reusable?: boolean | null
          user_id: string
        }
        Update: {
          ai_generated_info?: string | null
          bin_type?: string | null
          carbon_saved?: number | null
          category?: string | null
          confidence_score?: number | null
          created_at?: string
          eco_advice?: string | null
          eco_points?: number | null
          fun_facts?: string | null
          id?: string
          image_url?: string | null
          item_name?: string
          material_type?: string | null
          recyclable?: boolean | null
          reusable?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      user_points: {
        Row: {
          badges: string[] | null
          created_at: string
          id: string
          level: number | null
          total_points: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          badges?: string[] | null
          created_at?: string
          id?: string
          level?: number | null
          total_points?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          badges?: string[] | null
          created_at?: string
          id?: string
          level?: number | null
          total_points?: number | null
          updated_at?: string
          user_id?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
