export interface GlossaryTerm {
    key: string;
    label: string;
    shortDef: string;
    category?: 'Risk' | 'Performance' | 'Trading' | 'General';
}
