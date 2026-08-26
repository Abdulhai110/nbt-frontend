// src/admin/Pages/DestinationForm.jsx
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import { ENV } from "../../env/environment";
import { useNavigate, useParams } from "react-router-dom";

const CONTINENTS = ["", "Asia", "Europe", "Africa", "North America", "South America", "Oceania", "Antarctica"];

// ── Highlight Tag Input ───────────────────────────────────────────────────────
function TagInput({ value, onChange, placeholder }) {
  const [input, setInput] = useState("");
  const ref = useRef();

  const add = (raw) => {
    const tag = raw.trim();
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
    setInput("");
  };

  const handleKey = (e) => {
    if (["Enter", ",", "Tab"].includes(e.key)) { e.preventDefault(); add(input); }
    else if (e.key === "Backspace" && !input && value.length) onChange(value.slice(0, -1));
  };

  return (
    <div
      className="min-h-[52px] flex flex-wrap gap-2 items-center px-4 py-2.5 border border-slate-200 rounded-2xl bg-white focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100 cursor-text transition"
      onClick={() => ref.current?.focus()}
    >
      {value.map(tag => (
        <span key={tag} className="flex items-center gap-1.5 bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1 rounded-xl">
          ✦ {tag}
          <button type="button" onClick={() => onChange(value.filter(t => t !== tag))} className="hover:text-red-500 transition text-base leading-none ml-0.5">×</button>
        </span>
      ))}
      <input
        ref={ref} value={input}
        onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
        onBlur={() => add(input)}
        placeholder={value.length === 0 ? placeholder : "Add more…"}
        className="flex-1 min-w-[140px] outline-none text-slate-700 text-sm bg-transparent placeholder-slate-400"
      />
    </div>
  );
}

// ── Shared UI ─────────────────────────────────────────────────────────────────
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

