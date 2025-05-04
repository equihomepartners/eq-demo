import React from 'react';
import { Badge } from '../ui/badge';
import suburbScores from '../../data/suburbScores';

interface SuburbInfoProps {
  selectedSuburb: string;
}

const SuburbInfo: React.FC<SuburbInfoProps> = ({ selectedSuburb }) => {
  const uppercaseSuburb = selectedSuburb.toUpperCase();

  // Get suburb data from scores
  const suburbData = suburbScores[uppercaseSuburb] || {
    score: 50,
    confidence: 50,
    zone: 'yellow',
    liquidity_score: 50,
    liquidity_confidence: 50,
    safety_score: 50,
    safety_confidence: 50,
    infrastructure_score: 50,
    infrastructure_confidence: 50,
    growth_score: 50,
    growth_confidence: 50
  };

  // Determine zone based on score
  const getZoneInfo = (score: number) => {
    if (score >= 80) {
      return {
        zone: 'Green Zone',
        className: 'bg-green-100 text-green-800'
      };
    } else if (score >= 50) {
      return {
        zone: 'Yellow Zone',
        className: 'bg-orange-100 text-orange-800'
      };
    } else {
      return {
        zone: 'Red Zone',
        className: 'bg-red-100 text-red-800'
      };
    }
  };

  const zoneInfo = getZoneInfo(suburbData.score);

  // Format score with confidence
  const formatScore = (score: number, confidence: number) => {
    return `${score.toFixed(0)} (${confidence}% confidence)`;
  };

  return (
    <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md border border-neutral-200 max-w-[280px]">
      <div className="flex items-center space-x-2 mb-2">
        <h4 className="text-sm font-medium">{selectedSuburb}</h4>
        <Badge className={zoneInfo.className}>
          {zoneInfo.zone}
        </Badge>
      </div>

      {/* Scores */}
      <div className="space-y-1 mb-2">
        <div className="flex justify-between text-xs">
          <span className="text-neutral-600">Equihome Score:</span>
          <span className="font-medium">{formatScore(suburbData.score, suburbData.confidence)}</span>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-neutral-600">Liquidity:</span>
          <span className="font-medium">{formatScore(suburbData.liquidity_score, suburbData.liquidity_confidence)}</span>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-neutral-600">Safety:</span>
          <span className="font-medium">{formatScore(suburbData.safety_score, suburbData.safety_confidence)}</span>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-neutral-600">Infrastructure:</span>
          <span className="font-medium">{formatScore(suburbData.infrastructure_score, suburbData.infrastructure_confidence)}</span>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-neutral-600">Growth Potential:</span>
          <span className="font-medium">{formatScore(suburbData.growth_score, suburbData.growth_confidence)}</span>
        </div>
      </div>

      <div className="text-xs text-neutral-500 mt-1">
        Click on a suburb to view detailed analysis
      </div>
    </div>
  );
};

export default SuburbInfo;
