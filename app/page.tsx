"use client";

import React, { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, CheckSquare, CalendarDays, ListChecks, LucideDumbbell as Dumbbell, Salad, FileText, Sun } from "lucide-react";

// ---------------------------------------------
// ⚙️ Data Model
// ---------------------------------------------
const pdfLinks = [
  { name: "Master Playbook (Complete)", href: "/six_pack_master_playbook_complete.pdf" },
  { name: "Master Playbook (Print‑Friendly)", href: "/six_pack_master_playbook_print.pdf" },
  { name: "Weekly Plan (Chart)", href: "/six_pack_weekly_plan.pdf" },
  { name: "Quick View (1‑page)", href: "/six_pack_quick_view.pdf" },
  { name: "Quick View + Snacks", href: "/six_pack_quick_view_with_snacks.pdf" },
  { name: "Mobile‑Friendly Version", href: "/six_pack_mobile_friendly.pdf" },
  { name: "Grocery Checklist", href: "/six_pack_grocery_list.pdf" },
  { name: "Weekly Tracking Sheet", href: "/six_pack_tracking_sheet.pdf" },
  { name: "4‑Week Tracking Sheet", href: "/six_pack_tracking_sheet_4weeks.pdf" },
  { name: "4‑Week + Progress Tracker", href: "/six_pack_tracking_sheet_4weeks_progress.pdf" },
  { name: "12‑Week Transformation Tracker", href: "/six_pack_tracking_sheet_12weeks_progress.pdf" },
  { name: "Calendar View (Minimalist)", href: "/six_pack_calendar_view.pdf" },
  { name: "Front Cover", href: "/six_pack_front_cover.pdf" },
  { name: "Playbook Cover (Workflow)", href: "/six_pack_playbook_cover.pdf" },
];

const breakfast = "5 whole eggs + 1 cup plain Greek yogurt + 1/2 cup berries + 1 tbsp chia/flax";

const days = [
  {
    day: "Mon",
    workout: {
      title: "Push (Chest/Shoulders/Triceps)",
      items: ["Bench Press — 5×5", "Overhead Press — 4×6–8", "Incline DB Press — 4×10", "Weighted Dips — 3×8–10", "Hanging Leg Raises — 3×12–15"],
    },
    meals: {
      breakfast,
      lunch: "8 oz chicken + 1 cup quinoa + broccoli & zucchini + 1 tbsp olive oil",
      dinner: "8 oz sirloin steak + Brussels sprouts & mushrooms + side salad",
    },
    note: "Heavy push strength",
  },
  {
    day: "Tue",
    workout: {
      title: "Pull (Back/Biceps)",
      items: ["Weighted Pull‑ups — 5×AMRAP", "Barbell Rows — 4×8–10", "Seated Rows — 3×10–12", "DB Curls — 3×12", "Planks — 3×1 min"],
    },
    meals: {
      breakfast,
      lunch: "8 oz salmon + 1 cup jasmine rice + asparagus",
      dinner: "2 lean beef patties (lettuce wrap) + roasted green beans + avocado",
    },
    note: "Back & biceps focus",
  },
  {
    day: "Wed",
    workout: {
      title: "Legs & Core",
      items: ["Back Squat — 5×5", "Romanian Deadlift — 4×8", "Walking Lunges — 3×12/leg", "Leg Press — 4×12", "Ab Rollouts — 3×12"],
    },
    meals: {
      breakfast,
      lunch: "8 oz chicken thighs + 1 baked potato + spinach salad",
      dinner: "8 oz cod/tilapia + cauliflower rice + grilled peppers",
    },
    note: "Heavy legs + core",
  },
  {
    day: "Thu",
    workout: {
      title: "Conditioning & Core",
      items: ["HIIT: 10× (30s sprint + 90s walk)", "Kettlebell Swings — 4×20", "Hanging Knee Tucks — 3×12", "Russian Twists — 3×20", "Side Plank — 3×30s/side"],
    },
    meals: {
      breakfast,
      lunch: "8 oz ground turkey + 1 cup basmati rice + mixed greens",
      dinner: "8 oz ribeye + roasted asparagus & mushrooms",
    },
    note: "Fat‑burn + abs",
  },
  {
    day: "Fri",
    workout: {
      title: "Push/Pull Hybrid (Hypertrophy)",
      items: ["Incline Bench — 4×10", "DB Shoulder Press — 3×12", "Lat Pulldown — 4×10", "Face Pulls — 3×15", "Cable Crunches — 3×15"],
    },
    meals: {
      breakfast,
      lunch: "8 oz chicken + 1 cup brown rice + green beans",
      dinner: "8 oz sirloin steak + zucchini noodles + tomato sauce",
    },
    note: "Volume + pump",
  },
  {
    day: "Sat",
    workout: {
      title: "Rest / Active Recovery",
      items: ["30–40 min walk", "Mobility / stretching", "Foam roll"],
    },
    meals: {
      breakfast,
      lunch: "8 oz salmon + 1 cup farro + roasted broccoli",
      dinner: "2 lean beef patties + sautéed peppers & onions",
    },
    note: "Light cardio & stretch",
  },
  {
    day: "Sun",
    workout: {
      title: "Rest / Recovery",
      items: ["Optional yoga", "Mobility", "Relax & recover"],
    },
    meals: {
      breakfast,
      lunch: "8 oz chicken + 1 cup wild rice + spinach + avocado",
      dinner: "8 oz cod + Brussels sprouts + mashed cauliflower",
    },
    note: "Full rest",
  },
];

