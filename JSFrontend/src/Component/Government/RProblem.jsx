import { useState, useEffect } from "react";
import { Search, User, MapPin, X, PlayCircle, ExternalLink } from "lucide-react";
import Navitem from "./Navitem";
import { getAllProblems } from "./Config/PublicApi";

const IMAGE_BASE_URL = "http://localhost:9090/api/problem/file";

const stats = [
  { label: "Total Reports", value: "1,892" },
  { label: "Pending Review", value: "312" },
  {
    label: "Verified",
    value: "1,420",
    bg: "bg-green-50",
    border: "border-green-100",
    text: "text-green-700",
  },
  {
    label: "Rejected",
    value: "160",
    bg: "bg-red-50",
    border: "border-red-100",
    text: "text-red-600",
  },
  { label: "Critical", value: "15" },
];

const statusStyles = {
  SUBMITTED: { label: "New", color: "bg-blue-50 text-blue-600" },
  UNDER_REVIEW: { label: "Under Review", color: "bg-amber-50 text-amber-600" },
  VERIFIED: { label: "Verified", color: "bg-green-50 text-green-600" },
  REJECTED: { label: "Rejected", color: "bg-red-50 text-red-500" },
};

const priorityStyles = {
  CRITICAL: { label: "Critical", color: "bg-red-50 text-red-600" },
  HIGH: { label: "High", color: "bg-orange-50 text-orange-600" },
  MEDIUM: { label: "Medium", color: "bg-amber-50 text-amber-600" },
  LOW: { label: "Low", color: "bg-green-50 text-green-600" },
};

const getPriorityDisplay = (level) =>
  priorityStyles[level] || { label: level || "Unknown", color: "bg-gray-50 text-gray-500" };

const getStatusDisplay = (status) =>
  statusStyles[status] || { label: status || "Unknown", color: "bg-gray-50 text-gray-500" };

// Detects video files by extension so we know whether to render <video> or <img>
const isVideoFile = (path) => /\.(mp4|webm|ogg|mov)$/i.test(path || "");

// A coordinate is only usable if both values exist and parse to real numbers
const hasValidCoords = (lat, lng) => {
  const la = Number(lat);
  const ln = Number(lng);
  return Number.isFinite(la) && Number.isFinite(ln) && !(la === 0 && ln === 0);
};

/* =========================================
   PROBLEM LOCATION MAP — embeds a small,
   non-interactive preview map. Clicking it
   opens the MapLightbox in-page instead of
   navigating away to Google Maps.
========================================= */
const ProblemLocationMap = ({ latitude, longitude, onExpand }) => {
  if (!hasValidCoords(latitude, longitude)) {
    return (
      <div className="mt-2 h-28 rounded-lg bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-xs text-gray-400 gap-1">
        <MapPin className="w-4 h-4" />
        Location not available
      </div>
    );
  }

  const lat = Number(latitude);
  const lng = Number(longitude);
  const embedSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
      <div
        onClick={onExpand}
        className="relative cursor-pointer group"
        style={{ height: 140 }}
      >
        {/* pointerEvents: none stops the iframe itself from capturing clicks
            and navigating away — the overlay below handles the click instead */}
        <iframe
          title="Problem location map"
          src={embedSrc}
          width="100%"
          height="140"
          style={{ border: 0, display: "block", pointerEvents: "none" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-md transition-opacity">
            View larger map
          </span>
        </div>
      </div>
      <div className="px-2 py-1.5 bg-gray-50 flex items-center justify-between">
        <span className="text-[10px] text-gray-400">
          {lat.toFixed(4)}°, {lng.toFixed(4)}°
        </span>
        <button
          type="button"
          onClick={onExpand}
          className="text-[10px] text-green-700 hover:underline flex items-center gap-1"
        >
          Expand map <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

/* =========================================
   MEDIA LIGHTBOX — opens image/video inline,
   no page navigation
========================================= */
const MediaLightbox = ({ src, onClose }) => {
  if (!src) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "rgba(255,255,255,0.15)",
          border: "none",
          borderRadius: "50%",
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <X size={20} color="#fff" />
      </button>

      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "90vh" }}>
        {isVideoFile(src) ? (
          <video
            src={src}
            controls
            autoPlay
            style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: 8 }}
          />
        ) : (
          <img
            src={src}
            alt="Problem media"
            style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: 8, objectFit: "contain" }}
          />
        )}
      </div>
    </div>
  );
};

