import {
    Brain,
    Flame,
    Target,
    Sparkles,
} from "lucide-react";

import { AnalysisResult } from "@/types/analysys";

interface Props {
    analysis: AnalysisResult;
}

export default function AnalysisDashboard({
    analysis,
}: Props) {
    return (
        <div className="w-full mt-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Flame className="text-orange-500" />
                        <h3 className="font-bold">
                            Hook Type
                        </h3>
                    </div>

                    <p>{analysis.hook_type}</p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Brain className="text-purple-500" />
                        <h3 className="font-bold">
                            Hook Strength
                        </h3>
                    </div>

                    <p>
                        {analysis.hook_strength}/10
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="text-yellow-500" />
                        <h3 className="font-bold">
                            Primary Emotion
                        </h3>
                    </div>

                    <p>
                        {analysis.primary_emotion}
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="text-blue-500" />
                        <h3 className="font-bold">
                            CTA Style
                        </h3>
                    </div>

                    <p>{analysis.cta_style}</p>
                </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <h3 className="font-bold mb-3">
                    Script Flow
                </h3>

                <ul className="space-y-2">
                    {analysis.script_flow?.map(
                        (step, index) => (
                            <li
                                key={index}
                                className="text-zinc-300"
                            >
                                • {step}
                            </li>
                        )
                    )}
                </ul>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <h3 className="font-bold mb-3">
                    Improvement Suggestions
                </h3>

                <ul className="space-y-2">
                    {analysis.improvement_suggestions?.map(
                        (tip, index) => (
                            <li
                                key={index}
                                className="text-zinc-300"
                            >
                                • {tip}
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}