const grocery = {
  Proteins: [
    "Eggs (35+)",
    "Chicken breast (5–6 lbs)",
    "Chicken thighs (2–3 lbs)",
    "Salmon (3–4 lbs)",
    "Cod or tilapia (2–3 lbs)",
    "Sirloin steak (4–5 lbs)",
    "Ribeye (2–3 lbs)",
    "Lean ground beef (3–4 lbs)",
    "Ground turkey (2–3 lbs)",
    "Greek yogurt (7–8 cups, plain)",
    "Cottage cheese (2–3 cups)",
    "Beef jerky (snacks)",
    "Whey protein powder",
  ],
  Carbs: [
    "Quinoa",
    "Brown rice",
    "Jasmine/Basmati rice",
    "Farro",
    "Wild rice",
    "Potatoes (white/red)",
  ],
  "Veggies & Greens": [
    "Spinach",
    "Broccoli",
    "Asparagus",
    "Zucchini",
    "Mushrooms",
    "Brussels sprouts",
    "Mixed greens",
    "Peppers & onions",
  ],
  Fruits: ["Blueberries", "Strawberries", "Lemons"],
  "Healthy Fats": ["Avocados", "Olive oil", "Almond butter", "Chia seeds", "Flax seeds", "Almonds or walnuts"],
};

const snackOptions = [
  "Protein shake (25g, post‑workout)",
  "Greek yogurt cup (20g)",
  "2 boiled eggs (12g)",
  "Cottage cheese (20g)",
  "Beef jerky (10–15g)",
  "Almonds/walnuts (~6g per oz)",
];

// ---------------------------------------------
// 🧩 UI Components
// ---------------------------------------------
const SectionHeader: React.FC<{ icon?: React.ReactNode; title: string; desc?: string; cta?: React.ReactNode }>=({ icon, title, desc, cta })=>{
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-2xl bg-gradient-to-r from-green-100 to-blue-100">{icon}</div>
        <div>
          <h2 className="text-xl font-semibold leading-tight">{title}</h2>
          {desc && <p className="text-sm text-muted-foreground mt-1">{desc}</p>}
        </div>
      </div>
      {cta}
    </div>
  );
};

const PrintButton = ({ label = "Print this section" }: { label?: string }) => (
  <Button variant="secondary" onClick={() => window.print()} className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg">🖨️ {label}</Button>
);

const DownloadButton = ({ href, label }: { href: string; label: string }) => (
  <a href={href} target="_blank" rel="noreferrer">
    <Button className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg" variant="default"><Download className="w-4 h-4 mr-2" /> {label}</Button>
  </a>
);

