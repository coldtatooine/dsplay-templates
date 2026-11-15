var dsplay_config = {
    locale: 'pt_br',
    orientation: window.innerHeight < window.innerWidth ? 'landscape' : 'portrait',
    // Android SDK version
    osVersion: 19,
    // DSPLAY App version code
    appVersion: 99,
};

var dsplay_media = {
    // the pages of rain cards share this time
    duration: 30000,

    // what the DSPLAY player gateway answers for an ENVIRONMENT_MONITOR media ("environment/1");
    // the player puts it here as `result`, and refetches it when it expires
    result: {
        "schema": "environment/1",
        "generatedAt": "2026-11-14T19:00:00.000Z",
        "units": {
            "rain": "mm",
            "temperature": "C",
            "wind": "km/h",
            "level": "cm",
            "pressure": "hPa"
        },
        "sources": {
            "rainfall": {
                "id": "br-cemaden",
                "name": "CEMADEN",
                "country": "BR",
                "attribution": {
                    "text": "CEMADEN",
                    "url": "https://example.org",
                    "license": null
                }
            },
            "alerts": {
                "id": "br-inmet",
                "name": "INMET",
                "country": "BR",
                "attribution": {
                    "text": "INMET",
                    "url": "https://example.org",
                    "license": null
                }
            },
            "rivers": {
                "id": "br-pe-apac",
                "name": "APAC",
                "country": "BR",
                "attribution": {
                    "text": "APAC",
                    "url": "https://example.org",
                    "license": null
                }
            },
            "conditions": {
                "id": "br-pe-apac",
                "name": "APAC",
                "country": "BR",
                "attribution": {
                    "text": "APAC",
                    "url": "https://example.org",
                    "license": null
                }
            },
            "climate": {
                "id": "br-pe-apac",
                "name": "APAC",
                "country": "BR",
                "attribution": {
                    "text": "APAC",
                    "url": "https://example.org",
                    "license": null
                }
            }
        },
        "unavailable": [],
        "summary": {
            "rainfall": {
                "stationsReporting": 11,
                "stationsRaining": 10,
                "maxLast1hMm": 52.4
            },
            "alerts": {
                "count": 1,
                "maxSeverity": "moderate"
            },
            "rivers": {
                "stations": 3,
                "byStatus": {
                    "normal": 1,
                    "attention": 1,
                    "alert": 1,
                    "flood": 0
                }
            },
            "conditions": {
                "stations": 3
            },
            "climate": {
                "regions": 2
            }
        },
        "rainfall": [
            {
                "id": "2609",
                "name": "Camaragibe",
                "operator": "CEMADEN",
                "city": "CAMARAGIBE",
                "state": "PE",
                "observedAt": "2026-11-14T18:50:00.000Z",
                "last1hMm": 52.4,
                "last3hMm": 60.1,
                "last6hMm": 60.1,
                "last24hMm": 71.0,
                "last72hMm": 80.5,
                "intensity": "extreme"
            },
            {
                "id": "2601",
                "name": "Ibura",
                "operator": "CEMADEN",
                "city": "RECIFE",
                "state": "PE",
                "observedAt": "2026-11-14T18:50:00.000Z",
                "last1hMm": 31.2,
                "last3hMm": 44.0,
                "last6hMm": 44.0,
                "last24hMm": 61.5,
                "last72hMm": 70.1,
                "intensity": "very_heavy"
            },
            {
                "id": "2602",
                "name": "Dois Unidos",
                "operator": "CEMADEN",
                "city": "RECIFE",
                "state": "PE",
                "observedAt": "2026-11-14T18:50:00.000Z",
                "last1hMm": 14.6,
                "last3hMm": 22.4,
                "last6hMm": 22.4,
                "last24hMm": 40.2,
                "last72hMm": 52.0,
                "intensity": "heavy"
            },
            {
                "id": "2603",
                "name": "Alto José do Pinho",
                "operator": "CEMADEN",
                "city": "RECIFE",
                "state": "PE",
                "observedAt": "2026-11-14T18:40:00.000Z",
                "last1hMm": 8.0,
                "last3hMm": 15.1,
                "last6hMm": 15.1,
                "last24hMm": 33.0,
                "last72hMm": 41.2,
                "intensity": "heavy"
            },
            {
                "id": "2604",
                "name": "Passarinho",
                "operator": "CEMADEN",
                "city": "OLINDA",
                "state": "PE",
                "observedAt": "2026-11-14T18:50:00.000Z",
                "last1hMm": 4.4,
                "last3hMm": 9.8,
                "last6hMm": 9.8,
                "last24hMm": 20.0,
                "last72hMm": 26.3,
                "intensity": "moderate"
            },
            {
                "id": "2605",
                "name": "Vila Popular",
                "operator": "CEMADEN",
                "city": "PAULISTA",
                "state": "PE",
                "observedAt": "2026-11-14T18:50:00.000Z",
                "last1hMm": 3.0,
                "last3hMm": 5.2,
                "last6hMm": 5.2,
                "last24hMm": 12.6,
                "last72hMm": 15.0,
                "intensity": "moderate"
            },
            {
                "id": "2606",
                "name": "Engenho Velho",
                "operator": "CEMADEN",
                "city": "JABOATÃO DOS GUARARAPES",
                "state": "PE",
                "observedAt": "2026-11-14T18:30:00.000Z",
                "last1hMm": 1.6,
                "last3hMm": 2.4,
                "last6hMm": 2.4,
                "last24hMm": 6.8,
                "last72hMm": 9.9,
                "intensity": "light"
            },
            {
                "id": "2607",
                "name": "Muribeca",
                "operator": "CEMADEN",
                "city": "JABOATÃO DOS GUARARAPES",
                "state": "PE",
                "observedAt": "2026-11-14T18:50:00.000Z",
                "last1hMm": 0.8,
                "last3hMm": 1.2,
                "last6hMm": 1.2,
                "last24hMm": 3.1,
                "last72hMm": 4.0,
                "intensity": "light"
            },
            {
                "id": "2610",
                "name": "Igarassu",
                "operator": "CEMADEN",
                "city": "IGARASSU",
                "state": "PE",
                "observedAt": "2026-11-14T18:50:00.000Z",
                "last1hMm": 0.4,
                "last3hMm": 0.8,
                "last6hMm": 0.8,
                "last24hMm": 2.0,
                "last72hMm": 3.2,
                "intensity": "light"
            },
            {
                "id": "2608",
                "name": "Cabo de Santo Agostinho",
                "operator": "CEMADEN",
                "city": "CABO DE SANTO AGOSTINHO",
                "state": "PE",
                "observedAt": "2026-11-14T18:50:00.000Z",
                "last1hMm": 0.2,
                "last3hMm": 0.2,
                "last6hMm": 0.2,
                "last24hMm": 1.0,
                "last72hMm": 2.2,
                "intensity": "light"
            },
            {
                "id": "2611",
                "name": "Moreno",
                "operator": "CEMADEN",
                "city": "MORENO",
                "state": "PE",
                "observedAt": "2026-11-14T18:50:00.000Z",
                "last1hMm": 0.0,
                "last3hMm": 0.0,
                "last6hMm": 0.0,
                "last24hMm": 0.0,
                "last72hMm": 0.0,
                "intensity": "none"
            }
        ],
        "alerts": [
            {
                "id": "inmet-1",
                "event": "Chuvas Intensas",
                "language": "pt",
                "severity": "moderate",
                "color": "#ffcc00",
                "description": null,
                "instruction": null,
                "areas": [
                    "Recife",
                    "Olinda",
                    "Paulista"
                ],
                "areaCount": 12,
                "onset": "2026-11-14T12:00:00.000Z",
                "expires": "2026-11-15T12:00:00.000Z",
                "sender": "INMET"
            }
        ],
        "rivers": [
            {
                "id": "PE001H",
                "name": "Engenho Velho",
                "operator": "CEMADEN",
                "river": "Capibaribe",
                "observedAt": "2026-11-14T18:50:00.000Z",
                "levelCm": 248.0,
                "thresholds": {
                    "attention": 200,
                    "alert": 230,
                    "flood": 330
                },
                "status": "alert",
                "trend": "rising"
            },
            {
                "id": "PE002H",
                "name": "Várzea",
                "operator": "CEMADEN",
                "river": "Capibaribe",
                "observedAt": "2026-11-14T18:50:00.000Z",
                "levelCm": 205.5,
                "thresholds": {
                    "attention": 200,
                    "alert": 230,
                    "flood": 330
                },
                "status": "attention",
                "trend": "steady"
            },
            {
                "id": "PE003H",
                "name": "Palmares",
                "operator": "CEMADEN",
                "river": "Una",
                "observedAt": "2026-11-14T18:40:00.000Z",
                "levelCm": 90.0,
                "thresholds": {
                    "attention": 250,
                    "alert": 300,
                    "flood": 400
                },
                "status": "normal",
                "trend": "falling"
            }
        ],
        "conditions": [
            {
                "id": "A301M",
                "name": "Recife",
                "operator": "APAC",
                "city": "Recife",
                "observedAt": "2026-11-14T18:10:00.000Z",
                "temperatureC": 31.4,
                "humidityPct": 62,
                "windKmh": 11.5
            },
            {
                "id": "B410U",
                "name": "Petrolina",
                "operator": "INMET",
                "city": "Petrolina",
                "observedAt": "2026-11-14T18:00:00.000Z",
                "temperatureC": 36.8,
                "humidityPct": 30,
                "windKmh": 0
            },
            {
                "id": "C500M",
                "name": "Garanhuns",
                "operator": "APAC",
                "city": "Garanhuns",
                "observedAt": "2026-11-14T18:10:00.000Z",
                "temperatureC": 24.0,
                "humidityPct": null,
                "windKmh": 7.3
            }
        ],
        "climate": [
            {
                "id": "metropolitana-de-recife",
                "name": "Metropolitana de Recife",
                "stations": 4,
                "observedAt": "2026-11-14T18:10:00.000Z",
                "temperatureNowC": 30.9,
                "humidityPct": 66,
                "temperatureMinC": 23.4,
                "temperatureMaxC": 33.1,
                "rainMm": 12.4,
                "etoMm": 3.2,
                "solarMj": 14.1,
                "windowStart": "2026-11-14T03:00:00.000Z",
                "windowEnd": "2026-11-14T18:10:00.000Z"
            },
            {
                "id": "sertao-pernambucano",
                "name": "Sertão Pernambucano",
                "stations": 3,
                "observedAt": "2026-11-14T18:10:00.000Z",
                "temperatureNowC": 35.2,
                "humidityPct": 28,
                "temperatureMinC": 22.0,
                "temperatureMaxC": 38.4,
                "rainMm": 0.0,
                "etoMm": 5.8,
                "solarMj": 20.4,
                "windowStart": "2026-11-14T03:00:00.000Z",
                "windowEnd": "2026-11-14T18:10:00.000Z"
            }
        ]
    },
};

var dsplay_template = {
    // rain cards per page
    items_per_page: 8,
};
