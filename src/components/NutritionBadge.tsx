import React from 'react';

interface NutritionBadgeProps {
    nutriscore?: string;
}

export function NutritionBadge({ nutriscore }: NutritionBadgeProps) {
    if (!nutriscore) return null;

    const grade = nutriscore.toLowerCase();

    const getColors = (grade: string) => {
        switch (grade) {
            case 'a': return 'bg-green-700 text-white';
            case 'b': return 'bg-green-500 text-white';
            case 'c': return 'bg-yellow-400 text-black';
            case 'd': return 'bg-orange-500 text-white';
            case 'e': return 'bg-red-600 text-white';
            default: return 'bg-gray-300 text-gray-600';
        }
    };

    return (
        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-md font-bold text-sm uppercase shadow-sm ${getColors(grade)}`} title={`Nutri-Score: ${grade.toUpperCase()}`}>
            {grade}
        </div>
    );
}
