import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";

// ---- Mock data (replace with API data, e.g. GET /api/problems/public) ----
const PROBLEMS = [
  {
    id: 1,
    tags: [
      { label: "RANCHI", color: "bg-slate-100 text-slate-600" },
      { label: "AGRICULTURE", color: "bg-emerald-50 text-emerald-700" },
    ],
    title: "Cold Storage Deficiency for Lac & Tomato Harvest in Bero",
    location: "Bero Block",
    impact: "340 Farmer Families",
    note: "Eligible Grants: Birsa Agricultural Univ R&D Matching Fund",
    status: "OPEN FOR SOLUTION",
    statusColor: "bg-amber-50 text-amber-700",
  },
  {
    id: 2,
    tags: [
      { label: "DHANBAD", color: "bg-slate-100 text-slate-600" },
      { label: "ENVIRONMENT", color: "bg-emerald-50 text-emerald-700" },
    ],
    title: "Coal Dust Suppression in Jharia Outskirts Road Belts",
    location: "Jharia Block",
    impact: "1,200+ Residents",
    note: "Collaborating: Central Institute of Mining & Fuel Research",
    status: "ACADEMIC MATCH",
    statusColor: "bg-blue-50 text-blue-700",
  },
  {
    id: 3,
    tags: [
      { label: "LOHARDAGA", color: "bg-slate-100 text-slate-600" },
      { label: "HEALTHCARE", color: "bg-emerald-50 text-emerald-700" },
    ],
    title: "Maternal Telemedicine Connectivity in Forested Pockets",
    location: "Kisko Block",
    impact: "8 Hamlet Clinics",
    note: "Requested: Low-bandwidth satellite or TVWS transmission trials",
    status: "OPEN FOR SOLUTION",
    statusColor: "bg-amber-50 text-amber-700",
  },
];

const DISTRICTS = ["All", "Ranchi", "Dhanbad", "Lohardaga"];
const CATEGORIES = ["All", "Agriculture",'Water & Irrig.','Healthcare','Education','Infrastructure', "Environment", 'Sanitation', "Healthcare",'Rural Dev.'];
const STATUSES = ["All", "Needs R&D", "Open for Solution", "Academic Match"];

function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm text-slate-600 bg-white border border-slate-200 rounded-md px-3 py-2 hover:border-slate-300"
      >
        <span className="text-slate-400">{label}:</span>
        <span className="font-medium text-slate-800">{value}</span>
        <ChevronDown size={14} className="text-slate-400" />
      </button>

      {open && (
        <div className="absolute z-20 mt-1 min-w-[10rem] bg-white border border-slate-200 rounded-md shadow-lg py-1">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50 ${
                value === opt ? "text-emerald-700 font-medium" : "text-slate-600"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProblemCard({ p }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm px-5 py-4 flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          {p.tags.map((tag) => (
            <span
              key={tag.label}
              className={`text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded ${tag.color}`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <h3 className="text-base font-semibold text-slate-900 leading-snug">
          {p.title}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          <span className="text-slate-500">Location: </span>
          <span className="text-slate-700 font-medium">{p.location}</span>
          <span className="mx-1">•</span>
          <span className="text-slate-500">Reported Impact: </span>
          <span className="text-emerald-700 font-semibold">{p.impact}</span>
        </p>

        {p.note && (
          <p className="text-sm text-slate-500 mt-2">{p.note}</p>
        )}
      </div>

      <span
        className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 ${p.statusColor}`}
      >
        {p.status}
      </span>
    </div>
  );
}

const ExploreProblem = () => {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("Needs R&D");

  const filtered = useMemo(() => {
    return PROBLEMS.filter((p) => {
      const matchesQuery =
        !query.trim() ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase());
      const matchesDistrict =
        district === "All" ||
        p.tags.some((t) => t.label.toLowerCase() === district.toLowerCase());
      const matchesCategory =
        category === "All" ||
        p.tags.some((t) => t.label.toLowerCase() === category.toLowerCase());
      return matchesQuery && matchesDistrict && matchesCategory;
    });
  }, [query, district, category]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-lg font-bold text-slate-900">
            Public Problem Explorer
          </h1>
          <p className="text-sm text-emerald-700">
            Open for R&D Researchers, Startups, and CSR Partners (Citizen PII is masked)
          </p>
        </div>

        {/* Search + filters */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="flex items-center flex-1 min-w-[220px] bg-white border border-slate-200 rounded-md px-3 py-2">
            <Search size={16} className="text-slate-400 mr-2 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by problem keyword, tehsil, or district..."
              className="w-full text-sm text-slate-700 placeholder:text-slate-400 outline-none"
            />
          </div>

          <Dropdown label="District" value={district} options={DISTRICTS} onChange={setDistrict} />
          <Dropdown label="Category" value={category} options={CATEGORIES} onChange={setCategory} />
          <Dropdown label="Status" value={status} options={STATUSES} onChange={setStatus} />

          <span className="text-sm text-emerald-700 font-medium ml-auto whitespace-nowrap">
            {filtered.length} Available
          </span>
        </div>

        {/* Problem list */}
        <div className="flex flex-col gap-4 mb-6">
          {filtered.map((p) => (
            <ProblemCard key={p.id} p={p} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-slate-400 py-12 text-sm">
              No matching problems found.
            </div>
          )}
        </div>

        {/* CTA footer */}
        <button
          type="button"
          className="w-full bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold py-3 rounded-md transition-colors"
        >
          Propose Technical Solution or Industry CSR Adoption →
        </button>
      </div>
    </div>
  );
};

export default ExploreProblem;