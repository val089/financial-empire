export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.3 (519615d)';
  };
  public: {
    Tables: {
      'categories-financial-entries': {
        Row: {
          created_at: string;
          id: number;
          name:
            | Database['public']['Enums']['CategoryFinancialEntryName']
            | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?:
            | Database['public']['Enums']['CategoryFinancialEntryName']
            | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?:
            | Database['public']['Enums']['CategoryFinancialEntryName']
            | null;
        };
        Relationships: [];
      };
      'financial-entries': {
        Row: {
          amount: number | null;
          category_name:
            | Database['public']['Enums']['CategoryFinancialEntryName']
            | null;
          created_at: string;
          id: number;
          name: string | null;
          subcategory_name:
            | Database['public']['Enums']['SubcategoryFinancialEntryName']
            | null;
          type: Database['public']['Enums']['FinancialEntryType'];
          user_id: string | null;
        };
        Insert: {
          amount?: number | null;
          category_name?:
            | Database['public']['Enums']['CategoryFinancialEntryName']
            | null;
          created_at?: string;
          id?: number;
          name?: string | null;
          subcategory_name?:
            | Database['public']['Enums']['SubcategoryFinancialEntryName']
            | null;
          type: Database['public']['Enums']['FinancialEntryType'];
          user_id?: string | null;
        };
        Update: {
          amount?: number | null;
          category_name?:
            | Database['public']['Enums']['CategoryFinancialEntryName']
            | null;
          created_at?: string;
          id?: number;
          name?: string | null;
          subcategory_name?:
            | Database['public']['Enums']['SubcategoryFinancialEntryName']
            | null;
          type?: Database['public']['Enums']['FinancialEntryType'];
          user_id?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      'subcategories-financial-entries': {
        Row: {
          category_name:
            | Database['public']['Enums']['CategoryFinancialEntryName']
            | null;
          created_at: string;
          id: number;
          name:
            | Database['public']['Enums']['SubcategoryFinancialEntryName']
            | null;
        };
        Insert: {
          category_name?:
            | Database['public']['Enums']['CategoryFinancialEntryName']
            | null;
          created_at?: string;
          id?: number;
          name?:
            | Database['public']['Enums']['SubcategoryFinancialEntryName']
            | null;
        };
        Update: {
          category_name?:
            | Database['public']['Enums']['CategoryFinancialEntryName']
            | null;
          created_at?: string;
          id?: number;
          name?:
            | Database['public']['Enums']['SubcategoryFinancialEntryName']
            | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_total_financial_entries_amount: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
    };
    Enums: {
      CategoryFinancialEntryName:
        | 'income'
        | 'food & drinks'
        | 'housing'
        | 'transportation'
        | 'vehicle'
        | 'life & entertainment'
        | 'communication, pc'
        | 'financial expenses'
        | 'investments'
        | 'others'
        | 'shopping';
      FinancialEntryType: 'income' | 'expense';
      SubcategoryFinancialEntryName:
        | 'groceries'
        | 'restaurant'
        | 'fast-food'
        | 'bar'
        | 'cafe'
        | 'clothes'
        | 'shoes'
        | 'jewels'
        | 'health'
        | 'beauty'
        | 'kids'
        | 'home'
        | 'garden'
        | 'pets'
        | 'animals'
        | 'electronics'
        | 'gifts'
        | 'stationery'
        | 'hobby'
        | 'drug-store'
        | 'chemist'
        | 'rent'
        | 'mortgage'
        | 'energy'
        | 'services'
        | 'maintenance'
        | 'property insurance'
        | 'public transport'
        | 'taxi'
        | 'plane'
        | 'business trips'
        | 'fuel'
        | 'parking'
        | 'vehicle maintenance'
        | 'rentals'
        | 'vehicle insurance'
        | 'leasing'
        | 'health care'
        | 'wellness'
        | 'active sport'
        | 'theatre'
        | 'life events'
        | 'hobbies'
        | 'education'
        | 'books'
        | 'streaming'
        | 'holiday'
        | 'charity'
        | 'alcohol'
        | 'tobacco'
        | 'trips'
        | 'hotels'
        | 'cinema'
        | 'lottery'
        | 'gambling'
        | 'phone'
        | 'internet'
        | 'software'
        | 'apps'
        | 'games'
        | 'postal services'
        | 'taxes'
        | 'insurances'
        | 'loan'
        | 'interests'
        | 'fines'
        | 'advisory'
        | 'charges'
        | 'fees'
        | 'child support'
        | 'vehicles'
        | 'financial investments'
        | 'savings'
        | 'collections'
        | 'wage'
        | 'invoices'
        | 'dividends'
        | 'sale'
        | 'rental income'
        | 'dues'
        | 'grants'
        | 'lending'
        | 'renting'
        | 'checks'
        | 'coupons'
        | 'refunds'
        | 'realty';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      CategoryFinancialEntryName: [
        'income',
        'food & drinks',
        'housing',
        'transportation',
        'vehicle',
        'life & entertainment',
        'communication, pc',
        'financial expenses',
        'investments',
        'others',
        'shopping',
      ],
      FinancialEntryType: ['income', 'expense'],
      SubcategoryFinancialEntryName: [
        'groceries',
        'restaurant',
        'fast-food',
        'bar',
        'cafe',
        'clothes',
        'shoes',
        'jewels',
        'health',
        'beauty',
        'kids',
        'home',
        'garden',
        'pets',
        'animals',
        'electronics',
        'gifts',
        'stationery',
        'hobby',
        'drug-store',
        'chemist',
        'rent',
        'mortgage',
        'energy',
        'services',
        'maintenance',
        'property insurance',
        'public transport',
        'taxi',
        'plane',
        'business trips',
        'fuel',
        'parking',
        'vehicle maintenance',
        'rentals',
        'vehicle insurance',
        'leasing',
        'health care',
        'wellness',
        'active sport',
        'theatre',
        'life events',
        'hobbies',
        'education',
        'books',
        'streaming',
        'holiday',
        'charity',
        'alcohol',
        'tobacco',
        'trips',
        'hotels',
        'cinema',
        'lottery',
        'gambling',
        'phone',
        'internet',
        'software',
        'apps',
        'games',
        'postal services',
        'taxes',
        'insurances',
        'loan',
        'interests',
        'fines',
        'advisory',
        'charges',
        'fees',
        'child support',
        'vehicles',
        'financial investments',
        'savings',
        'collections',
        'wage',
        'invoices',
        'dividends',
        'sale',
        'rental income',
        'dues',
        'grants',
        'lending',
        'renting',
        'checks',
        'coupons',
        'refunds',
        'realty',
      ],
    },
  },
} as const;
