// // src/admin/Pages/TourTypes.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { ENV } from "../../env/environment";

// const inputCls = "w-full px-4 py-3 border border-slate-200 rounded-2xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition text-sm";

// const emptyForm = { name: "", description: "", icon: "", style: "", order: 0, active: true };

// export default function TourTypes() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [form, setForm] = useState(emptyForm);
//   const [editingId, setEditingId] = useState(null);
//   const [saving, setSaving] = useState(false);

//   const token = () => localStorage.getItem("authToken");

//   const fetchItems = async () => {
//     try {
//       const res = await axios.get(`${ENV.BASE_URL}/admin/tour-types`, {
//         headers: { Authorization: token() },
//       });
//       setItems(Array.isArray(res.data?.data) ? res.data.data : []);
//     } catch {
//       toast.error("Failed to load tour types");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchItems(); }, []);

//   const set = (key) => (e) =>
//     setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

//   const resetForm = () => { setForm(emptyForm); setEditingId(null); };

//   const handleEdit = (item) => {
//     setForm({
//       name: item.name || "",
//       description: item.description || "",
//       icon: item.icon || "",
//       style: item.style || "",
//       order: item.order ?? 0,
//       active: item.active,
//     });
//     setEditingId(item._id);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this tour type? Tours using it must be reassigned first.")) return;
//     try {
//       await axios.delete(`${ENV.BASE_URL}/admin/tour-types/${id}`, {
//         headers: { Authorization: token() },
//       });
//       toast.success("Tour type deleted");
//       fetchItems();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to delete");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name.trim()) { toast.error("Name is required"); return; }
//     setSaving(true);
//     try {
//       if (editingId) {
//         await axios.put(`${ENV.BASE_URL}/admin/tour-types/${editingId}`, form, {
//           headers: { Authorization: token() },
//         });
//         toast.success("Tour type updated");
//       } else {
//         await axios.post(`${ENV.BASE_URL}/admin/tour-types`, form, {
//           headers: { Authorization: token() },
//         });
//         toast.success("Tour type created");
//       }
//       resetForm();
//       fetchItems();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Operation failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div className="p-8 text-slate-400">Loading…</div>;

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-8" style={{ fontFamily: "'Sora',sans-serif" }}>
//       <div className="max-w-4xl mx-auto space-y-8">
//         <h1 className="text-2xl font-extrabold text-slate-900">Tour Types</h1>
//         <p className="text-slate-400 text-sm -mt-6">
//           Manage the hero buttons / top-level categories shown on the homepage (e.g. "Pakistan Tour Packages", "Honeymoon Packages").
//         </p>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
//           <h2 className="font-bold text-slate-800">{editingId ? "Edit Tour Type" : "New Tour Type"}</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <input value={form.name} onChange={set("name")} placeholder="Name (e.g. Honeymoon Packages)" className={inputCls} required />
//             <input value={form.icon} onChange={set("icon")} placeholder="Icon URL / class (optional)" className={inputCls} />
//           </div>
//           <textarea value={form.description} onChange={set("description")} placeholder="Description (optional)" rows={2} className={inputCls} />
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <input value={form.style} onChange={set("style")} placeholder='Button style (e.g. "style2")' className={inputCls} />
//             <input type="number" value={form.order} onChange={set("order")} placeholder="Display order" className={inputCls} />
//             <label className="flex items-center gap-2 px-4 text-sm font-medium text-slate-600">
//               <input type="checkbox" checked={form.active} onChange={set("active")} />
//               Active
//             </label>
//           </div>
//           <div className="flex gap-3">
//             <button type="submit" disabled={saving} className="px-6 py-3 rounded-2xl font-bold text-white" style={{ background: "#151D4A" }}>
//               {saving ? "Saving…" : editingId ? "Save Changes" : "Create"}
//             </button>
//             {editingId && (
//               <button type="button" onClick={resetForm} className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-600 font-semibold">
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>

