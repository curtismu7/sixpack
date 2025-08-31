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
  { name: "Master Playbook (Complete)", href: "sandbox:/mnt/data/six_pack_master_playbook_complete.pdf" },
  { name: "Master Playbook (Print‑Friendly)", href: "sandbox:/mnt/data/six_pack_master_playbook_print.pdf" },
  { name: "Weekly Plan (Chart)", href: "sandbox:/mnt/data/six_pack_weekly_plan.pdf" },
  { name: "Quick View (1‑page)", href: "sandbox:/mnt/data/six_pack_quick_view.pdf" },
  { name: "Quick View + Snacks", href: "sandbox:/mnt/data/six_pack_quick_view_with_snacks.pdf" },
  { name: "Mobile‑Friendly Version", href: "sandbox:/mnt/data/six_pack_mobile_friendly.pdf" },
  { name: "Grocery Checklist", href: "sandbox:/mnt/data/six_pack_grocery_list.pdf" },
  { name: "Weekly Tracking Sheet", href: "sandbox:/mnt/data/six_pack_tracking_sheet.pdf" },
  { name: "4‑Week Tracking Sheet", href: "sandbox:/mnt/data/six_pack_tracking_sheet_4weeks.pdf" },
  { name: "4‑Week + Progress Tracker", href: "sandbox:/mnt/data/six_pack_tracking_sheet_4weeks_progress.pdf" },
  { name: "12‑Week Transformation Tracker", href: "sandbox:/mnt/data/six_pack_tracking_sheet_12weeks_progress.pdf" },
  { name: "Calendar View (Minimalist)", href: "sandbox:/mnt/data/six_pack_calendar_view.pdf" },
  { name: "Front Cover", href: "sandbox:/mnt/data/six_pack_front_cover.pdf" },
  { name: "Playbook Cover (Workflow)", href: "sandbox:/mnt/data/six_pack_playbook_cover.pdf" },
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
        <div className="p-2 rounded-2xl bg-muted text-foreground">{icon}</div>
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
  <Button variant="secondary" onClick={() => window.print()} className="rounded-2xl">🖨️ {label}</Button>
);

const DownloadButton = ({ href, label }: { href: string; label: string }) => (
  <a href={href} target="_blank" rel="noreferrer">
    <Button className="rounded-2xl" variant="default"><Download className="w-4 h-4 mr-2" /> {label}</Button>
  </a>
);