function Field({ label, required, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-sm font-semibold text-slate-700">
        {label}{required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

const inputCls = "w-full px-4 py-3 border border-slate-200 rounded-2xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition text-sm";

// ── Main Form ─────────────────────────────────────────────────────────────────
export default function DestinationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "", description: "", location: "", country: "",
    continent: "", bestTimeToVisit: "", published: true,
  });
  const [highlights, setHighlights] = useState([]);

  // Cover
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [removeCover, setRemoveCover] = useState(false);

  // Gallery
  const [existingImages, setExistingImages] = useState([]);
  const [removedPublicIds, setRemovedPublicIds] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(isEdit);

  // ── Fetch existing ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${ENV.BASE_URL}/admin/destinations/${id}`, {
          headers: { Authorization: token },
        });
        const d = res.data.data || res.data;
        setFormData({
          name: d.name || "",
          description: d.description || "",
          location: d.location || "",
          country: d.country || "",
          continent: d.continent || "",
          bestTimeToVisit: d.bestTimeToVisit || "",
          published: d.published ?? true,
        });
        setHighlights(d.highlights || []);
        if (d.coverImage) {
          setCoverPreview(typeof d.coverImage === "string" ? d.coverImage : d.coverImage.url);
        }
        if (d.images?.length) setExistingImages(d.images);
      } catch {
        toast.error("Failed to load destination");
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
    setCoverFile(null); setCoverPreview(null); setRemoveCover(true);
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
    if (!formData.name) { toast.error("Name is required"); return; }
    setUploading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    data.append("highlights", JSON.stringify(highlights));

    if (coverFile) data.append("coverImage", coverFile);
    if (removeCover) data.append("removeCoverImage", "true");

    newImageFiles.forEach(f => data.append("images", f));
    if (removedPublicIds.length) data.append("removeImages", JSON.stringify(removedPublicIds));

    try {
      const token = localStorage.getItem("authToken");
      const url = isEdit
        ? `${ENV.BASE_URL}/admin/destinations/${id}`
        : `${ENV.BASE_URL}/admin/destinations`;

      await axios[isEdit ? "put" : "post"](url, data, {
        headers: { Authorization: token },
        onUploadProgress: p => setProgress(Math.round((p.loaded * 100) / p.total)),
      });

      toast.success(isEdit ? "Destination updated!" : "Destination created!");
      navigate("/admin/destination");
    } catch (err) {
      toast.error(err.response?.data?.error || "Operation failed");
    } finally {
      setUploading(false); setProgress(0);
    }
  };

  const set = (key) => (e) => setFormData(f => ({ ...f, [key]: e.target.value }));
  const totalImages = existingImages.length + newImagePreviews.length;

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center" style={{ fontFamily: "'Outfit',sans-serif" }}>
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-400 text-sm">Loading destination…</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');`}</style>
      <div className="min-h-screen bg-slate-50 py-8 px-4" style={{ fontFamily: "'Outfit',sans-serif" }}>
        <div className="max-w-3xl mx-auto">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button onClick={() => navigate("/admin/destination")}
                className="text-slate-400 hover:text-slate-700 text-sm flex items-center gap-1.5 mb-2 transition">
                ← Back to Destinations
              </button>
              <h1 className="text-2xl font-extrabold text-slate-900">
                {isEdit ? "Edit Destination" : "Add New Destination"}
              </h1>
            </div>
            {/* Publish toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400 font-medium">Publish</span>
              <button type="button"
                onClick={() => setFormData(f => ({ ...f, published: !f.published }))}
                className="relative w-12 h-6 rounded-full transition-colors duration-300"
                style={{ background: formData.published ? "#062A4D" : "#e2e8f0" }}
              >
                <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
                  style={{ left: formData.published ? "26px" : "2px" }} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* ── Basic Info ── */}
            <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6">
              <Section title="Basic Information" subtitle="Core details about this destination">
                <Field label="Destination Name" required>
                  <input value={formData.name} onChange={set("name")} className={inputCls} placeholder="e.g. Santorini" required />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="City / Region">
                    <input value={formData.location} onChange={set("location")} className={inputCls} placeholder="e.g. Thira" />
                  </Field>
                  <Field label="Country">
                    <input value={formData.country} onChange={set("country")} className={inputCls} placeholder="e.g. Greece" />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Continent">
                    <select value={formData.continent} onChange={set("continent")} className={inputCls}>
                      {CONTINENTS.map(c => <option key={c} value={c}>{c || "— Select —"}</option>)}
                    </select>
                  </Field>
                  <Field label="Best Time to Visit">
                    <input value={formData.bestTimeToVisit} onChange={set("bestTimeToVisit")} className={inputCls} placeholder="e.g. April – October" />
                  </Field>
                </div>

                <Field label="Description">
                  <textarea value={formData.description} onChange={set("description")} rows={4}
                    className={inputCls} placeholder="Describe this destination…" />
                </Field>
              </Section>
            </div>

            {/* ── Highlights ── */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <Section title="Highlights" subtitle="Key attractions or features — press Enter after each">
                <Field label="Highlights" hint="Press Enter, comma, or Tab to add each highlight">
                  <TagInput value={highlights} onChange={setHighlights} placeholder="e.g. Stunning sunsets, Blue-domed churches…" />
                </Field>
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
                      <button type="button" onClick={handleRemoveCover}
                        className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow hover:bg-red-700 transition">Remove</button>
                    </div>
                  </div>
                ) : (
                  <div {...coverRoot()} className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition hover:bg-amber-50/40"
                    style={{ borderColor: "#fcd34d" }}>
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
              <Section title={`Gallery Images (${totalImages}/15)`} subtitle="Showcase this destination with multiple photos">

                {existingImages.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Current Photos</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {existingImages.map((img, i) => (
                        <div key={i} className="relative group rounded-2xl overflow-hidden aspect-square bg-slate-100">
                          <img src={img.url || img} alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <button type="button" onClick={() => removeExistingImage(img)}
                              className="bg-red-600 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-red-700 transition">✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <hr className="my-4 border-slate-100" />
                  </div>
                )}

                {newImagePreviews.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">New Photos (to upload)</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {newImagePreviews.map((src, i) => (
                        <div key={i} className="relative group rounded-2xl overflow-hidden aspect-square bg-slate-100">
                          <img src={src} alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <button type="button" onClick={() => removeNewImage(i)}
                              className="bg-red-600 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-red-700 transition">✕</button>
                          </div>
                          <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-lg">New</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {totalImages < 15 && (
                  <div {...galleryRoot()}
                    className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition"
                    style={{ borderColor: isDragActive ? "#062A4D" : "#fcd34d", background: isDragActive ? "#fffbeb" : undefined }}
                  >
                    <input {...galleryInput()} />
                    <div className="text-3xl mb-2">📷</div>
                    <p className="text-slate-500 text-sm font-medium">{isDragActive ? "Drop images here!" : "Drop images or click to browse"}</p>
                    <p className="text-slate-400 text-xs mt-1">{15 - totalImages} slot{15 - totalImages !== 1 ? "s" : ""} remaining</p>
                  </div>
                )}
              </Section>
            </div>

            {/* Progress */}
            {uploading && (
              <div className="bg-white rounded-3xl p-5 shadow-sm space-y-2">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Uploading…</span>
                  <span className="font-semibold text-amber-500">{progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #062A4D 0%, #404569 100%)" }} />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button type="button" onClick={() => navigate("/admin/destination")}
                className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition">Cancel</button>
              <button type="submit" disabled={uploading}
                className="flex-[2] py-4 rounded-2xl font-bold text-white text-base transition-all active:scale-[0.98] disabled:opacity-60"
                style={{ background: "linear-gradient(90deg, #062A4D 0%, #404569 100%)" }}
              >
                {uploading ? `Uploading ${progress}%…` : isEdit ? "Save Changes" : "Create Destination"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
