export type Instrument = {
  name: string
  description: string
  image: string
}

export type CountryInfo = {
  name: string
  description: string
  regions: string[]
  instruments: Instrument[]
  playlist: { title: string; artist: string; duration: string }[]
}

const DEFAULT_DRUM: Instrument = {
  name: "Traditional Drum",
  description: "A fundamental rhythm instrument found in local folk music.",
  image: "/instrument-drum.png",
}

// Curated data for a handful of countries; everything else falls back to a generated template.
export const COUNTRY_DATA: Record<string, CountryInfo> = {
  Ireland: {
    name: "Ireland",
    description:
      "Discover the unique traditional sounds and contemporary beats of Ireland, home to lively reels, jigs, and soulful ballads.",
    regions: ["Connacht", "Munster", "Leinster"],
    instruments: [
      {
        name: "Bodhrán",
        description: "A handheld frame drum that drives the pulse of Irish folk sessions.",
        image: "/instrument-drum.png",
      },
      DEFAULT_DRUM,
    ],
    playlist: [
      { title: "The Rocky Road to Dublin", artist: "The Dubliners", duration: "3:42" },
      { title: "Whiskey in the Jar", artist: "The Dubliners", duration: "4:05" },
      { title: "The Wild Rover", artist: "The Dubliners", duration: "3:18" },
    ],
  },
  Russia: {
    name: "Russia",
    description:
      "Discover the unique traditional sounds and contemporary beats of Russia, from soaring choral works to spirited folk dances.",
    regions: ["North", "South"],
    instruments: [
      {
        name: "Balalaika",
        description: "A triangular three-stringed instrument central to Russian folk music.",
        image: "/instrument-drum.png",
      },
      DEFAULT_DRUM,
    ],
    playlist: [
      { title: "Kalinka", artist: "Traditional", duration: "2:58" },
      { title: "Korobeiniki", artist: "Traditional", duration: "3:12" },
    ],
  },
  Brazil: {
    name: "Brazil",
    description:
      "Discover the unique traditional sounds and contemporary beats of Brazil, where samba, bossa nova, and forró fill the air.",
    regions: ["Bahia", "Rio", "Pernambuco"],
    instruments: [
      {
        name: "Berimbau",
        description: "A single-string percussion bow that powers the rhythm of capoeira.",
        image: "/instrument-drum.png",
      },
      DEFAULT_DRUM,
    ],
    playlist: [
      { title: "Mas Que Nada", artist: "Jorge Ben", duration: "3:04" },
      { title: "The Girl from Ipanema", artist: "João Gilberto", duration: "5:21" },
    ],
  },
  India: {
    name: "India",
    description:
      "Discover the unique traditional sounds and contemporary beats of India, rich with raga, classical strings, and devotional song.",
    regions: ["North", "South", "Bengal"],
    instruments: [
      {
        name: "Tabla",
        description: "A pair of hand drums that form the rhythmic backbone of Hindustani music.",
        image: "/instrument-drum.png",
      },
      DEFAULT_DRUM,
    ],
    playlist: [
      { title: "Raga Bhairavi", artist: "Ravi Shankar", duration: "8:14" },
      { title: "Vande Mataram", artist: "Traditional", duration: "4:47" },
    ],
  },
  "United States of America": {
    name: "United States",
    description:
      "Discover the unique traditional sounds and contemporary beats of the United States, from blues and jazz to bluegrass.",
    regions: ["South", "Midwest", "Northeast"],
    instruments: [
      {
        name: "Banjo",
        description: "A resonant string instrument at the heart of bluegrass and folk.",
        image: "/instrument-drum.png",
      },
      DEFAULT_DRUM,
    ],
    playlist: [
      { title: "Cross Road Blues", artist: "Robert Johnson", duration: "2:40" },
      { title: "Foggy Mountain Breakdown", artist: "Flatt & Scruggs", duration: "2:48" },
    ],
  },
}

export function getCountryInfo(name: string): CountryInfo {
  if (COUNTRY_DATA[name]) return COUNTRY_DATA[name]
  return {
    name,
    description: `Discover the unique traditional sounds and contemporary beats of ${name}.`,
    regions: ["North", "South"],
    instruments: [DEFAULT_DRUM],
    playlist: [{ title: "Curated Selection", artist: "Various Artists", duration: "3:30" }],
  }
}

export const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