//         {/* List */}
//         <div className="bg-white rounded-3xl shadow-sm divide-y divide-slate-100">
//           {items.length === 0 ? (
//             <p className="p-6 text-slate-400 text-sm">No tour types yet.</p>
//           ) : (
//             items.map((item) => (
//               <div key={item._id} className="flex items-center justify-between p-5">
//                 <div>
//                   <p className="font-semibold text-slate-800">{item.name}</p>
//                   <p className="text-xs text-slate-400">/{item.slug} · order {item.order} · {item.active ? "Active" : "Inactive"}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button onClick={() => handleEdit(item)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition">Edit</button>
//                   <button onClick={() => handleDelete(item._id)} className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-medium transition">Delete</button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }








// src/admin/Pages/TourTypes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ENV } from "../../env/environment";

// ── View Modal ──────────────────────────────────────────────────────────────
function ViewModal({ item, onClose, onEdit, onDelete }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,12,20,0.85)", backdropFilter: "blur(6px)" }}
      onClick={onClose}>
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
        style={{ fontFamily: "'Outfit',sans-serif" }}
        onClick={e => e.stopPropagation()}>
        <div className="relative p-8 text-center"
          style={{ background: "linear-gradient(135deg,#151D4A,#404569)" }}>
          <button onClick={onClose}
            className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white w-8 h-8 rounded-full flex items-center justify-center transition text-lg backdrop-blur-sm">×</button>
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${item.active ? "bg-emerald-500 text-white" : "bg-amber-400 text-amber-900"}`}>
              {item.active ? "● Active" : "● Inactive"}
            </span>
          </div>
          <div className="text-4xl mb-2">🗂️</div>
          <h2 className="text-xl font-bold text-white">{item.name}</h2>
          <p className="text-white/70 text-xs mt-1">/{item.slug}</p>
        </div>

        <div className="p-6">
          {item.description && <p className="text-slate-500 text-sm leading-relaxed mb-3">{item.description}</p>}
          <div className="flex flex-wrap gap-2 mb-5">
            {item.style && (
              <span className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-lg">
                Button style: {item.style || "default"}
              </span>
            )}
            <span className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-lg">
              Order: {item.order ?? 0}
            </span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { onEdit(item); onClose(); }}
              className="flex-1 py-3 rounded-2xl font-semibold text-white transition"
              style={{ background: "linear-gradient(135deg,#151D4A,#2E7D32)" }}>Edit</button>
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
    name:        item?.name        || "",
    description: item?.description || "",
    icon:        item?.icon        || "",
    style:       item?.style       || "",
    order:       item?.order       ?? 0,
    active:      item?.active      ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { toast.error("Name is required"); return; }
    setSaving(true);

    try {
      const token = localStorage.getItem("authToken");
      const url = isEdit
        ? `${ENV.BASE_URL}/admin/tour-types/${item._id}`
        : `${ENV.BASE_URL}/admin/tour-types`;
      await axios[isEdit ? "put" : "post"](url, formData, {
        headers: { Authorization: token },
      });
      toast.success(isEdit ? "Tour type updated!" : "Tour type created!");
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setSaving(false);
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
          <h2 className="text-xl font-bold text-slate-900">{isEdit ? "Edit Tour Type" : "New Tour Type"}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Name</label>
            <input value={formData.name} onChange={set("name")} className={inputCls} placeholder="e.g. Honeymoon Packages" required />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea value={formData.description} onChange={set("description")} rows={3} className={inputCls} placeholder="Short description…" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Icon</label>
              <input value={formData.icon} onChange={set("icon")} className={inputCls} placeholder="Icon URL / class" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Button Style</label>
              <input value={formData.style} onChange={set("style")} className={inputCls} placeholder='e.g. "style2"' />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Display Order</label>
            <input type="number" value={formData.order} onChange={set("order")} className={inputCls} placeholder="0" />
          </div>

          {/* Active toggle */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-semibold text-slate-700">Active</span>
            <button type="button"
              onClick={() => setFormData(f => ({ ...f, active: !f.active }))}
              className="relative w-11 h-6 rounded-full transition-colors duration-300"
              style={{ background: formData.active ? "#151D4A" : "#EABDBA" }}>
              <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
                style={{ left: formData.active ? "24px" : "2px" }} />
            </button>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" disabled={saving}
              className="flex-[2] py-3 rounded-2xl font-bold text-white transition-all active:scale-[0.98] disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#151D4A,#2E7D32)" }}>
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Tour Type"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Card ────────────────────────────────────────────────────────────────────
function TourTypeCard({ item, onView, onEdit, onDelete }) {
  return (
    <div
      className="group relative rounded-3xl overflow-hidden bg-white cursor-pointer shadow hover:shadow-xl transition-all duration-300"
      style={{ transition: "transform 0.25s, box-shadow 0.25s" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
      onClick={() => onView(item)}
    >
      <div className="h-28 flex items-center justify-center relative"
        style={{ background: "linear-gradient(135deg,#151D4A,#404569)" }}>
        <span className="text-4xl">🗂️</span>
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${item.active ? "bg-emerald-500 text-white" : "bg-amber-400 text-amber-900"}`}>
            {item.active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-slate-900 text-base leading-snug mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-slate-400 text-xs mb-3">/{item.slug} · order {item.order ?? 0}</p>
        {item.description && (
          <p className="text-slate-500 text-sm line-clamp-2 mb-3">{item.description}</p>
        )}
        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          <button onClick={() => onEdit(item)}
            className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition">Edit</button>
          <button onClick={() => onDelete(item._id)}
            className="flex-1 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TourTypes() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${ENV.BASE_URL}/admin/tour-types`, {
        headers: { Authorization: token },
      });
      setItems(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch {
      toast.error("Failed to load tour types");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tour type? Tours using it must be reassigned first.")) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${ENV.BASE_URL}/admin/tour-types/${id}`, {
        headers: { Authorization: token },
      });
      toast.success("Tour type deleted");
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  const filtered = items.filter(i =>
    i.name?.toLowerCase().includes(search.toLowerCase()) ||
    i.description?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total:    items.length,
    active:   items.filter(i => i.active).length,
    inactive: items.filter(i => !i.active).length,
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center" style={{ fontFamily: "'Outfit',sans-serif" }}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500">Loading tour types…</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');`}</style>
      <div className="min-h-screen bg-slate-50 p-4 md:p-8" style={{ fontFamily: "'Outfit',sans-serif" }}>
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tour Types</h1>
              <p className="text-slate-400 mt-0.5 text-sm">Manage homepage categories (Pakistan Tours, Honeymoon, etc.)</p>
            </div>
            <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 text-white px-5 py-3 rounded-2xl font-semibold transition-all active:scale-95 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #151D4A 0%, #404569 100%)",
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(21, 29, 74, 0.30)",
                }}
            >
              <span className="text-lg">+</span>
              Add Tour Type
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total", value: stats.total, color: "#151D4A", bg: "#f0fdf4" },
              { label: "Active", value: stats.active, color: "#10b981", bg: "#ecfdf5" },
              { label: "Inactive", value: stats.inactive, color: "#94a3b8", bg: "#f8fafc" },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4 flex items-center gap-3" style={{ background: s.bg }}>
                <span className="text-2xl font-black" style={{ color: s.color }}>{s.value}</span>
                <span className="text-sm font-medium" style={{ color: s.color }}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="relative mb-8">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or description…"
              className="w-full !pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition" />
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center shadow">
              <div className="text-5xl mb-4">🗂️</div>
              <p className="text-slate-500 text-lg font-medium">No tour types found</p>
              <p className="text-slate-400 text-sm mt-1">Add your first tour type to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map(item => (
                <TourTypeCard
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