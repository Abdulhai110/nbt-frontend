// src/admin/Pages/TourForm.jsx
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDropzone} from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import {ENV} from "../../env/environment";
import {useNavigate, useParams} from "react-router-dom";

// ── Location Tag Input ────────────────────────────────────────────────────────
function LocationTagInput({ value, onChange }) {
  const [input, setInput] = useState("");
  const inputRef = useRef();

  const add = (raw) => {
    const tag = raw.trim();
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
    setInput("");
  };

  const handleKey = (e) => {
    if (["Enter", ",", "Tab"].includes(e.key)) {
      e.preventDefault();
      add(input);
    } else if (e.key === "Backspace" && !input && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  const remove = (tag) => onChange(value.filter(t => t !== tag));

  return (
    <div
      className="min-h-[52px] flex flex-wrap gap-2 items-center px-4 py-2.5 border border-slate-200 rounded-2xl bg-white focus-within:border-green-400 focus-within:ring-2 focus-within:ring-indigo-100 cursor-text transition"
      onClick={() => inputRef.current?.focus()}
    >
      {value.map(tag => (
        <span key={tag} className="flex items-center gap-1.5 bg-green-50 text-indigo-700 text-sm font-medium px-3 py-1 rounded-xl">
          <span>📍</span>{tag}
          <button type="button" onClick={() => remove(tag)} className="hover:text-red-500 transition text-base leading-none ml-0.5">×</button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKey}
        onBlur={() => add(input)}
        placeholder={value.length === 0 ? "Type location, press Enter or comma…" : "Add more…"}
        className="flex-1 min-w-[120px] outline-none text-slate-700 text-sm bg-transparent placeholder-slate-400"
      />
    </div>
  );
}

// ── Section Wrapper ───────────────────────────────────────────────────────────
function Section({ title, subtitle, children }) {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="font-bold text-slate-800 text-base">{title}</h2>
        {subtitle && <p className="text-slate-400 text-xs mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({ label, required, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

const inputCls = "w-full px-4 py-3 border border-slate-200 rounded-2xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition text-sm";

// ── Main Form ─────────────────────────────────────────────────────────────────
export default function TourForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    duration: "",
    groupSize: "",
    difficulty: "moderate",
    includes: "",
    excludes: "",
    published: false,
  });

  const [locations, setLocations] = useState([]);

  // Cover
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [removeCover, setRemoveCover] = useState(false);

  // Gallery — existing (from server) + new (local files)
  const [existingImages, setExistingImages] = useState([]); // { url, publicId }
  const [removedPublicIds, setRemovedPublicIds] = useState([]); // publicIds to delete on server
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(isEdit);

  // ── Fetch existing tour ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${ENV.BASE_URL}/admin/tours/${id}`, {
          headers: { Authorization: token },
        });
        const t = res.data.data || res.data;
        setFormData({
          title: t.title || "",
          price: t.price || "",
          description: t.description || "",
          duration: t.duration || "",
          groupSize: t.groupSize || "",
          difficulty: t.difficulty || "moderate",
          includes: Array.isArray(t.includes) ? t.includes.join("\n") : (t.includes || ""),
          excludes: Array.isArray(t.excludes) ? t.excludes.join("\n") : (t.excludes || ""),
          published: t.published || false,
        });
        setLocations(t.locations || []);
        if (t.coverImage) {
          // coverImage may be string or { url }
          setCoverPreview(typeof t.coverImage === "string" ? t.coverImage : t.coverImage.url);
        }
        if (t.images?.length) setExistingImages(t.images);
      } catch {
        toast.error("Failed to load tour data");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  // ── Cover dropzone ─────────────────────────────────────────────────────────
  const onCoverDrop = useCallback((files) => {
    const file = files[0];
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
    setRemoveCover(false);
  }, []);
  const { getRootProps: coverRoot, getInputProps: coverInput } = useDropzone({
    onDrop: onCoverDrop, accept: { "image/*": [] }, maxFiles: 1,
  });

  const handleRemoveCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
    setRemoveCover(true);
  };

  // ── Gallery dropzone ───────────────────────────────────────────────────────
  const onGalleryDrop = useCallback((files) => {
    setNewImageFiles(prev => [...prev, ...files]);
    setNewImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  }, []);
  const { getRootProps: galleryRoot, getInputProps: galleryInput, isDragActive } = useDropzone({
    onDrop: onGalleryDrop, accept: { "image/*": [] }, maxFiles: 15,
  });

  const removeExistingImage = (img) => {
    setExistingImages(prev => prev.filter(i => i !== img));
    if (img.publicId) setRemovedPublicIds(prev => [...prev, img.publicId]);
  };

  const removeNewImage = (idx) => {
    setNewImageFiles(prev => prev.filter((_, i) => i !== idx));
    setNewImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      toast.error("Title and price are required");
      return;
    }
    setUploading(true);

    const data = new FormData();

    // Basic fields
    Object.entries(formData).forEach(([k, v]) => {
      if (k === "includes" || k === "excludes") {
        const arr = v.split("\n").map(s => s.trim()).filter(Boolean);
        data.append(k, JSON.stringify(arr));
      } else {
        data.append(k, v);
      }
    });

    // Locations as JSON array
    data.append("locations", JSON.stringify(locations));

    // Cover
    if (coverFile) data.append("coverImage", coverFile);
    if (removeCover) data.append("removeCoverImage", "true");

    // Gallery: new files
    newImageFiles.forEach(f => data.append("images", f));

    // Gallery: tell server which existing publicIds to remove
    if (removedPublicIds.length) data.append("removeImages", JSON.stringify(removedPublicIds));

    try {
      const token = localStorage.getItem("authToken");
      const url = isEdit ? `${ENV.BASE_URL}/admin/tours/${id}` : `${ENV.BASE_URL}/admin/tours`;
      await axios[isEdit ? "put" : "post"](url, data, {
        headers: { Authorization: token },
        onUploadProgress: p => setProgress(Math.round((p.loaded * 100) / p.total)),
      });
      toast.success(isEdit ? "Tour updated!" : "Tour created!");
      navigate("/admin/tour");
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const set = (key) => (e) => setFormData(f => ({ ...f, [key]: e.target.value }));
  const totalImages = existingImages.length + newImagePreviews.length;

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center" style={{ fontFamily: "'Sora',sans-serif" }}>
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-400 text-sm">Loading tour…</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');`}</style>
      <div className="min-h-screen bg-slate-50 py-8 px-4" style={{ fontFamily: "'Sora',sans-serif" }}>
        <div className="max-w-3xl mx-auto">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button onClick={() => navigate("/admin/tour")} className="text-slate-400 hover:text-slate-700 text-sm flex items-center gap-1.5 mb-2 transition">
                ← Back to Tours
              </button>
              <h1 className="text-2xl font-extrabold text-slate-900">
                {isEdit ? "Edit Tour" : "Create New Tour"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400 font-medium">Publish</span>
              <button
                type="button"
                onClick={() => setFormData(f => ({ ...f, published: !f.published }))}
                className="relative w-12 h-6 rounded-full transition-colors duration-300"
                style={{background: formData.published ? "#151D4A" : "#e2e8f0"}}
              >
                <span
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
                  style={{ left: formData.published ? "26px" : "2px" }}
                />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* ── Basic Info ── */}
            <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6">
              <Section title="Basic Information" subtitle="Core details about this tour package">
                <Field label="Tour Title" required>
                  <input
                    value={formData.title}
                    onChange={set("title")}
                    className={inputCls}
                    placeholder="e.g. Amazing Alps Adventure"
                    required
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Price (USD)" required>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                      <input
                        type="number"
                        min="0"
                        value={formData.price}
                        onChange={set("price")}
                        className={inputCls + " pl-8"}
                        placeholder="0"
                        required
                      />
                    </div>
                  </Field>
                  <Field label="Duration (days)">
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        value={formData.duration}
                        onChange={set("duration")}
                        className={inputCls}
                        placeholder="e.g. 7"
                      />
                    </div>
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Group Size (max)">
                    <input
                      type="number"
                      min="1"
                      value={formData.groupSize}
                      onChange={set("groupSize")}
                      className={inputCls}
                      placeholder="e.g. 12"
                    />
                  </Field>
                  <Field label="Difficulty">
                    <select value={formData.difficulty} onChange={set("difficulty")} className={inputCls}>
                      <option value="easy">🟢 Easy</option>
                      <option value="moderate">🟡 Moderate</option>
                      <option value="challenging">🟠 Challenging</option>
                      <option value="extreme">🔴 Extreme</option>
                    </select>
                  </Field>
                </div>

                <Field label="Description">
                  <textarea
                    value={formData.description}
                    onChange={set("description")}
                    rows={4}
                    className={inputCls}
                    placeholder="Describe this tour in detail…"
                  />
                </Field>
              </Section>
            </div>

            {/* ── Locations ── */}
            <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
              <Section title="Locations" subtitle="Where does this tour go? Add each destination.">
                <Field label="Destinations" hint="Press Enter, comma, or Tab after each location">
                  <LocationTagInput value={locations} onChange={setLocations} />
                </Field>
                {locations.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <span className="text-xs text-slate-400">{locations.length} location{locations.length !== 1 ? "s" : ""} added</span>
                  </div>
                )}
              </Section>
            </div>

            {/* ── Includes / Excludes ── */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <Section title="What's Included" subtitle="One item per line">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="✅ Includes">
                    <textarea
                      value={formData.includes}
                      onChange={set("includes")}
                      rows={5}
                      className={inputCls}
                      placeholder={"Hotel accommodation\nBreakfast daily\nAirport transfers"}
                    />
                  </Field>
                  <Field label="❌ Excludes">
                    <textarea
                      value={formData.excludes}
                      onChange={set("excludes")}
                      rows={5}
                      className={inputCls}
                      placeholder={"International flights\nTravel insurance\nPersonal expenses"}
                    />
                  </Field>
                </div>
              </Section>
            </div>

            {/* ── Cover Image ── */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <Section title="Cover Image" subtitle="Main image shown in listings">
                {coverPreview ? (
                  <div className="relative rounded-2xl overflow-hidden">
                    <img src={coverPreview} alt="cover" className="w-full max-h-72 object-cover" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <label className="cursor-pointer bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl shadow transition">
                        <input type="file" accept="image/*" className="hidden" onChange={e => {
                          const f = e.target.files[0];
                          if (f) { setCoverFile(f); setCoverPreview(URL.createObjectURL(f)); setRemoveCover(false); }
                        }} />
                        Change
                      </label>
                      <button type="button" onClick={handleRemoveCover} className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow hover:bg-red-700 transition">
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    {...coverRoot()}
                    className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition hover:border-green-400 hover:bg-green-50/40"
                    style={{ borderColor: "#bbf7d0" }}
                  >
                    <input {...coverInput()} />
                    <div className="text-4xl mb-3">🖼️</div>
                    <p className="text-slate-500 text-sm font-medium">Drop cover image or click to browse</p>
                    <p className="text-slate-400 text-xs mt-1">JPG, PNG, WebP — recommended 1200×800px</p>
                  </div>
                )}
              </Section>
            </div>

            {/* ── Gallery ── */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <Section title={`Gallery Images (${totalImages}/15)`} subtitle="Showcase your tour with multiple photos">

                {/* Existing images */}
                {existingImages.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Current Photos</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {existingImages.map((img, i) => (
                        <div key={i} className="relative group rounded-2xl overflow-hidden aspect-square bg-slate-100">
                          <img src={img.url || img} alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeExistingImage(img)}
                              className="bg-red-600 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-red-700 transition"
                            >✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <hr className="my-4 border-slate-100" />
                  </div>
                )}

                {/* New image previews */}
                {newImagePreviews.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">New Photos (to upload)</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {newImagePreviews.map((src, i) => (
                        <div key={i} className="relative group rounded-2xl overflow-hidden aspect-square bg-slate-100">
                          <img src={src} alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeNewImage(i)}
                              className="bg-red-600 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-red-700 transition"
                            >✕</button>
                          </div>
                          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-lg">New</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dropzone */}
                {totalImages < 15 && (
                  <div
                    {...galleryRoot()}
                    className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition"
                    style={{
                      borderColor: isDragActive ? "#151D4A" : "#EABDBA",
                      background: isDragActive ? "#f0fdf4" : undefined
                    }}
                  >
                    <input {...galleryInput()} />
                    <div className="text-3xl mb-2">📷</div>
                    <p className="text-slate-500 text-sm font-medium">{isDragActive ? "Drop images here!" : "Drop images or click to browse"}</p>
                    <p className="text-slate-400 text-xs mt-1">{15 - totalImages} slot{15 - totalImages !== 1 ? "s" : ""} remaining</p>
                  </div>
                )}
              </Section>
            </div>

            {/* ── Upload progress ── */}
            {uploading && (
                <div className="bg-white rounded-3xl p-5 shadow-sm space-y-2">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Uploading…</span>
                    <span className="font-semibold" style={{color: "#151D4A"}}>
                      {progress}%
                    </span>
                  </div>

                  <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{background: "#F2E3E0"}}
                  >
                    <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${progress}%`,
                          background: "linear-gradient(90deg, #151D4A 0%, #404569 100%)",
                        }}
                    />
                  </div>
                </div>
            )}

            {/* ── Actions ── */}
            <div className="flex gap-3">
              <button
                  type="button"
                  onClick={() => navigate("/admin/tours")}
                  className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                  type="submit"
                  disabled={uploading}
                  className="flex-[2] py-4 rounded-2xl font-bold text-white text-base transition-all active:scale-[0.98] disabled:opacity-60"
                  style={{
                    background: uploading
                        ? "#404569"
                        : "linear-gradient(135deg, #151D4A 0%, #404569 100%)",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(21, 29, 74, 0.30)",
                  }}
              >
                {uploading
                    ? `Uploading ${progress}%…`
                    : isEdit
                        ? "Save Changes"
                        : "Create Tour"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
