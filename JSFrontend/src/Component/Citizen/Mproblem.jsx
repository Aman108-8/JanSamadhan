import React, { useEffect, useState } from "react";
import { getProblemsByUser } from "./config/PublicApi";

const TABS = ["All", "Under Review", "In Progress", "Completed"];

// Maps your backend's `status` string to the UI's grouping/label/colors.
// Adjust the left-hand keys to match whatever values Problem.status actually holds.
function getStatusMeta(status) {
  switch (status) {
    case "SUBMITTED":
    case "UNDER_REVIEW":
      return {
        statusGroup: "Under Review",
        statusLabel: "UNDER REVIEW",
        statusColor: "bg-amber-50 text-amber-700",
        accent: "border-l-amber-500",
      };
    case "IN_PROGRESS":
      return {
        statusGroup: "In Progress",
        statusLabel: "IN PROGRESS",
        statusColor: "bg-blue-600 text-white",
        accent: "border-l-blue-500",
      };
    case "RESOLVED":
    case "COMPLETED":
      return {
        statusGroup: "Completed",
        statusLabel: "COMPLETED",
        statusColor: "bg-emerald-100 text-emerald-700",
        accent: "border-l-emerald-500",
      };
    default:
      return {
        statusGroup: "Under Review",
        statusLabel: status || "UNKNOWN",
        statusColor: "bg-slate-100 text-slate-600",
        accent: "border-l-slate-400",
      };
  }
}

function actionForGroup(group) {
  switch (group) {
    case "In Progress":
      return { label: "Track Progress →", style: "bg-emerald-800 hover:bg-emerald-900 text-white" };
    case "Completed":
      return { label: "View Solution", style: "bg-emerald-700 hover:bg-emerald-800 text-white" };
    default:
      return { label: "View Details", style: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50" };
  }
}

// Transforms a raw ProblemDto from the API into the shape the card renders.
function toCardModel(dto) {
  const meta = getStatusMeta(dto.status);
  const action = actionForGroup(meta.statusGroup);
  const locationParts = [dto.district, dto.block, dto.village].filter(Boolean);

  return {
    id: `#JH-${dto.id}`,
    title: dto.title,
    category: dto.category || "—",
    location: locationParts.length ? locationParts.join(", ") : "—",
    submitted: dto.submittedDate || "", // include this field in ProblemDto if you track it
    extra: dto.description || "",
    extraColor: "text-slate-600",
    action: action.label,
    actionStyle: action.style,
    ...meta,
  };
}

function countFor(problems, tab) {
  if (tab === "All") return problems.length;
  return problems.filter((p) => p.statusGroup === tab).length;
}

function ProblemCard({ p }) {
  return (
    <div
      className={`bg-white rounded-lg border border-slate-200 border-l-4 ${p.accent} shadow-sm px-5 py-4 flex items-start justify-between gap-4`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
            {p.id}
          </span>
        </div>

        <h3 className="text-base font-semibold text-slate-900 leading-snug">
          {p.title}
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          <span className="text-slate-500">Category: </span>
          <span className="text-slate-700 font-medium">{p.category}</span>
          <span className="mx-1">•</span>
          <span className="text-slate-500">Location: </span>
          <span className="text-slate-700 font-medium">{p.location}</span>
          {p.submitted && (
            <>
              <span className="mx-1">•</span>
              <span className="text-slate-500">Submitted: </span>
              <span className="text-slate-700 font-medium">{p.submitted}</span>
            </>
          )}
        </p>

        {p.extra && (
          <p className={`text-sm mt-2 font-medium ${p.extraColor}`}>{p.extra}</p>
        )}
      </div>

      <div className="flex flex-col items-end gap-3 shrink-0">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.statusColor}`}>
          {p.statusLabel}
        </span>
        <button
          className={`text-sm font-medium px-4 py-2 rounded-md transition-colors ${p.actionStyle}`}
        >
          {p.action}
        </button>
      </div>
    </div>
  );
}

const Mproblem = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const userId = Number(storedUser?.id);

    if (!userId) {
      setError("Please log in again to view your submitted problems.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchProblems() {
      try {
        setLoading(true);
        setError(null);
        const response = await getProblemsByUser(userId);
        const data = response.data;
        if (!cancelled) {
          setProblems(data.map(toCardModel));
        }
      } catch (err) {
        if (!cancelled) {
          setError("Couldn't load your problems. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProblems();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible =
    activeTab === "All"
      ? problems
      : problems.filter((p) => p.statusGroup === activeTab);
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                My Submitted Problems (मेरी दर्ज समस्याएं)
              </h1>
              <p className="text-sm text-slate-500">
                {storedUser?.name ? `Resident: ${storedUser.name}` : ""}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab} ({countFor(problems, tab)})
              </button>
            ))}
          </div>
        </div>

        {/* Problem list */}
        <div className="flex flex-col gap-4">
          {loading && (
            <div className="text-center text-slate-400 py-12 text-sm">
              Loading your problems…
            </div>
          )}

          {!loading && error && (
            <div className="text-center text-rose-500 py-12 text-sm">{error}</div>
          )}

          {!loading &&
            !error &&
            visible.map((p) => <ProblemCard key={p.id} p={p} />)}

          {!loading && !error && visible.length === 0 && (
            <div className="text-center text-slate-400 py-12 text-sm">
              No problems in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mproblem;