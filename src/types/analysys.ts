export interface AnalysisResult {
    hook_type: string;
    hook_strength: number;
    primary_emotion: string;
    visual_style: string;
    cta_style: string;
    script_flow: string[];
    improvement_suggestions: string[];
}