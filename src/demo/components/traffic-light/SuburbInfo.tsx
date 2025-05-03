import React from 'react';
import { Badge } from '../ui/badge';

interface SuburbInfoProps {
  selectedSuburb: string;
}

const SuburbInfo: React.FC<SuburbInfoProps> = ({ selectedSuburb }) => {
  // Determine zone based on suburb
  const getZoneInfo = (suburb: string) => {
    const uppercaseSuburb = suburb.toUpperCase();

    if (['MOSMAN', 'DOUBLE BAY', 'VAUCLUSE', 'BELLEVUE HILL'].includes(uppercaseSuburb)) {
      return {
        zone: 'Green Zone',
        className: 'bg-green-100 text-green-800'
      };
    } else if (['MARRICKVILLE', 'NEWTOWN', 'SURRY HILLS'].includes(uppercaseSuburb)) {
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

  const zoneInfo = getZoneInfo(selectedSuburb);

  return (
    <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md border border-neutral-200">
      <div className="flex items-center space-x-2">
        <h4 className="text-sm font-medium">{selectedSuburb}</h4>
        <Badge className={zoneInfo.className}>
          {zoneInfo.zone}
        </Badge>
      </div>
      <div className="text-xs text-neutral-500 mt-1">
        Click on a suburb to view detailed analysis
      </div>
    </div>
  );
};

export default SuburbInfo;