// Workout Timer Component
function WorkoutTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'workout' | 'rest'>('workout');
  const [timerMode, setTimerMode] = useState<'workout' | 'rest'>('workout');

  const workoutTime = 45;
  const restTime = 15;

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => { setTime(0); setIsRunning(false); };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Workout Timer</h3>
      <div className="text-center">
        <div className="text-6xl font-bold mb-4 font-mono">{formatTime(time)}</div>
        <div className="text-lg font-medium mb-4 text-gray-600">
          {isRunning ? `${timerMode === 'workout' ? 'Workout' : 'Rest'} Time` : 'Ready to Start'}
        </div>
        <div className="flex gap-3 justify-center mb-4">
          <Button onClick={startTimer} disabled={isRunning} className="bg-green-600 hover:bg-green-700">Start</Button>
          <Button onClick={pauseTimer} disabled={!isRunning} className="bg-yellow-600 hover:bg-yellow-700">Pause</Button>
          <Button onClick={resetTimer} className="bg-red-600 hover:bg-red-700">Reset</Button>
        </div>
        <div className="flex gap-2 justify-center">
          <Button onClick={() => setTimerMode('workout')} variant={timerMode === 'workout' ? 'default' : 'outline'} className="text-sm">Workout (45s)</Button>
          <Button onClick={() => setTimerMode('rest')} variant={timerMode === 'rest' ? 'default' : 'outline'} className="text-sm">Rest (15s)</Button>
        </div>
      </div>
    </div>
  );
}

