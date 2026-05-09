export const CAR_BRANDS = [
  "Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Toyota",
  "Honda", "Kia", "Volkswagen", "Skoda", "Nissan",
  "Renault", "Ford", "Chevrolet", "MG", "Jeep",
  "BMW", "Mercedes-Benz", "Audi", "Volvo", "Jaguar",
  "Land Rover", "Mini", "Porsche", "Lexus", "Mitsubishi",
  "Datsun", "Fiat", "Isuzu", "Lamborghini", "Ferrari",
  "Bentley", "Rolls-Royce", "Maserati", "Aston Martin", "Other",
] as const;

export const CAR_MODELS_BY_BRAND: Record<string, readonly string[]> = {
  "Maruti Suzuki": [
    "Alto", "Alto K10", "Wagon R", "Swift", "Baleno", "Celerio", "Ignis",
    "Dzire", "Ciaz", "Ertiga", "XL6", "Brezza", "S-Cross", "Grand Vitara",
    "Jimny", "Fronx", "Eeco", "S-Presso",
  ],
  "Hyundai": [
    "Grand i10 Nios", "i20", "i20 N Line", "Aura", "Verna", "Creta",
    "Venue", "Alcazar", "Tucson", "Kona Electric", "Ioniq 5", "Exter",
  ],
  "Tata": [
    "Tiago", "Tigor", "Altroz", "Punch", "Nexon", "Harrier", "Safari",
    "Curvv", "Nexon EV", "Tigor EV", "Punch EV",
  ],
  "Mahindra": [
    "XUV300", "XUV400", "XUV700", "XUV 3XO", "Bolero", "Bolero Neo",
    "Scorpio", "Scorpio Classic", "Scorpio N", "Thar", "Thar Roxx",
    "Marazzo", "Alturas G4", "BE 6", "XEV 9e",
  ],
  "Toyota": [
    "Glanza", "Urban Cruiser Taisor", "Urban Cruiser Hyryder", "Innova Crysta",
    "Innova Hycross", "Fortuner", "Hilux", "Camry", "Vellfire", "Land Cruiser",
    "Rumion",
  ],
  "Honda": [
    "Amaze", "City", "City Hybrid", "Elevate", "WR-V",
  ],
  "Kia": [
    "Sonet", "Seltos", "Carens", "Carnival", "EV6", "EV9", "Syros",
  ],
  "Volkswagen": [
    "Polo", "Virtus", "Taigun", "Tiguan", "T-Roc",
  ],
  "Skoda": [
    "Kushaq", "Slavia", "Kodiaq", "Octavia", "Superb",
  ],
  "Nissan": ["Magnite", "Kicks", "GT-R"],
  "Renault": ["Kwid", "Triber", "Kiger"],
  "Ford": ["EcoSport", "Endeavour", "Figo", "Aspire", "Freestyle"],
  "Chevrolet": ["Beat", "Cruze", "Captiva"],
  "MG": ["Astor", "Hector", "Hector Plus", "Gloster", "ZS EV", "Comet EV", "Windsor EV"],
  "Jeep": ["Compass", "Meridian", "Wrangler", "Grand Cherokee"],
  "BMW": ["2 Series", "3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "Z4", "i4", "iX"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "GLS", "G-Class", "Maybach S", "EQS"],
  "Audi": ["A3", "A4", "A6", "A8", "Q3", "Q5", "Q7", "Q8", "e-tron", "RS5"],
  "Volvo": ["XC40", "XC60", "XC90", "S60", "S90", "C40 Recharge"],
  "Jaguar": ["XE", "XF", "F-Pace", "F-Type", "I-Pace"],
  "Land Rover": ["Range Rover", "Range Rover Sport", "Range Rover Velar", "Range Rover Evoque", "Discovery", "Discovery Sport", "Defender"],
  "Mini": ["Cooper", "Countryman", "Clubman"],
  "Porsche": ["Macan", "Cayenne", "Panamera", "911", "Taycan"],
  "Lexus": ["ES", "LS", "NX", "RX", "LX", "LC"],
  "Mitsubishi": ["Pajero", "Outlander", "Lancer"],
  "Datsun": ["Go", "Go+", "Redi-Go"],
  "Fiat": ["Punto", "Linea", "Avventura"],
  "Isuzu": ["D-Max", "MU-X", "V-Cross"],
  "Other": ["Other Model"],
};

export function modelsForBrand(brand: string): readonly string[] {
  return CAR_MODELS_BY_BRAND[brand] || ["Other Model"];
}

const CURRENT_YEAR = new Date().getFullYear();
export const CAR_YEARS = Array.from(
  { length: CURRENT_YEAR - 1999 },
  (_, i) => CURRENT_YEAR - i,
);
