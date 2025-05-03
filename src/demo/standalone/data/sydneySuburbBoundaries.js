/**
 * Sydney Suburb Boundaries GeoJSON Data
 * 
 * This file contains the geographic boundaries for Sydney suburbs used in the Traffic Light System.
 * The data is in GeoJSON format and includes properties for suburb names and metrics.
 */

const sydneySuburbBoundaries = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "MOSMAN",
        "name": "MOSMAN",
        "metrics": {
          "liquidity": 87,
          "growth": 76,
          "infrastructure": 92,
          "safety": 95,
          "overall": 88
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.2466, -33.8269],
            [151.2566, -33.8269],
            [151.2566, -33.8169],
            [151.2466, -33.8169],
            [151.2466, -33.8269]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "DOUBLE BAY",
        "name": "DOUBLE BAY",
        "metrics": {
          "liquidity": 92,
          "growth": 81,
          "infrastructure": 88,
          "safety": 90,
          "overall": 89
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.2466, -33.8769],
            [151.2566, -33.8769],
            [151.2566, -33.8669],
            [151.2466, -33.8669],
            [151.2466, -33.8769]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "VAUCLUSE",
        "name": "VAUCLUSE",
        "metrics": {
          "liquidity": 85,
          "growth": 72,
          "infrastructure": 80,
          "safety": 94,
          "overall": 83
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.2766, -33.8569],
            [151.2866, -33.8569],
            [151.2866, -33.8469],
            [151.2766, -33.8469],
            [151.2766, -33.8569]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "BELLEVUE HILL",
        "name": "BELLEVUE HILL",
        "metrics": {
          "liquidity": 89,
          "growth": 78,
          "infrastructure": 85,
          "safety": 92,
          "overall": 86
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.2566, -33.8869],
            [151.2666, -33.8869],
            [151.2666, -33.8769],
            [151.2566, -33.8769],
            [151.2566, -33.8869]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "MARRICKVILLE",
        "name": "MARRICKVILLE",
        "metrics": {
          "liquidity": 78,
          "growth": 85,
          "infrastructure": 75,
          "safety": 70,
          "overall": 77
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.1566, -33.9169],
            [151.1666, -33.9169],
            [151.1666, -33.9069],
            [151.1566, -33.9069],
            [151.1566, -33.9169]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "NEWTOWN",
        "name": "NEWTOWN",
        "metrics": {
          "liquidity": 82,
          "growth": 80,
          "infrastructure": 78,
          "safety": 65,
          "overall": 76
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.1766, -33.8969],
            [151.1866, -33.8969],
            [151.1866, -33.8869],
            [151.1766, -33.8869],
            [151.1766, -33.8969]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "SURRY HILLS",
        "name": "SURRY HILLS",
        "metrics": {
          "liquidity": 86,
          "growth": 83,
          "infrastructure": 82,
          "safety": 68,
          "overall": 80
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.2066, -33.8869],
            [151.2166, -33.8869],
            [151.2166, -33.8769],
            [151.2066, -33.8769],
            [151.2066, -33.8869]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "BLACKTOWN",
        "name": "BLACKTOWN",
        "metrics": {
          "liquidity": 65,
          "growth": 72,
          "infrastructure": 60,
          "safety": 55,
          "overall": 63
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [150.9066, -33.7669],
            [150.9166, -33.7669],
            [150.9166, -33.7569],
            [150.9066, -33.7569],
            [150.9066, -33.7669]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "MOUNT DRUITT",
        "name": "MOUNT DRUITT",
        "metrics": {
          "liquidity": 58,
          "growth": 65,
          "infrastructure": 55,
          "safety": 45,
          "overall": 56
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [150.8266, -33.7569],
            [150.8366, -33.7569],
            [150.8366, -33.7469],
            [150.8266, -33.7469],
            [150.8266, -33.7569]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "LIVERPOOL",
        "name": "LIVERPOOL",
        "metrics": {
          "liquidity": 68,
          "growth": 75,
          "infrastructure": 65,
          "safety": 60,
          "overall": 67
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [150.9266, -33.9269],
            [150.9366, -33.9269],
            [150.9366, -33.9169],
            [150.9266, -33.9169],
            [150.9266, -33.9269]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "BONDI",
        "name": "BONDI",
        "metrics": {
          "liquidity": 90,
          "growth": 82,
          "infrastructure": 85,
          "safety": 88,
          "overall": 87
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.2766, -33.8969],
            [151.2866, -33.8969],
            [151.2866, -33.8869],
            [151.2766, -33.8869],
            [151.2766, -33.8969]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "MANLY",
        "name": "MANLY",
        "metrics": {
          "liquidity": 88,
          "growth": 80,
          "infrastructure": 86,
          "safety": 87,
          "overall": 85
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.2766, -33.7969],
            [151.2866, -33.7969],
            [151.2866, -33.7869],
            [151.2766, -33.7869],
            [151.2766, -33.7969]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "CHATSWOOD",
        "name": "CHATSWOOD",
        "metrics": {
          "liquidity": 85,
          "growth": 78,
          "infrastructure": 90,
          "safety": 85,
          "overall": 84
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.1766, -33.7969],
            [151.1866, -33.7969],
            [151.1866, -33.7869],
            [151.1766, -33.7869],
            [151.1766, -33.7969]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "PARRAMATTA",
        "name": "PARRAMATTA",
        "metrics": {
          "liquidity": 75,
          "growth": 80,
          "infrastructure": 78,
          "safety": 70,
          "overall": 76
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.0066, -33.8169],
            [151.0166, -33.8169],
            [151.0166, -33.8069],
            [151.0066, -33.8069],
            [151.0066, -33.8169]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "CRONULLA",
        "name": "CRONULLA",
        "metrics": {
          "liquidity": 82,
          "growth": 75,
          "infrastructure": 80,
          "safety": 85,
          "overall": 80
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.1566, -34.0569],
            [151.1666, -34.0569],
            [151.1666, -34.0469],
            [151.1566, -34.0469],
            [151.1566, -34.0569]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "PADDINGTON",
        "name": "PADDINGTON",
        "metrics": {
          "liquidity": 88,
          "growth": 79,
          "infrastructure": 84,
          "safety": 86,
          "overall": 84
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.2266, -33.8869],
            [151.2366, -33.8869],
            [151.2366, -33.8769],
            [151.2266, -33.8769],
            [151.2266, -33.8869]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "BALMAIN",
        "name": "BALMAIN",
        "metrics": {
          "liquidity": 84,
          "growth": 76,
          "infrastructure": 82,
          "safety": 88,
          "overall": 82
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.1766, -33.8569],
            [151.1866, -33.8569],
            [151.1866, -33.8469],
            [151.1766, -33.8469],
            [151.1766, -33.8569]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "NORTH SYDNEY",
        "name": "NORTH SYDNEY",
        "metrics": {
          "liquidity": 86,
          "growth": 78,
          "infrastructure": 90,
          "safety": 88,
          "overall": 85
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.2066, -33.8369],
            [151.2166, -33.8369],
            [151.2166, -33.8269],
            [151.2066, -33.8269],
            [151.2066, -33.8369]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "RANDWICK",
        "name": "RANDWICK",
        "metrics": {
          "liquidity": 83,
          "growth": 77,
          "infrastructure": 82,
          "safety": 84,
          "overall": 81
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.2366, -33.9169],
            [151.2466, -33.9169],
            [151.2466, -33.9069],
            [151.2366, -33.9069],
            [151.2366, -33.9169]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nsw_loca_2": "LEICHHARDT",
        "name": "LEICHHARDT",
        "metrics": {
          "liquidity": 80,
          "growth": 78,
          "infrastructure": 79,
          "safety": 78,
          "overall": 79
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [151.1566, -33.8769],
            [151.1666, -33.8769],
            [151.1666, -33.8669],
            [151.1566, -33.8669],
            [151.1566, -33.8769]
          ]
        ]
      }
    }
  ]
};

export default sydneySuburbBoundaries;
