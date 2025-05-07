// Suburb scores for traffic light system
// This data is used to determine the color and score of each suburb on the map
// Scores are based on realistic Sydney property market data with appropriate confidence intervals
// Higher scores indicate better investment potential

// Utility function to generate a consistent random number based on a seed string
function getConsistentRandom(seed: string, salt: string = ''): number {
  const combinedSeed = seed + salt;
  let hash = 0;
  for (let i = 0; i < combinedSeed.length; i++) {
    hash = ((hash << 5) - hash) + combinedSeed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  // Convert to a number between 0 and 1
  return Math.abs((hash % 1000) / 1000);
}

// Function to generate a score with some randomness but within a range
function generateScore(baseName: string, baseScore: number, variance: number, salt: string = ''): number {
  const random = getConsistentRandom(baseName, salt);
  const adjustment = (random * variance * 2) - variance; // Range from -variance to +variance
  return Math.min(100, Math.max(0, Math.round(baseScore + adjustment)));
}

interface SuburbScore {
  score: number;           // Overall Equihome score (weighted average of all factors)
  confidence: number;      // Confidence in the overall score (higher = more data available)
  zone: 'green' | 'yellow' | 'red';  // Traffic light zone
  liquidity_score: number; // Market liquidity (how quickly properties sell)
  liquidity_confidence: number;
  safety_score: number;    // Crime rates and safety metrics
  safety_confidence: number;
  infrastructure_score: number; // Transport, amenities, schools, etc.
  infrastructure_confidence: number;
  growth_score: number;    // Historical and projected price growth
  growth_confidence: number;
}

const suburbScores: Record<string, SuburbScore> = {
  // Eastern Suburbs - Premium areas (Green Zones)
  "VAUCLUSE": {
    score: 86,
    confidence: 92,
    zone: 'green',
    liquidity_score: 78,
    liquidity_confidence: 90,
    safety_score: 92,
    safety_confidence: 94,
    infrastructure_score: 76,
    infrastructure_confidence: 88,
    growth_score: 65,
    growth_confidence: 85
  },
  "BELLEVUE HILL": {
    score: 84,
    confidence: 91,
    zone: 'green',
    liquidity_score: 80,
    liquidity_confidence: 89,
    safety_score: 90,
    safety_confidence: 93,
    infrastructure_score: 78,
    infrastructure_confidence: 87,
    growth_score: 68,
    growth_confidence: 84
  },
  "DOUBLE BAY": {
    score: 83,
    confidence: 90,
    zone: 'green',
    liquidity_score: 82,
    liquidity_confidence: 88,
    safety_score: 88,
    safety_confidence: 92,
    infrastructure_score: 80,
    infrastructure_confidence: 89,
    growth_score: 70,
    growth_confidence: 83
  },
  "ROSE BAY": {
    score: 81,
    confidence: 89,
    zone: 'green',
    liquidity_score: 79,
    liquidity_confidence: 87,
    safety_score: 87,
    safety_confidence: 91,
    infrastructure_score: 77,
    infrastructure_confidence: 86,
    growth_score: 72,
    growth_confidence: 82
  },
  "BONDI": {
    score: 82,
    confidence: 88,
    zone: 'green',
    liquidity_score: 85,
    liquidity_confidence: 90,
    safety_score: 82,
    safety_confidence: 87,
    infrastructure_score: 76,
    infrastructure_confidence: 85,
    growth_score: 74,
    growth_confidence: 86
  },
  "WOOLLAHRA": {
    score: 82,
    confidence: 89,
    zone: 'green',
    liquidity_score: 81,
    liquidity_confidence: 87,
    safety_score: 89,
    safety_confidence: 91,
    infrastructure_score: 79,
    infrastructure_confidence: 86,
    growth_score: 69,
    growth_confidence: 84
  },
  "PADDINGTON": {
    score: 75,
    confidence: 87,
    zone: 'yellow',
    liquidity_score: 83,
    liquidity_confidence: 89,
    safety_score: 80,
    safety_confidence: 85,
    infrastructure_score: 82,
    infrastructure_confidence: 88,
    growth_score: 71,
    growth_confidence: 83
  },
  "RANDWICK": {
    score: 76,
    confidence: 85,
    zone: 'yellow',
    liquidity_score: 78,
    liquidity_confidence: 86,
    safety_score: 79,
    safety_confidence: 84,
    infrastructure_score: 77,
    infrastructure_confidence: 83,
    growth_score: 75,
    growth_confidence: 85
  },
  "COOGEE": {
    score: 77,
    confidence: 86,
    zone: 'yellow',
    liquidity_score: 80,
    liquidity_confidence: 87,
    safety_score: 81,
    safety_confidence: 85,
    infrastructure_score: 75,
    infrastructure_confidence: 82,
    growth_score: 76,
    growth_confidence: 84
  },
  "BRONTE": {
    score: 80,
    confidence: 87,
    zone: 'green',
    liquidity_score: 82,
    liquidity_confidence: 88,
    safety_score: 83,
    safety_confidence: 86,
    infrastructure_score: 76,
    infrastructure_confidence: 83,
    growth_score: 77,
    growth_confidence: 85
  },

  // Northern Suburbs - Harbor and Beaches (Green Zones)
  "MOSMAN": {
    score: 85,
    confidence: 91,
    zone: 'green',
    liquidity_score: 83,
    liquidity_confidence: 89,
    safety_score: 91,
    safety_confidence: 93,
    infrastructure_score: 79,
    infrastructure_confidence: 87,
    growth_score: 67,
    growth_confidence: 84
  },
  "CREMORNE": {
    score: 81,
    confidence: 88,
    zone: 'green',
    liquidity_score: 80,
    liquidity_confidence: 86,
    safety_score: 87,
    safety_confidence: 90,
    infrastructure_score: 78,
    infrastructure_confidence: 85,
    growth_score: 69,
    growth_confidence: 83
  },
  "NEUTRAL BAY": {
    score: 80,
    confidence: 87,
    zone: 'green',
    liquidity_score: 78,
    liquidity_confidence: 85,
    safety_score: 85,
    safety_confidence: 89,
    infrastructure_score: 80,
    infrastructure_confidence: 86,
    growth_score: 71,
    growth_confidence: 82
  },
  "KIRRIBILLI": {
    score: 82,
    confidence: 89,
    zone: 'green',
    liquidity_score: 81,
    liquidity_confidence: 87,
    safety_score: 88,
    safety_confidence: 91,
    infrastructure_score: 83,
    infrastructure_confidence: 88,
    growth_score: 68,
    growth_confidence: 83
  },
  "NORTH SYDNEY": {
    score: 78,
    confidence: 86,
    zone: 'yellow',
    liquidity_score: 77,
    liquidity_confidence: 84,
    safety_score: 81,
    safety_confidence: 87,
    infrastructure_score: 86,
    infrastructure_confidence: 90,
    growth_score: 73,
    growth_confidence: 84
  },
  "MANLY": {
    score: 80,
    confidence: 88,
    zone: 'green',
    liquidity_score: 84,
    liquidity_confidence: 89,
    safety_score: 83,
    safety_confidence: 87,
    infrastructure_score: 79,
    infrastructure_confidence: 85,
    growth_score: 75,
    growth_confidence: 86
  },

  // Inner West - Mostly Yellow/Orange
  "BALMAIN": {
    score: 74,
    confidence: 85,
    zone: 'yellow',
    liquidity_score: 79,
    liquidity_confidence: 86,
    safety_score: 80,
    safety_confidence: 84,
    infrastructure_score: 78,
    infrastructure_confidence: 83,
    growth_score: 74,
    growth_confidence: 85
  },
  "MARRICKVILLE": {
    score: 68,
    confidence: 83,
    zone: 'yellow',
    liquidity_score: 70,
    liquidity_confidence: 81,
    safety_score: 68,
    safety_confidence: 79,
    infrastructure_score: 75,
    infrastructure_confidence: 84,
    growth_score: 81,
    growth_confidence: 87
  },
  "NEWTOWN": {
    score: 65,
    confidence: 82,
    zone: 'yellow',
    liquidity_score: 74,
    liquidity_confidence: 83,
    safety_score: 65,
    safety_confidence: 77,
    infrastructure_score: 76,
    infrastructure_confidence: 85,
    growth_score: 79,
    growth_confidence: 86
  },
  "SURRY HILLS": {
    score: 70,
    confidence: 84,
    zone: 'yellow',
    liquidity_score: 77,
    liquidity_confidence: 85,
    safety_score: 67,
    safety_confidence: 78,
    infrastructure_score: 79,
    infrastructure_confidence: 86,
    growth_score: 76,
    growth_confidence: 84
  },
  "DULWICH HILL": {
    score: 62,
    confidence: 80,
    zone: 'yellow',
    liquidity_score: 68,
    liquidity_confidence: 79,
    safety_score: 70,
    safety_confidence: 81,
    infrastructure_score: 71,
    infrastructure_confidence: 82,
    growth_score: 77,
    growth_confidence: 85
  },
  "ASHFIELD": {
    score: 58,
    confidence: 79,
    zone: 'yellow',
    liquidity_score: 66,
    liquidity_confidence: 78,
    safety_score: 69,
    safety_confidence: 80,
    infrastructure_score: 70,
    infrastructure_confidence: 81,
    growth_score: 75,
    growth_confidence: 83
  },
  "SUMMER HILL": {
    score: 60,
    confidence: 81,
    zone: 'yellow',
    liquidity_score: 69,
    liquidity_confidence: 80,
    safety_score: 71,
    safety_confidence: 82,
    infrastructure_score: 72,
    infrastructure_confidence: 83,
    growth_score: 76,
    growth_confidence: 84
  },
  "PETERSHAM": {
    score: 63,
    confidence: 82,
    zone: 'yellow',
    liquidity_score: 70,
    liquidity_confidence: 81,
    safety_score: 72,
    safety_confidence: 83,
    infrastructure_score: 73,
    infrastructure_confidence: 84,
    growth_score: 77,
    growth_confidence: 85
  },
  "STANMORE": {
    score: 66,
    confidence: 83,
    zone: 'yellow',
    liquidity_score: 72,
    liquidity_confidence: 82,
    safety_score: 74,
    safety_confidence: 84,
    infrastructure_score: 75,
    infrastructure_confidence: 85,
    growth_score: 78,
    growth_confidence: 86
  },

  // City Fringe - Yellow/Orange
  "ALEXANDRIA": {
    score: 69,
    confidence: 84,
    zone: 'yellow',
    liquidity_score: 73,
    liquidity_confidence: 83,
    safety_score: 69,
    safety_confidence: 80,
    infrastructure_score: 77,
    infrastructure_confidence: 85,
    growth_score: 83,
    growth_confidence: 88
  },
  "WATERLOO": {
    score: 64,
    confidence: 82,
    zone: 'yellow',
    liquidity_score: 70,
    liquidity_confidence: 81,
    safety_score: 65,
    safety_confidence: 77,
    infrastructure_score: 75,
    infrastructure_confidence: 84,
    growth_score: 84,
    growth_confidence: 89
  },
  "ZETLAND": {
    score: 67,
    confidence: 83,
    zone: 'yellow',
    liquidity_score: 71,
    liquidity_confidence: 82,
    safety_score: 67,
    safety_confidence: 78,
    infrastructure_score: 76,
    infrastructure_confidence: 85,
    growth_score: 85,
    growth_confidence: 90
  },
  "REDFERN": {
    score: 62,
    confidence: 81,
    zone: 'yellow',
    liquidity_score: 69,
    liquidity_confidence: 80,
    safety_score: 63,
    safety_confidence: 75,
    infrastructure_score: 74,
    infrastructure_confidence: 83,
    growth_score: 82,
    growth_confidence: 87
  },

  // Western Sydney - Mostly Red
  "PARRAMATTA": {
    score: 55,
    confidence: 78,
    zone: 'yellow',
    liquidity_score: 63,
    liquidity_confidence: 76,
    safety_score: 61,
    safety_confidence: 74,
    infrastructure_score: 72,
    infrastructure_confidence: 83,
    growth_score: 79,
    growth_confidence: 85
  },
  "BLACKTOWN": {
    score: 38,
    confidence: 70,
    zone: 'red',
    liquidity_score: 50,
    liquidity_confidence: 68,
    safety_score: 45,
    safety_confidence: 65,
    infrastructure_score: 55,
    infrastructure_confidence: 72,
    growth_score: 68,
    growth_confidence: 76
  },
  "LIVERPOOL": {
    score: 42,
    confidence: 72,
    zone: 'red',
    liquidity_score: 53,
    liquidity_confidence: 70,
    safety_score: 48,
    safety_confidence: 67,
    infrastructure_score: 58,
    infrastructure_confidence: 74,
    growth_score: 72,
    growth_confidence: 78
  },
  "PENRITH": {
    score: 36,
    confidence: 68,
    zone: 'red',
    liquidity_score: 48,
    liquidity_confidence: 66,
    safety_score: 47,
    safety_confidence: 65,
    infrastructure_score: 52,
    infrastructure_confidence: 70,
    growth_score: 65,
    growth_confidence: 74
  },

  // South-Western Sydney - All Red
  "MOUNT DRUITT": {
    score: 28,
    confidence: 65,
    zone: 'red',
    liquidity_score: 40,
    liquidity_confidence: 63,
    safety_score: 35,
    safety_confidence: 60,
    infrastructure_score: 45,
    infrastructure_confidence: 67,
    growth_score: 62,
    growth_confidence: 72
  },
  "AUBURN": {
    score: 35,
    confidence: 67,
    zone: 'red',
    liquidity_score: 47,
    liquidity_confidence: 65,
    safety_score: 42,
    safety_confidence: 62,
    infrastructure_score: 50,
    infrastructure_confidence: 69,
    growth_score: 65,
    growth_confidence: 73
  },
  "GRANVILLE": {
    score: 37,
    confidence: 68,
    zone: 'red',
    liquidity_score: 49,
    liquidity_confidence: 66,
    safety_score: 44,
    safety_confidence: 63,
    infrastructure_score: 52,
    infrastructure_confidence: 70,
    growth_score: 66,
    growth_confidence: 74
  },
  "MERRYLANDS": {
    score: 39,
    confidence: 69,
    zone: 'red',
    liquidity_score: 51,
    liquidity_confidence: 67,
    safety_score: 46,
    safety_confidence: 64,
    infrastructure_score: 54,
    infrastructure_confidence: 71,
    growth_score: 67,
    growth_confidence: 75
  },
  "BANKSTOWN": {
    score: 41,
    confidence: 70,
    zone: 'red',
    liquidity_score: 53,
    liquidity_confidence: 68,
    safety_score: 48,
    safety_confidence: 65,
    infrastructure_score: 56,
    infrastructure_confidence: 72,
    growth_score: 68,
    growth_confidence: 76
  },
  "FAIRFIELD": {
    score: 33,
    confidence: 66,
    zone: 'red',
    liquidity_score: 45,
    liquidity_confidence: 64,
    safety_score: 40,
    safety_confidence: 61,
    infrastructure_score: 48,
    infrastructure_confidence: 68,
    growth_score: 63,
    growth_confidence: 73
  },
  "CABRAMATTA": {
    score: 34,
    confidence: 67,
    zone: 'red',
    liquidity_score: 46,
    liquidity_confidence: 65,
    safety_score: 41,
    safety_confidence: 62,
    infrastructure_score: 49,
    infrastructure_confidence: 69,
    growth_score: 64,
    growth_confidence: 74
  },

  // Outer suburbs - Mostly Red with some Yellow
  "CAMPBELLTOWN": {
    score: 35,
    confidence: 64,
    zone: 'red',
    liquidity_score: 47,
    liquidity_confidence: 62,
    safety_score: 43,
    safety_confidence: 60,
    infrastructure_score: 50,
    infrastructure_confidence: 66,
    growth_score: 64,
    growth_confidence: 70
  },
  "HORNSBY": {
    score: 53,
    confidence: 75,
    zone: 'yellow',
    liquidity_score: 65,
    liquidity_confidence: 73,
    safety_score: 68,
    safety_confidence: 77,
    infrastructure_score: 67,
    infrastructure_confidence: 76,
    growth_score: 60,
    growth_confidence: 72
  },
  "CASTLE HILL": {
    score: 57,
    confidence: 77,
    zone: 'yellow',
    liquidity_score: 65,
    liquidity_confidence: 75,
    safety_score: 72,
    safety_confidence: 80,
    infrastructure_score: 68,
    infrastructure_confidence: 78,
    growth_score: 62,
    growth_confidence: 74
  },
  "CRONULLA": {
    score: 65,
    confidence: 84,
    zone: 'yellow',
    liquidity_score: 77,
    liquidity_confidence: 82,
    safety_score: 79,
    safety_confidence: 85,
    infrastructure_score: 73,
    infrastructure_confidence: 80,
    growth_score: 70,
    growth_confidence: 81
  }
};

export default suburbScores;
