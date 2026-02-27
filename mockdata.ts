import { UserProfile, RiskStatus, Language, UserRole, NutritionTip } from "../backend.d";

// Mock ASHA worker profile
export const MOCK_ASHA_PROFILE: UserProfile = {
  id: "asha-001",
  name: "Geeta Devi",
  role: UserRole.ashaWorker,
  zone: "Wardha District, Maharashtra",
  riskStatus: RiskStatus.green,
  language: Language.marathi,
  beneficiaries: ["woman-001", "woman-002", "woman-003", "woman-004"],
  village: "Wardha",
  phone: "+91 9876543210",
};

// Mock pregnant women profiles
export const MOCK_WOMEN_PROFILES: UserProfile[] = [
  {
    id: "woman-001",
    name: "Sunita Devi",
    role: UserRole.pregnantWoman,
    riskStatus: RiskStatus.yellow,
    language: Language.hindi,
    beneficiaries: [],
    village: "Pulgaon",
    weeksPregnant: BigInt(28),
    phone: "+91 9876540001",
    assignedAshaId: "asha-001",
    lastCheckIn: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    dueDate: BigInt(Date.now() + 12 * 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
  {
    id: "woman-002",
    name: "Meena Kumari",
    role: UserRole.pregnantWoman,
    riskStatus: RiskStatus.red,
    language: Language.hindi,
    beneficiaries: [],
    village: "Arvi",
    weeksPregnant: BigInt(36),
    phone: "+91 9876540002",
    assignedAshaId: "asha-001",
    lastCheckIn: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    dueDate: BigInt(Date.now() + 4 * 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
  {
    id: "woman-003",
    name: "Radha Bai",
    role: UserRole.pregnantWoman,
    riskStatus: RiskStatus.green,
    language: Language.marathi,
    beneficiaries: [],
    village: "Deoli",
    weeksPregnant: BigInt(12),
    phone: "+91 9876540003",
    assignedAshaId: "asha-001",
    lastCheckIn: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    dueDate: BigInt(Date.now() + 28 * 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
  {
    id: "woman-004",
    name: "Kavita Sharma",
    role: UserRole.pregnantWoman,
    riskStatus: RiskStatus.green,
    language: Language.gujarati,
    beneficiaries: [],
    village: "Hinganghat",
    weeksPregnant: BigInt(22),
    phone: "+91 9876540004",
    assignedAshaId: "asha-001",
    lastCheckIn: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    dueDate: BigInt(Date.now() + 18 * 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
];

// Mock nutrition tips
export const MOCK_NUTRITION_TIPS: NutritionTip[] = [
  {
    audioLabel: "iron-tip",
    text: "🫘 आयरन के लिए पालक, चने, और मसूर की दाल खाएं। रोज खाना खाएं।\nEat spinach, chickpeas and lentils for iron. Eat daily.",
  },
  {
    audioLabel: "water-tip",
    text: "💧 दिन में कम से कम 8 गिलास पानी पिएं।\nDrink at least 8 glasses of water daily.",
  },
  {
    audioLabel: "rest-tip",
    text: "😴 रात को 8 घंटे की नींद लें। दोपहर में भी आराम करें।\nSleep 8 hours at night. Rest in the afternoon too.",
  },
  {
    audioLabel: "calcium-tip",
    text: "🥛 दूध, दही, और पनीर खाएं — हड्डियों के लिए।\nDrink milk, eat curd and paneer for strong bones.",
  },
  {
    audioLabel: "fruit-tip",
    text: "🍌 केला, सेब, और संतरा खाएं। ताजे फल खाएं।\nEat banana, apple and orange. Eat fresh fruits daily.",
  },
];

// Mock SOS alerts for demo
export const MOCK_SOS_ALERTS = [
  {
    id: BigInt(1),
    status: "active" as const,
    userId: "woman-002",
    note: "Emergency SOS triggered",
    timestamp: BigInt(Date.now() - 30 * 60 * 1000) * BigInt(1_000_000),
  },
];

// Helper to format timestamp
export function formatTime(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  const date = new Date(ms);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `${diffMins} मिनट पहले / ${diffMins} min ago`;
  } else if (diffHours < 24) {
    const h = Math.floor(diffHours);
    return `${h} घंटे पहले / ${h} hr ago`;
  } else {
    const d = Math.floor(diffHours / 24);
    return `${d} दिन पहले / ${d} day(s) ago`;
  }
}

export function getRiskLabel(risk: RiskStatus): string {
  switch (risk) {
    case RiskStatus.green: return "सुरक्षित / Safe";
    case RiskStatus.yellow: return "सावधान / Caution";
    case RiskStatus.red: return "खतरा / Danger";
  }
}

export function getRiskClass(risk: RiskStatus): string {
  switch (risk) {
    case RiskStatus.green: return "risk-green";
    case RiskStatus.yellow: return "risk-yellow";
    case RiskStatus.red: return "risk-red";
  }
}