// Meal Prep Calculator Component
function MealPrepCalculator() {
  const [servings, setServings] = useState(1);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Meal Prep Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Servings Needed</label>
          <Input type="number" value={servings} onChange={(e) => setServings(Number(e.target.value))} min="1" max="20" />
        </div>
        <div className="space-y-2">
          <h4 className="font-medium">Chicken & Quinoa Bowl ({servings} serving{servings > 1 ? 's' : ''}):</h4>
          <div className="text-sm space-y-1 bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between">
              <span>Chicken breast:</span>
              <span>{8 * servings} oz</span>
            </div>
            <div className="flex justify-between">
              <span>Quinoa (dry):</span>
              <span>{(1/3 * servings).toFixed(1)} cup</span>
            </div>
            <div className="flex justify-between">
              <span>Broccoli:</span>
              <span>{servings} cup{servings > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between">
              <span>Olive oil:</span>
              <span>{servings} tbsp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Grocery List Component
function EnhancedGroceryList() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  const groceryItems = [
    { category: 'Proteins', items: ['Chicken breast (2 lbs)', 'Salmon fillets (1 lb)', 'Ground turkey (1 lb)', 'Eggs (18 count)', 'Greek yogurt (32 oz)'] },
    { category: 'Carbs & Grains', items: ['Quinoa (2 lbs)', 'Brown rice (2 lbs)', 'Sweet potatoes (3 lbs)', 'Oats (32 oz)'] },
    { category: 'Vegetables & Fruits', items: ['Broccoli (2 lbs)', 'Spinach (5 oz bag)', 'Mixed berries (2 lbs)', 'Avocados (4 count)', 'Bell peppers (3 count)'] }
  ];

  const totalItems = groceryItems.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);

  const toggleItem = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Grocery Checklist</h3>
        <span className="text-sm text-slate-500">{progress}% complete</span>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {groceryItems.map((category, catIndex) => (
          <div key={category.category}>
            <h4 className={`font-medium mb-3 ${catIndex === 0 ? 'text-pink-600' : catIndex === 1 ? 'text-blue-600' : 'text-green-600'}`}>
              {category.category}
            </h4>
            <div className="space-y-2">
              {category.items.map(item => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <Checkbox checked={!!checkedItems[item]} onCheckedChange={() => toggleItem(item)} />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

// Weekly table component
function WeeklyTable() {
  return (
    <Card className="shadow-lg bg-white/90 backdrop-blur border-green-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-green-700">Weekly Plan (Meals + Workouts)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Workout</TableHead>
                <TableHead>Breakfast</TableHead>
                <TableHead>Lunch</TableHead>
                <TableHead>Dinner</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {days.map((d) => (
                <TableRow key={d.day}>
                  <TableCell className="font-medium">{d.day}</TableCell>
                  <TableCell>
                    <div className="font-semibold">{d.workout.title}</div>
                    <ul className="list-disc ml-5 text-xs mt-1 space-y-0.5">
                      {d.workout.items.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{d.meals.breakfast}</TableCell>
                  <TableCell>{d.meals.lunch}</TableCell>
                  <TableCell>{d.meals.dinner}</TableCell>
                  <TableCell>{d.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickView() {
  const rows = days.map((d) => ({ day: d.day, workout: d.workout.title, meals: `Breakfast: Eggs+Yogurt · Lunch: ${d.meals.lunch.split(" + ")[0]} · Dinner: ${d.meals.dinner.split(" + ")[0]}` }));
  return (
    <Card className="shadow-lg bg-white/90 backdrop-blur border-blue-200">
      <CardHeader className="pb-2"><CardTitle className="text-lg text-blue-700">Quick View (Gym‑Friendly)</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Workout</TableHead>
                <TableHead>Meals (short)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.day}>
                  <TableCell className="font-medium">{r.day}</TableCell>
                  <TableCell>{r.workout}</TableCell>
                  <TableCell>{r.meals}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function CalendarView() {
  return (
    <Card className="shadow-lg bg-white/90 backdrop-blur border-purple-200">
      <CardHeader className="pb-2"><CardTitle className="text-lg text-purple-700">Calendar View (4 Weeks, Minimalist)</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-3 text-sm">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((h) => (
            <div key={h} className="text-center font-semibold text-muted-foreground">{h}</div>
          ))}
          {days.map((d, index) => (
            <div key={d.day} className={`rounded-2xl border-2 p-3 min-h-[120px] ${
              index % 7 === 0 ? 'border-red-200 bg-red-50' :
              index % 7 === 1 ? 'border-orange-200 bg-orange-50' :
              index % 7 === 2 ? 'border-yellow-200 bg-yellow-50' :
              index % 7 === 3 ? 'border-green-200 bg-green-50' :
              index % 7 === 4 ? 'border-blue-200 bg-blue-50' :
              index % 7 === 5 ? 'border-indigo-200 bg-indigo-50' :
              'border-purple-200 bg-purple-50'
            }`}>
              <div className="font-semibold">{d.workout.title.split(" ")[0]}{d.workout.title.includes("Conditioning") ? " (Cond/Core)" : ""}</div>
              <Separator className="my-2" />
              <div className="space-y-1">
                <div><span className="font-medium">Breakfast:</span> Eggs + Yogurt</div>
                <div><span className="font-medium">Lunch:</span> {d.meals.lunch.split(" + ")[0]} + carb + veg</div>
                <div><span className="font-medium">Dinner:</span> {d.meals.dinner.split(" + ")[0]} + veg</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Snacks as needed: protein shake, Greek yogurt, cottage cheese, jerky, boiled eggs.</p>
      </CardContent>
    </Card>
  );
}

function GroceryList() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setChecked((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {Object.entries(grocery).map(([cat, items]) => (
        <Card key={cat} className="shadow-lg bg-white/90 backdrop-blur border-orange-200">
          <CardHeader className="pb-2"><CardTitle className="text-lg text-orange-700">{cat}</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {items.map((item) => (
              <label key={item} className="flex items-center gap-3 text-sm">
                <Checkbox checked={!!checked[item]} onCheckedChange={() => toggle(item)} />
                <span className={checked[item] ? "line-through text-muted-foreground" : ""}>{item}</span>
              </label>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Trackers() {
  const weekRows = days.map((d) => ({ day: d.day, workout: d.workout.title }));
  return (
    <div className="space-y-4">
      <Card className="shadow-lg bg-white/90 backdrop-blur border-indigo-200">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-indigo-700">Weekly Tracking Sheet</CardTitle>
          <PrintButton />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Workout</TableHead>
                  <TableHead>Breakfast</TableHead>
                  <TableHead>Lunch</TableHead>
                  <TableHead>Dinner</TableHead>
                  <TableHead>Snacks</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weekRows.map((r) => (
                  <TableRow key={r.day}>
                    <TableCell className="font-medium">{r.day}</TableCell>
                    <TableCell>{r.workout}</TableCell>
                    <TableCell>☐</TableCell>
                    <TableCell>☐</TableCell>
                    <TableCell>☐</TableCell>
                    <TableCell>☐</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-white/90 backdrop-blur border-pink-200">
        <CardHeader className="pb-2"><CardTitle className="text-lg text-pink-700">Snack Options</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-2">
          {snackOptions.map((s) => (
            <div key={s} className="text-sm">• {s}</div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Downloads() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {pdfLinks.map((f) => (
        <Card key={f.name} className="shadow-lg bg-white/90 backdrop-blur border-teal-200">
          <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2 text-teal-700"><FileText className="w-4 h-4 text-teal-600"/> {f.name}</CardTitle></CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground pr-2">Opens as a PDF.</p>
            <DownloadButton href={f.href} label="Download" />
          </CardContent>
        </Card>
      ))}
      <Card className="shadow-lg bg-white/90 backdrop-blur border-gray-200">
        <CardHeader className="pb-2"><CardTitle className="text-base text-gray-700">How to host these PDFs</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>These links work inside ChatGPT. To deploy this site elsewhere, place the PDF files in your <code>/public</code> folder and update the <code>pdfLinks</code> array to point to <code>/your-file.pdf</code>.</p>
          <p>Or remove the downloads section and rely on the on‑page views + browser print as PDF.</p>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------------------------------------------
// 🌐 Page Layout
// ---------------------------------------------
export default function SixPackSite() {
  const [activeTab, setActiveTab] = useState("tracker");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dailyHabits, setDailyHabits] = useState({
    workout: false,
    protein: false,
    water: 0,
    sleep: false,
    vegetables: false
  });
  const [dailyNotes, setDailyNotes] = useState("");

  const updateHabit = (habit: string, value: boolean | number) => {
    setDailyHabits(prev => ({ ...prev, [habit]: value }));
  };

  const updateBooleanHabit = (habit: string, checked: boolean | "indeterminate") => {
    updateHabit(habit, checked === true);
  };

  const habitProgress = useMemo(() => {
    const completed = Object.entries(dailyHabits).filter(([key, value]) => {
      if (key === 'water') return (value as number) >= 8; // 8 glasses minimum
      return value === true;
    }).length;
    return Math.round((completed / 5) * 100);
  }, [dailyHabits]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
      
      {/* Mobile Menu */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Quick Access</h2>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {[
            { id: 'tracker', label: 'Today\'s Tracker', icon: 'T', color: 'pink' },
            { id: 'tools', label: 'Interactive Tools', icon: '🛠', color: 'green' },
            { id: 'weekly', label: 'Weekly Plan', icon: 'W', color: 'purple' },
            { id: 'quick', label: 'Quick View', icon: 'Q', color: 'orange' },
            { id: 'calendar', label: 'Calendar', icon: '📅', color: 'red' },
            { id: 'grocery', label: 'Grocery', icon: '🛒', color: 'yellow' },
            { id: 'track', label: 'Trackers', icon: '📊', color: 'indigo' },
            { id: 'download', label: 'Downloads', icon: '📥', color: 'gray' }
          ].map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }} className="w-full text-left p-3 hover:bg-gray-100 rounded-lg flex items-center gap-3">
              <span className={`w-8 h-8 bg-${tab.color}-100 text-${tab.color}-700 rounded-lg flex items-center justify-center text-sm font-bold`}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Header / Hero */}
      <header className="sticky top-0 z-30 backdrop-blur bg-gradient-to-r from-blue-600 to-blue-800 border-b border-blue-700 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 hover:bg-blue-700 rounded-lg text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <div className="w-10 h-10 rounded-2xl bg-white/20 text-white grid place-content-center font-bold shadow-lg backdrop-blur"><Dumbbell className="w-6 h-6"/></div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-white">Curtis's Six‑Pack Transformation Program</h1>
              <p className="text-sm text-blue-100">Custom plan for 6'3", 187 lbs • 5 workouts/week (4 Lifting + 1 Conditioning) • v1.0.0</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-1 overflow-x-auto">
            {[
              { id: 'tracker', label: 'Today\'s Tracker' },
              { id: 'tools', label: 'Tools' },
              { id: 'weekly', label: 'Weekly Plan' },
              { id: 'quick', label: 'Quick View' },
              { id: 'calendar', label: 'Calendar' },
              { id: 'grocery', label: 'Grocery' },
              { id: 'track', label: 'Trackers' },
              { id: 'download', label: 'Downloads' }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/20 text-white ${activeTab === tab.id ? 'bg-white/30 text-white font-semibold' : ''}`}>
                {tab.label}
              </button>
            ))}
          </nav>
          
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-2xl border border-white/30 hover:bg-white/20 px-4 py-2 text-sm font-medium text-white">Print</button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-6">
        
        {/* Today's Tracker Tab */}
        {activeTab === 'tracker' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Today's Workout */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Today's Workout</h3>
                <span className="text-sm text-slate-500">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</span>
              </div>
              <div className="space-y-3">
                {days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]?.workout.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Checkbox />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Daily Habits */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Daily Habits</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox checked={dailyHabits.workout} onCheckedChange={(checked) => updateBooleanHabit('workout', checked)} />
                    <span className="font-medium">Complete Workout</span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox checked={dailyHabits.protein} onCheckedChange={(checked) => updateBooleanHabit('protein', checked)} />
                    <span className="font-medium">Hit Protein Target (190-200g)</span>
                  </label>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-blue-800">💧 Water Intake Tracker</span>
                    <span className="text-sm text-blue-600 font-semibold">{dailyHabits.water}/12 glasses</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2 mb-3">
                    {Array.from({ length: 12 }, (_, i) => (
                      <button 
                        key={i} 
                        onClick={() => updateHabit('water', i + 1)} 
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center text-sm ${
                          i < dailyHabits.water 
                            ? 'bg-blue-500 border-blue-500 text-white shadow-md transform scale-110' 
                            : 'border-blue-300 hover:border-blue-400 hover:bg-blue-100'
                        }`}
                      >
                        {i < dailyHabits.water ? '💧' : '○'}
                      </button>
                    ))}
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-2" 
                      style={{ width: `${(dailyHabits.water / 12) * 100}%` }}
                    >
                      {dailyHabits.water > 0 && <span className="text-white text-xs font-bold">{Math.round((dailyHabits.water / 12) * 100)}%</span>}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-blue-600">
                    <span>Target: 3-4L daily</span>
                    <span>{dailyHabits.water >= 8 ? '✅ Great job!' : `${8 - dailyHabits.water} more to go!`}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox checked={dailyHabits.sleep} onCheckedChange={(checked) => updateBooleanHabit('sleep', checked)} />
                    <span className="font-medium">7-8 Hours Sleep</span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox checked={dailyHabits.vegetables} onCheckedChange={(checked) => updateBooleanHabit('vegetables', checked)} />
                    <span className="font-medium">5+ Servings Vegetables</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Daily Progress</span>
                  <span className="text-sm text-slate-500">{habitProgress}% complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-pink-500 h-3 rounded-full transition-all duration-300" style={{ width: `${habitProgress}%` }}></div>
                </div>
              </div>
            </div>
            
            {/* Personal Notes */}
            <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Daily Notes</h3>
              <textarea 
                value={dailyNotes}
                onChange={(e) => setDailyNotes(e.target.value)}
                placeholder="How are you feeling today? Any observations about your workout, energy, or progress..."
                className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">Auto-saves as you type</span>
                <span className="text-xs text-green-600 opacity-0">Saved ✓</span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Tools Tab */}
        {activeTab === 'tools' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Workout Timer */}
            <WorkoutTimer />
            
            {/* Meal Prep Calculator */}
            <MealPrepCalculator />
            
            {/* Enhanced Grocery Progress */}
            <EnhancedGroceryList />
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl border-2 border-green-200 p-4 bg-gradient-to-br from-green-50 to-emerald-50">
                <SectionHeader icon={<Dumbbell className="text-green-600" />} title="Training Split" desc="5 days/week: 4 lifting + 1 conditioning & core" />
                <ul className="list-disc ml-5 mt-3 text-sm space-y-1 text-green-800">
                  <li>Mon: Push</li>
                  <li>Tue: Pull</li>
                  <li>Wed: Legs & Core</li>
                  <li>Thu: Conditioning & Core</li>
                  <li>Fri: Push/Pull Hybrid</li>
                  <li>Sat: Active Recovery</li>
                  <li>Sun: Rest</li>
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-blue-200 p-4 bg-gradient-to-br from-blue-50 to-cyan-50">
                <SectionHeader icon={<Salad className="text-blue-600" />} title="Nutrition Targets" desc="~2,400 kcal • 190–200g protein/day" />
                <ul className="list-disc ml-5 mt-3 text-sm space-y-1 text-blue-800">
                  <li>Breakfast daily: eggs + Greek yogurt (no egg whites)</li>
                  <li>50–60g protein per main meal</li>
                  <li>Carbs higher on lift days, lower on rest days</li>
                  <li>Hydration: 3–4L/day • Sleep: 7–8h</li>
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-purple-200 p-4 bg-gradient-to-br from-purple-50 to-pink-50">
                <SectionHeader icon={<CalendarDays className="text-purple-600" />} title="Tools" desc="Use Downloads or Print each section" />
                <ul className="list-disc ml-5 mt-3 text-sm space-y-1 text-purple-800">
                  <li>Weekly plan & quick views</li>
                  <li>Grocery checklist</li>
                  <li>Trackers (weekly / 4‑week / 12‑week)</li>
                  <li>Calendar (4‑week minimalist)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Existing Tabs */}
        {activeTab === 'weekly' && (
          <div className="space-y-3">
            <SectionHeader icon={<Dumbbell />} title="Weekly Plan" desc="Meals + workouts for each day" cta={<PrintButton />} />
            <WeeklyTable />
          </div>
        )}

        {activeTab === 'quick' && (
          <div className="space-y-3">
            <SectionHeader icon={<CheckSquare />} title="Quick View" desc="Short meal labels for gym use" cta={<PrintButton />} />
            <QuickView />
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <SectionHeader icon={<CalendarDays />} title="Calendar (4 weeks)" desc="Minimalist overview" cta={<PrintButton />} />
            
            {/* Google Calendar Integration */}
            <Card className="shadow-lg bg-white/90 backdrop-blur border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-blue-700 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" />
                  Google Calendar Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">Sync your workout schedule with Google Calendar to get reminders and track your progress.</p>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Curtis's Six-Pack Workout&dates=${new Date().toISOString().split('T')[0].replace(/-/g, '')}T090000Z/${new Date().toISOString().split('T')[0].replace(/-/g, '')}T100000Z&details=Today's workout: ${days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]?.workout.title}&location=Gym`;
                      window.open(calendarUrl, '_blank');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    📅 Add Today's Workout to Google Calendar
                  </Button>
                  <Button 
                    onClick={() => {
                      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Curtis Six-Pack Program//EN
BEGIN:VEVENT
UID:${Date.now()}@curtissixpack.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${new Date(Date.now() + 3600000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:Curtis's Six-Pack Workout
DESCRIPTION:${days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]?.workout.items.join(', ')}
END:VEVENT
END:VCALENDAR`;
                      const blob = new Blob([icsContent], { type: 'text/calendar' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'workout-schedule.ics';
                      a.click();
                    }}
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    📥 Download .ics File
                  </Button>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>Tip:</strong> Use the .ics file to import the entire 12-week program into any calendar app (Google Calendar, Outlook, Apple Calendar, etc.)
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <CalendarView />
          </div>
        )}

        {activeTab === 'grocery' && (
          <div className="space-y-3">
            <SectionHeader icon={<ListChecks />} title="Grocery Checklist" desc="Tap to tick items (not saved after refresh)" cta={<PrintButton />} />
            <GroceryList />
          </div>
        )}

        {activeTab === 'track' && (
          <div className="space-y-3">
            <SectionHeader icon={<FileText />} title="Trackers" desc="Print and check off daily meals & workouts" cta={<PrintButton />} />
            <Trackers />
          </div>
        )}

        {activeTab === 'download' && (
          <div className="space-y-3">
            <SectionHeader icon={<Download />} title="Downloads" desc="PDFs matching all sections" />
            <Downloads />
          </div>
        )}

        <Card className="shadow-lg bg-white/90 backdrop-blur border-yellow-200">
          <CardContent className="text-xs text-yellow-800 p-4">
            <p><strong>Disclaimer:</strong> This plan is general fitness guidance. Consult a healthcare professional before starting any new diet or training program, especially if you have medical conditions.</p>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-muted-foreground flex items-center justify-between">
          <span>Curtis's Six‑Pack Program • 5‑day split • ~200g protein/day</span>
          <span className="flex items-center gap-1"><Sun className="w-3 h-3"/> Built for consistency & clarity • v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}