import {
    CheckCircle,
    TrendingUp,
    Search,
} from "lucide-react";

export function BrowseSection({ onVerifiedReviewsClick }) {
    const features = [
        {
            icon: CheckCircle,
            title: "Verified Reviews",
            color: "bg-green-600",
            description: "Read authentic reviews from students",
        },
        {
            icon: TrendingUp,
            title: "College Prediction",
            color: "bg-blue-600",
            description: "Predict your best matches",
        },
        {
            icon: Search,
            title: "Explore Colleges",
            color: "bg-yellow-500",
            description: "Find the best college for you",
        },
    ];

    return (
        <section className="container mx-auto px-6 py-12">
            <h3 className="text-2xl text-gray-800 mb-6">
                Explore Our Key Features
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={index}
                            onClick={feature.title === "Verified Reviews" ? onVerifiedReviewsClick : undefined}
                            className={`bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow ${feature.title === "Verified Reviews" ? "cursor-pointer hover:border-green-300" : ""}`}
                        >
                            <div
                                className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                            >
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-xl mb-2">{feature.title}</h4>
                            <p className="text-gray-600 text-sm">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