/* =========================================
   MAP LIGHTBOX — opens a larger, still
   in-page map overlay, matching the
   behavior of the media lightbox above
========================================= */
const MapLightbox = ({ location, onClose }) => {
  if (!location) return null;

  const { latitude, longitude } = location;
  if (!hasValidCoords(latitude, longitude)) return null;

  const lat = Number(latitude);
  const lng = Number(longitude);
  const embedSrc = `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
  const openSrc = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "rgba(255,255,255,0.15)",
          border: "none",
          borderRadius: "50%",
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <X size={20} color="#fff" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90vw",
          maxWidth: 900,
          height: "80vh",
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <iframe
          title="Expanded problem location map"
          src={embedSrc}
          width="100%"
          height="100%"
          style={{ border: 0, flex: 1 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="px-3 py-2 bg-gray-50 flex items-center justify-between border-t border-gray-200">
          <span className="text-xs text-gray-500">
            {lat.toFixed(5)}°, {lng.toFixed(5)}°
          </span>
          <a
            href={openSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-700 hover:underline flex items-center gap-1"
          >
            Open in Google Maps <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

/* =========================================
   MEDIA THUMBNAIL — shows image thumb or a
   video placeholder with a play icon
========================================= */
const MediaThumbnail = ({ path, onClick }) => {
  const fileUrl = `${IMAGE_BASE_URL}/${path}`;

  if (isVideoFile(path)) {
    return (
      <div
        onClick={onClick}
        className="h-14 w-full rounded-md bg-gray-900 cursor-pointer hover:opacity-80 relative flex items-center justify-center overflow-hidden"
      >
        {/* Using the video itself as a static preview frame */}
        <video src={fileUrl} className="h-full w-full object-cover" muted preload="metadata" />
        <PlayCircle
          className="absolute text-white opacity-90"
          size={22}
          style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.6))" }}
        />
      </div>
    );
  }

  return (
    <img
      src={fileUrl}
      alt="Problem media"
      onClick={onClick}
      className="h-14 w-full object-cover rounded-md bg-gray-100 cursor-pointer hover:opacity-80"
    />
  );
};


const RProblem = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [mapLightbox, setMapLightbox] = useState(null); // { latitude, longitude } | null

  useEffect(() => {
    let cancelled = false;

    const loadProblems = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getAllProblems();
        if (cancelled) return;

        const fetched = response?.data || [];
        if (!Array.isArray(fetched)) {
          console.error("Expected an array of problems but got:", fetched);
          setError("Unexpected response format from server.");
          return;
        }
        setProblems(fetched);
      } catch (err) {
        console.error("Failed to load problems:", err);
        console.error("Status:", err?.response?.status);
        console.error("Data:", err?.response?.data);
        if (!cancelled) {
          setError(
            !err?.response
              ? "Cannot reach server. Check backend is running / CORS."
              : `Could not load problems (status ${err.response.status}).`
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadProblems();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden flex bg-gray-50">
      <Navitem />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="relative w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problems"
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 flex items-center gap-1">
              All Districts <span className="text-[10px]">▾</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-medium text-gray-800">
                  Ramesh Singh
                </p>
                <p className="text-[10px] text-gray-400">Government Officer</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 space-y-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Reported Problems
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Review, verify and manage problems reported by citizens across
                Jharkhand.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className={`rounded-xl border px-4 py-3 ${s.bg || "bg-white"} ${s.border || "border-gray-100"} shadow-sm`}
                >
                  <p className={`text-xs ${s.text || "text-gray-500"}`}>
                    {s.label}
                  </p>
                  <p
                    className={`text-2xl font-bold mt-1 ${s.text ? s.text.replace("700", "900").replace("600", "900") : "text-gray-900"}`}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by problem title or ID"
                  className="w-full bg-gray-50 border border-gray-200 rounded-md pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>
              <select className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-600">
                <option>Districts</option>
              </select>
              <select className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-600">
                <option>Category</option>
              </select>
              <select className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-600">
                <option>Priority</option>
              </select>
              <select className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-600">
                <option>Status</option>
              </select>
              <button className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-600">
                Date range
              </button>
              <button className="bg-green-900 hover:bg-green-950 text-white text-sm font-medium px-4 py-1.5 rounded-md">
                Apply Filters
              </button>
              <button className="text-sm text-gray-500 px-2 py-1.5">
                Reset
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                Citizen Reported Problems
              </h3>

              {loading && (
                <p className="text-sm text-gray-400 py-6 text-center">
                  Loading problems...
                </p>
              )}

              {!loading && error && (
                <p className="text-sm text-red-500 py-6 text-center">
                  {error}
                </p>
              )}

              {!loading && !error && problems.length === 0 && (
                <p className="text-sm text-gray-400 py-6 text-center">
                  No problems reported yet.
                </p>
              )}

              {!loading && !error && problems.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                        <th className="pb-2 font-medium pr-4">ID</th>
                        <th className="pb-2 font-medium pr-4">Problem</th>
                        <th className="pb-2 font-medium pr-4">Category</th>
                        <th className="pb-2 font-medium pr-4">District</th>
                        <th className="pb-2 font-medium pr-4">Date</th>
                        <th className="pb-2 font-medium pr-4">Priority</th>
                        <th className="pb-2 font-medium pr-4">Report Count</th>
                        <th className="pb-2 font-medium pr-4">Status</th>
                        <th className="pb-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {problems.map((p) => {
                        const priority = getPriorityDisplay(p.level);
                        const status = getStatusDisplay(p.status);
                        return (
                          <tr
                            key={p.id}
                            onClick={() => setSelectedProblem(p)}
                            className="border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50"
                          >
                            <td className="py-3 pr-4 text-blue-600">#{p.id}</td>
                            <td className="py-3 pr-4 text-gray-800">{p.title}</td>
                            <td className="py-3 pr-4 text-gray-600">
                              {p.categoryName || "—"}
                            </td>
                            <td className="py-3 pr-4 text-gray-600">
                              {p.district || "—"}
                            </td>
                            <td className="py-3 pr-4 text-gray-600">
                              {p.createdAt
                                ? new Date(p.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                                : "—"}
                            </td>
                            <td className="py-3 pr-4">
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${priority.color}`}
                              >
                                {priority.label}
                              </span>
                            </td>
                            <td className="py-3 pr-4 text-gray-600">
                              {p.problemRank ?? 0}
                            </td>
                            <td className="py-3 pr-4">
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${status.color}`}
                              >
                                {status.label}
                              </span>
                            </td>
                            <td className="py-3">
                              <button className="bg-green-900 hover:bg-green-950 text-white text-xs font-medium px-3 py-1.5 rounded-md">
                                Review
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>

          {selectedProblem && (() => {
            const priority = getPriorityDisplay(selectedProblem.level);
            return (
              <aside className="w-80 flex-shrink-0 border-l border-gray-200 bg-white overflow-y-auto p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">Problem</p>
                  <button
                    type="button"
                    onClick={() => setSelectedProblem(null)}
                    aria-label="Close problem details"
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-base font-semibold text-gray-900 mt-1">
                  {selectedProblem.title}
                </h2>

                <div className="grid grid-cols-2 gap-y-3 mt-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Category</p>
                    <p className="text-gray-700">
                      {selectedProblem.categoryName || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">District</p>
                    <p className="text-gray-700">
                      {selectedProblem.district || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Reported</p>
                    <p className="text-gray-700">
                      {selectedProblem.createdAt
                        ? new Date(selectedProblem.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Priority</p>
                    <span
                      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-0.5 ${priority.color}`}
                    >
                      {priority.label}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold text-gray-500">
                    Citizen Description
                  </p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {selectedProblem.description || "No description provided."}
                  </p>
                </div>

                {/* Live map preview fetched from the problem's own latitude/longitude.
                    Clicking it opens the in-page MapLightbox instead of navigating away. */}
                <div className="mt-5">
                  <p className="text-xs font-semibold text-gray-500">
                    Location Details
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedProblem.address ||
                      `${selectedProblem.village || ""}, ${selectedProblem.district || ""}`}
                  </p>
                  <ProblemLocationMap
                    latitude={selectedProblem.latitude}
                    longitude={selectedProblem.longitude}
                    onExpand={() =>
                      setMapLightbox({
                        latitude: selectedProblem.latitude,
                        longitude: selectedProblem.longitude,
                      })
                    }
                  />
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold text-gray-500">
                    Uploaded Problem Media
                  </p>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {selectedProblem.images && selectedProblem.images.length > 0 ? (
                      selectedProblem.images.map((path, i) => (
                        <MediaThumbnail
                          key={i}
                          path={path}
                          onClick={() => setLightboxSrc(`${IMAGE_BASE_URL}/${path}`)}
                        />
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 col-span-3">No media uploaded.</p>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold text-gray-500 mb-2">
                    Actions
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-green-900 hover:bg-green-950 text-white text-xs font-medium py-2 rounded-md">
                      Verify Problem
                    </button>
                    <button className="border border-red-200 text-red-500 text-xs font-medium py-2 rounded-md">
                      Reject
                    </button>
                    <button className="border border-gray-200 text-gray-700 text-xs font-medium py-2 rounded-md">
                      Increase Priority
                    </button>
                    <button className="border border-gray-200 text-gray-700 text-xs font-medium py-2 rounded-md">
                      Create Challenge
                    </button>
                  </div>
                </div>
              </aside>
            );
          })()}
        </div>
      </div>

      <MediaLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      <MapLightbox location={mapLightbox} onClose={() => setMapLightbox(null)} />
    </div>
  );
};

export default RProblem;