// Weekly table component
function WeeklyTable() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weekly Plan (Meals + Workouts)</CardTitle>
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
    <Card className="shadow-sm">
      <CardHeader className="pb-2"><CardTitle className="text-lg">Quick View (Gym‑Friendly)</CardTitle></CardHeader>
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
    <Card className="shadow-sm">
      <CardHeader className="pb-2"><CardTitle className="text-lg">Calendar View (4 Weeks, Minimalist)</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-3 text-sm">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((h) => (
            <div key={h} className="text-center font-semibold text-muted-foreground">{h}</div>
          ))}
          {days.map((d) => (
            <div key={d.day} className="rounded-2xl border p-3 min-h-[120px]">
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
        <Card key={cat} className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-lg">{cat}</CardTitle></CardHeader>
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
      <Card className="shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Weekly Tracking Sheet</CardTitle>
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

      <Card className="shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-lg">Snack Options</CardTitle></CardHeader>
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
        <Card key={f.name} className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><FileText className="w-4 h-4"/> {f.name}</CardTitle></CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground pr-2">Opens as a PDF.</p>
            <DownloadButton href={f.href} label="Download" />
          </CardContent>
        </Card>
      ))}
      <Card className="shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-base">How to host these PDFs</CardTitle></CardHeader>
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      {/* Header / Hero */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl p-2 bg-primary/10 text-primary"><Dumbbell className="w-5 h-5"/></div>
            <div>
              <h1 className="text-lg font-semibold leading-none">Six‑Pack Transformation Program</h1>
              <p className="text-xs text-muted-foreground">Custom plan for 6’3”, 187 lbs • 5 workouts/week (4 Lifting + 1 Conditioning)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DownloadButton href={pdfLinks[0].href} label="Download Master PDF" />
            <Button variant="outline" className="rounded-2xl" onClick={() => window.print()}>🖨️ Print</Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border p-4">
              <SectionHeader icon={<Dumbbell />} title="Training Split" desc="5 days/week: 4 lifting + 1 conditioning & core" />
              <ul className="list-disc ml-5 mt-3 text-sm space-y-1">
                <li>Mon: Push</li>
                <li>Tue: Pull</li>
                <li>Wed: Legs & Core</li>
                <li>Thu: Conditioning & Core</li>
                <li>Fri: Push/Pull Hybrid</li>
                <li>Sat: Active Recovery</li>
                <li>Sun: Rest</li>
              </ul>
            </div>
            <div className="rounded-2xl border p-4">
              <SectionHeader icon={<Salad />} title="Nutrition Targets" desc="~2,400 kcal • 190–200g protein/day" />
              <ul className="list-disc ml-5 mt-3 text-sm space-y-1">
                <li>Breakfast daily: eggs + Greek yogurt (no egg whites)</li>
                <li>50–60g protein per main meal</li>
                <li>Carbs higher on lift days, lower on rest days</li>
                <li>Hydration: 3–4L/day • Sleep: 7–8h</li>
              </ul>
            </div>
            <div className="rounded-2xl border p-4">
              <SectionHeader icon={<CalendarDays />} title="Tools" desc="Use Downloads or Print each section" />
              <ul className="list-disc ml-5 mt-3 text-sm space-y-1">
                <li>Weekly plan & quick views</li>
                <li>Grocery checklist</li>
                <li>Trackers (weekly / 4‑week / 12‑week)</li>
                <li>Calendar (4‑week minimalist)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2 bg-muted p-1 rounded-2xl">
            <TabsTrigger value="weekly">Weekly Plan</TabsTrigger>
            <TabsTrigger value="quick">Quick View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="grocery">Grocery</TabsTrigger>
            <TabsTrigger value="track">Trackers</TabsTrigger>
            <TabsTrigger value="download">Downloads</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-3">
            <SectionHeader icon={<Dumbbell />} title="Weekly Plan" desc="Meals + workouts for each day" cta={<PrintButton />} />
            <WeeklyTable />
          </TabsContent>

          <TabsContent value="quick" className="space-y-3">
            <SectionHeader icon={<CheckSquare />} title="Quick View" desc="Short meal labels for gym use" cta={<PrintButton />} />
            <QuickView />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-3">
            <SectionHeader icon={<CalendarDays />} title="Calendar (4 weeks)" desc="Minimalist overview" cta={<PrintButton />} />
            <CalendarView />
          </TabsContent>

          <TabsContent value="grocery" className="space-y-3">
            <SectionHeader icon={<ListChecks />} title="Grocery Checklist" desc="Tap to tick items (not saved after refresh)" cta={<PrintButton />} />
            <GroceryList />
          </TabsContent>

          <TabsContent value="track" className="space-y-3">
            <SectionHeader icon={<FileText />} title="Trackers" desc="Print and check off daily meals & workouts" cta={<PrintButton />} />
            <Trackers />
          </TabsContent>

          <TabsContent value="download" className="space-y-3">
            <SectionHeader icon={<Download />} title="Downloads" desc="PDFs matching all sections" />
            <Downloads />
          </TabsContent>
        </Tabs>

        <Card className="shadow-sm">
          <CardContent className="text-xs text-muted-foreground p-4">
            <p><strong>Disclaimer:</strong> This plan is general fitness guidance. Consult a healthcare professional before starting any new diet or training program, especially if you have medical conditions.</p>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-muted-foreground flex items-center justify-between">
          <span>Six‑Pack Program • 5‑day split • ~200g protein/day</span>
          <span className="flex items-center gap-1"><Sun className="w-3 h-3"/> Built for consistency & clarity</span>
        </div>
      </footer>
    </div>
  );
}

// 📌 Deployment note:
// - Drop this file into a React app (e.g., Next.js or Vite) and ensure Tailwind is configured.
// - shadcn/ui components are referenced via @/components/ui/* — if you don’t have them, either add shadcn or replace with minimal components.
// - For production, move the provided PDFs into /public and update `pdfLinks` paths accordingly.
