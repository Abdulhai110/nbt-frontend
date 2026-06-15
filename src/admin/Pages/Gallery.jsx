// src/admin/Pages/Gallery.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { ENV } from "../../env/environment";

// ── Image Modal (view full size) ──────────────────────────────────────────────
function ViewModal({ item, onClose, onEdit, onDelete }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,12,20,0.85)", backdropFilter: "blur(6px)" }}
      onClick={onClose}>
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
        style={{ fontFamily: "'Outfit',sans-serif" }}
        onClick={e => e.stopPropagation()}>
        <div className="relative bg-slate-900">
          <img src={item.imageUrl} alt={item.title} className="w-full max-h-[60vh] object-contain" />
          <button onClick={onClose}
            className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white w-8 h-8 rounded-full flex items-center justify-center transition text-lg backdrop-blur-sm">×</button>
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${item.published ? "bg-emerald-500 text-white" : "bg-amber-400 text-amber-900"}`}>
              {item.published ? "● Live" : "● Draft"}
            </span>
          </div>
        </div>
        <div className="p-6">
          {item.title && <h2 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h2>}
          {item.description && <p className="text-slate-500 text-sm leading-relaxed mb-5">{item.description}</p>}
          <div className="flex gap-3">
            <button onClick={() => { onEdit(item); onClose(); }}
              className="flex-1 py-3 rounded-2xl font-semibold text-white transition"
              style={{ background: "linear-gradient(135deg,#4CAF50,#2E7D32)" }}>Edit</button>
            <button onClick={() => { onDelete(item._id); onClose(); }}
              className="flex-1 py-3 rounded-2xl font-semibold bg-red-50 hover:bg-red-100 text-red-600 transition">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Add / Edit Modal ──────────────────────────────────────────────────────────
function ItemModal({ item, onClose, onSaved }) {
  const isEdit = !!item;
  const [formData, setFormData] = useState({
    title:       item?.title       || "",
    description: item?.description || "",
    published:   item?.published   ?? true,
  });
  const [file, setFile]         = useState(null);
  const [preview, setPreview]   = useState(item?.imageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress]   = useState(0);

  const onDrop = useCallback((files) => {
    const f = files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { "image/*": [] }, maxFiles: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEdit && !file) { toast.error("Please select an image"); return; }
    setUploading(true);

    const data = new FormData();
    data.append("title",       formData.title);
    data.append("description", formData.description);
    data.append("published",   formData.published);
    if (file) data.append("image", file);

    try {
      const token = localStorage.getItem("authToken");
      const url = isEdit
        ? `${ENV.BASE_URL}/admin/gallery/${item._id}`
        : `${ENV.BASE_URL}/admin/gallery`;
      await axios[isEdit ? "put" : "post"](url, data, {
        headers: { Authorization: token },
        onUploadProgress: p => setProgress(Math.round((p.loaded * 100) / p.total)),
      });
      toast.success(isEdit ? "Photo updated!" : "Photo added!");
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed");
    } finally {
      setUploading(false); setProgress(0);
    }
  };

  const set = k => e => setFormData(f => ({ ...f, [k]: e.target.value }));
  const inputCls = "w-full px-4 py-3 border border-slate-200 rounded-2xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,12,20,0.82)", backdropFilter: "blur(6px)" }}
      onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ fontFamily: "'Outfit',sans-serif" }}
        onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">{isEdit ? "Edit Photo" : "Add New Photo"}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Image drop / preview */}
          {preview ? (
            <div className="relative rounded-2xl overflow-hidden group">
              <img src={preview} alt="" className="w-full h-52 object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <label className="cursor-pointer bg-white text-slate-700 text-sm font-semibold px-4 py-2 rounded-xl shadow transition hover:bg-slate-50">
                  <input type="file" accept="image/*" className="hidden" onChange={e => {
                    const f = e.target.files[0];
                    if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
                  }} />
                  Change Image
                </label>
              </div>
              {file && (
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2.5 py-1 rounded-lg font-semibold">New</span>
              )}
            </div>
          ) : (
            <div {...getRootProps()}
              className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition"
              style={{ borderColor: isDragActive ? "#4CAF50" : "#bbf7d0", background: isDragActive ? "#f0fdf4" : undefined }}>
              <input {...getInputProps()} />
              <div className="text-4xl mb-3">🖼️</div>
              <p className="text-slate-500 text-sm font-medium">{isDragActive ? "Drop it!" : "Drop image or click to browse"}</p>
              <p className="text-slate-400 text-xs mt-1">JPG, PNG, WebP</p>
            </div>
          )}

          {/* Fields */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Title</label>
            <input value={formData.title} onChange={set("title")} className={inputCls} placeholder="e.g. Sunset over Murree" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea value={formData.description} onChange={set("description")} rows={3} className={inputCls} placeholder="Short caption…" />
          </div>

          {/* Publish toggle */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-semibold text-slate-700">Publish</span>
            <button type="button"
              onClick={() => setFormData(f => ({ ...f, published: !f.published }))}
              className="relative w-11 h-6 rounded-full transition-colors duration-300"
              style={{ background: formData.published ? "#4CAF50" : "#e2e8f0" }}>
              <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
                style={{ left: formData.published ? "24px" : "2px" }} />
            </button>
          </div>

          {/* Progress */}
          {uploading && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Uploading…</span><span className="text-green-600 font-semibold">{progress}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" disabled={uploading}
              className="flex-[2] py-3 rounded-2xl font-bold text-white transition-all active:scale-[0.98] disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#4CAF50,#2E7D32)" }}>
              {uploading ? `${progress}%…` : isEdit ? "Save Changes" : "Upload Photo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Gallery Card ──────────────────────────────────────────────────────────────
function GalleryCard({ item, onView, onEdit, onDelete }) {
  return (
    <div
      className="group relative rounded-3xl overflow-hidden bg-slate-100 cursor-pointer shadow hover:shadow-xl transition-all duration-300 aspect-square"
      style={{ transition: "transform 0.25s, box-shadow 0.25s" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
      onClick={() => onView(item)}
    >
      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Status badge */}
      <div className="absolute top-3 right-3">
        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${item.published ? "bg-emerald-500 text-white" : "bg-amber-400 text-amber-900"}`}>
          {item.published ? "Live" : "Draft"}
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        {item.title && <p className="text-white font-semibold text-sm truncate mb-2">{item.title}</p>}
        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          <button onClick={() => onEdit(item)}
            className="flex-1 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm transition">Edit</button>
          <button onClick={() => onDelete(item._id)}
            className="flex-1 py-1.5 rounded-xl bg-red-500/70 hover:bg-red-500/90 text-white text-xs font-semibold backdrop-blur-sm transition">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);   // null = closed, {} = new, item = edit
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${ENV.BASE_URL}/admin/gallery`, {
        headers: { Authorization: token },
      });
      setItems(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch {
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photo? This cannot be undone.")) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${ENV.BASE_URL}/admin/gallery/${id}`, {
        headers: { Authorization: token },
      });
      toast.success("Photo deleted");
      fetchItems();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const filtered = items.filter(i =>
    i.title?.toLowerCase().includes(search.toLowerCase()) ||
    i.description?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total:     items.length,
    published: items.filter(i => i.published).length,
    draft:     items.filter(i => !i.published).length,
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center" style={{ fontFamily: "'Outfit',sans-serif" }}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500">Loading gallery…</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');`}</style>
      <div className="min-h-screen bg-slate-50 p-4 md:p-8" style={{ fontFamily: "'Outfit',sans-serif" }}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Gallery</h1>
              <p className="text-slate-400 mt-0.5 text-sm">Manage your photo collection</p>
            </div>
            <button onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 text-white px-5 py-3 rounded-2xl font-semibold transition-all active:scale-95 shadow-lg"
              style={{ background: "linear-gradient(135deg,#4CAF50,#2E7D32)", boxShadow: "0 8px 24px rgba(76,175,80,0.3)" }}>
              <span className="text-lg">+</span> Add Photo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total",     value: stats.total,     color: "#4CAF50", bg: "#f0fdf4" },
              { label: "Published", value: stats.published, color: "#10b981", bg: "#ecfdf5" },
              { label: "Drafts",    value: stats.draft,     color: "#94a3b8", bg: "#f8fafc" },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4 flex items-center gap-3" style={{ background: s.bg }}>
                <span className="text-2xl font-black" style={{ color: s.color }}>{s.value}</span>
                <span className="text-sm font-medium" style={{ color: s.color }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by title or description…"
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition" />
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center shadow">
              <div className="text-5xl mb-4">🖼️</div>
              <p className="text-slate-500 text-lg font-medium">No photos found</p>
              <p className="text-slate-400 text-sm mt-1">Upload your first photo to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map(item => (
                <GalleryCard
                  key={item._id}
                  item={item}
                  onView={setViewItem}
                  onEdit={setEditItem}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modals */}
        {viewItem && (
          <ViewModal
            item={viewItem}
            onClose={() => setViewItem(null)}
            onEdit={item => { setEditItem(item); setViewItem(null); }}
            onDelete={id => { handleDelete(id); setViewItem(null); }}
          />
        )}

        {(showAddModal || editItem) && (
          <ItemModal
            item={editItem || null}
            onClose={() => { setShowAddModal(false); setEditItem(null); }}
            onSaved={fetchItems}
          />
        )}
      </div>
    </>
  );
}