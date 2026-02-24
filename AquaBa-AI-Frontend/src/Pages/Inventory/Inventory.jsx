import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────
// API SERVICE LAYER (swap BASE_URL for real backend)
// ─────────────────────────────────────────────
const BASE_URL = "https://your-api.com/api"; // ← Replace with your real backend URL

const apiService = {
  // INVENTORY CRUD
  getInventory: async () => {
    try {
      // const res = await fetch(`${BASE_URL}/inventory`);
      // return await res.json();
      return JSON.parse(localStorage.getItem("aquaba_inventory") || "[]");
    } catch (e) { return []; }
  },
  createInventory: async (item) => {
    // const res = await fetch(`${BASE_URL}/inventory`, 
    // { method: "POST", 
    // headers: {"Content-Type":"application/json"}, 
    // body: JSON.stringify(item) });
    // return await res.json();

    const newItem = { ...item, 
                        id: `INV-${Date.now()}`, 
                        createdAt: new Date().toISOString() };

    const all = JSON.parse(localStorage.getItem("aquaba_inventory") || "[]");
    localStorage.setItem("aquaba_inventory", JSON.stringify([...all, newItem]));
    return newItem;
  },


  updateInventory: async (id, item) => {
    // const res = await fetch(`${BASE_URL}/inventory/${id}`, { method: "PUT", headers: {"Content-Type":"application/json"}, body: JSON.stringify(item) });
    // return await res.json();
    const all = JSON.parse(localStorage.getItem("aquaba_inventory") || "[]");
    const updated = all.map(i => i.id === id ? { ...i, ...item } : i);
    localStorage.setItem("aquaba_inventory", JSON.stringify(updated));
    return updated.find(i => i.id === id);
  },


  deleteInventory: async (id) => {
    // await fetch(`${BASE_URL}/inventory/${id}`, { method: "DELETE" });
    const all = JSON.parse(localStorage.getItem("aquaba_inventory") || "[]");
    localStorage.setItem("aquaba_inventory", JSON.stringify(all.filter(i => i.id !== id)));
  },

  // ALERTS CRUD
  getAlerts: async () => {
    return JSON.parse(localStorage.getItem("aquaba_alerts") || "[]");
  },

  resolveAlert: async (id) => {
    const all = JSON.parse(localStorage.getItem("aquaba_alerts") || "[]");
    const updated = all.map(a => a.id === id ? { ...a, resolved: true } : a);
    localStorage.setItem("aquaba_alerts", JSON.stringify(updated));
  },

  // ACTIVITY
  getActivity: async () => {
    return JSON.parse(localStorage.getItem("aquaba_activity") || "[]");
  },

  logActivity: async (entry) => {
    const all = JSON.parse(localStorage.getItem("aquaba_activity") || "[]");
    const newEntry = { ...entry, id: Date.now(), time: new Date().toISOString() };
    localStorage.setItem("aquaba_activity", JSON.stringify([newEntry, ...all].slice(0, 20)));
    return newEntry;
  },

  // STORAGE LOCATIONS CRUD
  getLocations: async () => {
    return JSON.parse(localStorage.getItem("aquaba_locations") || "[]");
  },

  
  createLocation: async (loc) => {
    const newLoc = { ...loc, id: `LOC-${Date.now()}` };
    const all = JSON.parse(localStorage.getItem("aquaba_locations") || "[]");
    localStorage.setItem("aquaba_locations", JSON.stringify([...all, newLoc]));
    return newLoc;
  },
  deleteLocation: async (id) => {
    const all = JSON.parse(localStorage.getItem("aquaba_locations") || "[]");
    localStorage.setItem("aquaba_locations", JSON.stringify(all.filter(l => l.id !== id)));
  },
};

// ─────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────
const seedData = () => {
  if (!localStorage.getItem("aquaba_seeded")) {
    const inventory = [
      { id: "INV-001", name: "Atlantic Salmon", batch: "KY-90123", quantity: 2450, unit: "kg", expiryDate: "2026-02-25", supplier: "Ocean Fresh Inc.", location: "Freezer 1", status: "normal", createdAt: new Date().toISOString() },
      { id: "INV-002", name: "Tuna (Bluefin)", batch: "RAB-00123", quantity: 3200, unit: "kg", expiryDate: "2026-02-22", supplier: "Blue Ocean Co.", location: "Freezer 2", status: "high-risk", createdAt: new Date().toISOString() },
      { id: "INV-003", name: "Cod", batch: "CD-30045", quantity: 1800, unit: "kg", expiryDate: "2026-03-10", supplier: "Arctic Catch", location: "Cold Storage A", status: "normal", createdAt: new Date().toISOString() },
      { id: "INV-004", name: "Shrimp (King)", batch: "CD-00456", quantity: 5000, unit: "kg", expiryDate: "2026-04-15", supplier: "Ocean Fresh Inc.", location: "Cold Storage B", status: "normal", createdAt: new Date().toISOString() },
    ];
    const alerts = [
      { id: 1, type: "expiry", message: "Inventory approaching expiry", count: 5, severity: "warning", time: "2 hours ago", resolved: false },
      { id: 2, type: "expired", message: "Inventory has expired", count: 6, severity: "danger", time: "2 hours ago", resolved: false },
      { id: 3, type: "low", message: "Low inventory quantity", count: 5, severity: "warning", time: "2 hours ago", resolved: false },
    ];
    const activity = [
      { id: 1, type: "add", message: "New batch added: #KY-90123", meta: "By Jane Smith", time: new Date(Date.now() - 7200000).toISOString() },
      { id: 2, type: "alert", message: "High risk alert resolved: RAB-00123", meta: "By John Doe", time: new Date(Date.now() - 18000000).toISOString() },
      { id: 3, type: "delivery", message: "Delivery received from Ocean Fresh Inc.", meta: "500 kg Tuna", time: new Date(Date.now() - 18000000).toISOString() },
      { id: 4, type: "report", message: "Report generated: Monthly Inventory Summary", meta: "By System", time: new Date(Date.now() - 86400000).toISOString() },
      { id: 5, type: "check", message: "Quality check passed: Batch #CD-00456", meta: "By Inspector A", time: new Date(Date.now() - 86400000).toISOString() },
    ];
    const locations = [
      { id: "LOC-001", name: "Freezer 1 (Zone A)", quantity: 2450, unit: "kg", temp: "Optimal Temperature", status: "optimal" },
      { id: "LOC-002", name: "Freezer 2 (Zone B)", quantity: 3200, unit: "kg", temp: "Optimal Temperature", status: "optimal" },
      { id: "LOC-003", name: "Cold Storage A", quantity: 1800, unit: "kg", temp: "Warning Temp", status: "warning" },
      { id: "LOC-004", name: "Cold Storage B", quantity: 5000, unit: "kg", temp: "Normal Range", status: "optimal" },
    ];
    localStorage.setItem("aquaba_inventory", JSON.stringify(inventory));
    localStorage.setItem("aquaba_alerts", JSON.stringify(alerts));
    localStorage.setItem("aquaba_activity", JSON.stringify(activity));
    localStorage.setItem("aquaba_locations", JSON.stringify(locations));
    localStorage.setItem("aquaba_seeded", "1");
  }
};

// ─────────────────────────────────────────────
// ICONS (SVG inline)
// ─────────────────────────────────────────────
const Icon = {
  menu: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  user: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  inventory: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h10M7 12h6"/></svg>,
  alert: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  chart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  recycle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>,
  plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  x: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  edit: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  trend: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  dash: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  back: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  logout: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="red" stroke="red" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  loc: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  trade: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
};

// ─────────────────────────────────────────────
// REUSABLE COMPONENTS
// ─────────────────────────────────────────────

function StatCard({ icon, label, value, sub, linkText, accent, onLink }) {
  const colors = { blue: "#007BFF", red: "#e53935", green: "#28A745", orange: "#f57c00", gray: "#666" };
  const c = colors[accent] || colors.blue;
  return (
    <div style={{ background: "#fff", borderRadius: 0, padding: "20px 20px 18px", borderBottom: "1px solid #eee", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 13, color: "#666", fontWeight: 500, marginBottom: 6 }}>{label}</div>
          {value ? (
            <>
              <div style={{ fontSize: 34, fontWeight: 800, color: c, lineHeight: 1.1, fontFamily: "'Barlow', sans-serif" }}>{value}</div>
              {sub && <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{sub}</div>}
              {linkText && <button onClick={onLink} style={{ background: "none", border: "none", color: c, fontSize: 12, cursor: "pointer", padding: 0, marginTop: 6, textDecoration: "underline", textAlign: "left" }}>{linkText}</button>}
            </>
          ) : (
            <div style={{ fontSize: 13, color: "#aaa", marginTop: 8, fontStyle: "italic" }}>No Data Available</div>
          )}
        </div>
        <div style={{ color: "#bbb" }}>{icon}</div>
      </div>
    </div>
  );
}

function AlertRow({ alert, onCheck }) {
  const colors = { warning: { bg: "#fff8e1", border: "#f57c00", icon: "#f57c00" }, danger: { bg: "#ffebee", border: "#e53935", icon: "#e53935" } };
  const style = colors[alert.severity] || colors.warning;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: style.bg, borderLeft: `4px solid ${style.border}`, borderRadius: 4, marginBottom: 10 }}>
      <div style={{ color: style.icon, flexShrink: 0 }}><Icon.alert /></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#333" }}>{alert.message}</div>
        <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{alert.count} items · {alert.time}</div>
      </div>
      <button onClick={() => onCheck(alert.id)} style={{ background: "#f57c00", color: "#fff", border: "none", borderRadius: 4, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>Check Items</button>
    </div>
  );
}

function ActivityItem({ item }) {
  const typeConfig = {
    add:      { icon: "+", color: "#1a73e8", bg: "#e3f2fd" },
    alert:    { icon: "!", color: "#e53935", bg: "#ffebee" },
    delivery: { icon: "↓", color: "#00897b", bg: "#e0f2f1" },
    report:   { icon: "📄", color: "#555", bg: "#f5f5f5" },
    check:    { icon: "✓", color: "#00897b", bg: "#e0f2f1" },
  };
  const cfg = typeConfig[item.type] || typeConfig.report;
  const t = new Date(item.time);
  const timeStr = isNaN(t) ? "Recently" : t.toLocaleDateString() === new Date().toLocaleDateString() ? `${Math.round((Date.now() - t) / 3600000)} hours ago` : "Yesterday";
  return (
    <div style={{ display: "flex", gap: 12, paddingBottom: 16, borderBottom: "1px solid #f0f0f0", marginBottom: 12 }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: cfg.bg, color: cfg.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{cfg.icon}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{item.message}</div>
        <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{timeStr} · {item.meta}</div>
      </div>
    </div>
  );
}

function LocationCard({ loc, onDelete }) {
  const statusColors = { optimal: "#00897b", warning: "#f57c00", danger: "#e53935" };
  const c = statusColors[loc.status] || statusColors.optimal;
  return (
    <div style={{ padding: "18px 16px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#1a73e8", fontFamily: "'Barlow', sans-serif" }}>{loc.quantity?.toLocaleString()} {loc.unit}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#333", marginTop: 2 }}>{loc.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          <span style={{ fontSize: 12, color: c }}>{loc.temp}</span>
        </div>
      </div>
      <button onClick={() => onDelete(loc.id)} style={{ background: "none", border: "1px solid #eee", borderRadius: 4, padding: "4px 8px", cursor: "pointer", color: "#bbb", fontSize: 11 }}>Remove</button>
    </div>
  );
}

// Modal for Add/Edit Inventory
function InventoryModal({ item, onSave, onClose }) {
  const [form, setForm] = useState(item || { name: "", batch: "", quantity: "", unit: "kg", expiryDate: "", supplier: "", location: "", status: "normal" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inp = (label, key, type = "text", opts) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 4, fontWeight: 500 }}>{label}</label>
      {opts ? (
        <select value={form[key]} onChange={e => set(key, e.target.value)} style={inputStyle}>
          {opts.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} style={inputStyle} />
      )}
    </div>
  );
  const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 12, width: "100%", maxWidth: 440, padding: 28, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#333" }}>{item ? "Edit Inventory" : "Add Inventory"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#888" }}><Icon.x /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
          <div style={{ gridColumn: "1/-1" }}>{inp("Product Name *", "name")}</div>
          {inp("Batch ID", "batch")}
          {inp("Quantity", "quantity", "number")}
          {inp("Unit", "unit", "text", ["kg", "tonnes", "lbs", "pieces"])}
          {inp("Supply Date", "supplyDate", "date")}
          {inp("Qty Sold", "qtySold", "number")}
          {inp("Qty Remaining", "qtyRemaining", "number")}
          <div style={{ gridColumn: "1/-1" }}>{inp("Supplier", "supplier")}</div>
          <div style={{ gridColumn: "1/-1" }}>{inp("Storage Location", "location")}</div>
          {inp("Status", "status", "text", ["stocked", "out-of-stock"])}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", background: "#f5f5f5", border: "none", borderRadius: 7, cursor: "pointer", fontWeight: 600, fontSize: 14 }}>Cancel</button>
          <button onClick={() => { if (!form.name.trim()) return alert("Name required"); onSave(form); }} style={{ flex: 2, padding: "11px", background: "#1a73e8", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
            {item ? "Save Changes" : "Add to Inventory"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function AquaBa() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [inventory, setInventory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [activity, setActivity] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | "add" | {item}
  const [editItem, setEditItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const notify = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const loadAll = useCallback(async () => {
    setLoading(true);
    const [inv, alr, act, loc] = await Promise.all([
      apiService.getInventory(), apiService.getAlerts(),
      apiService.getActivity(), apiService.getLocations()
    ]);
    setInventory(inv); setAlerts(alr); setActivity(act); setLocations(loc);
    setLoading(false);
  }, []);

  useEffect(() => { seedData(); loadAll(); }, [loadAll]);

  // Stats
  const totalInventoryKg = inventory.reduce((s, i) => s + (Number(i.quantity) || 0), 0);
  const highRiskCount = inventory.filter(i => i.status === "high-risk").length;
  const forecastKg = Math.round(totalInventoryKg * 0.7);
  const wasteRisk = inventory.length > 0 ? ((inventory.filter(i => i.status === "expired").length / inventory.length) * 100).toFixed(1) : null;
  const activeAlerts = alerts.filter(a => !a.resolved);

  const handleAddInventory = async (form) => {
    const newItem = await apiService.createInventory(form);
    await apiService.logActivity({ type: "add", message: `New batch added: #${newItem.batch || newItem.id}`, meta: `By Farmer` });
    await loadAll();
    setModal(null);
    notify("Inventory item added!");
  };

  const handleEditInventory = async (form) => {
    await apiService.updateInventory(editItem.id, form);
    await apiService.logActivity({ type: "report", message: `Inventory updated: ${form.name}`, meta: "By Farmer" });
    await loadAll();
    setModal(null); setEditItem(null);
    notify("Item updated!");
  };

  const handleDeleteInventory = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    await apiService.deleteInventory(id);
    await apiService.logActivity({ type: "report", message: `Inventory deleted: ${name}`, meta: "By Farmer" });
    await loadAll();
    notify("Item deleted.", "info");
  };

  const handleResolveAlert = async (id) => {
    await apiService.resolveAlert(id);
    await loadAll();
    notify("Alert resolved!");
  };

  const handleDeleteLocation = async (id) => {
    await apiService.deleteLocation(id);
    await loadAll();
    notify("Location removed.", "info");
  };

  const handleDownloadReport = () => {
    const csv = ["Name,Batch,Quantity,Unit,Supplier,Location,Status,Created",
      ...inventory.map(i => `${i.name},${i.batch},${i.quantity},${i.unit},${i.supplier},${i.location},${i.status},${i.createdAt}`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "aquaba_inventory.csv"; a.click();
    notify("Report downloaded!");
  };

  const handleBackToDashboard = () => setActiveTab("dashboard");

  const tabs = [
    { id: "dashboard", icon: <Icon.dash />, label: "Dashboard" },
    { id: "inventory", icon: <Icon.inventory />, label: "Inventory" },
    { id: "alerts", icon: <Icon.bell />, label: "Alerts" },
    { id: "forecast", icon: <Icon.chart />, label: "Forecast" },
    { id: "trade", icon: <Icon.trade />, label: "Trade" },
  ];

  // ── DASHBOARD TAB ──
  const DashboardView = () => (
    <div>
      {/* Stat Cards */}
      <StatCard icon={<Icon.inventory />} label="Total Inventory" value={totalInventoryKg > 0 ? `${totalInventoryKg.toLocaleString()} kg` : null} sub="Current Stock across all locations" accent="blue" linkText={totalInventoryKg > 0 ? "View inventory breakdown" : "add new item"} onLink={() => setActiveTab("inventory")} />
      <StatCard icon={<Icon.alert />} label="High-Risk Items" value={highRiskCount > 0 ? `${highRiskCount} Batches` : null} sub="Items at risk of spoilage" accent="red" linkText={highRiskCount > 0 ? "View all alerts" : null} onLink={() => setActiveTab("alerts")} />
      <StatCard icon={<Icon.chart />} label="Expected Demand" value={forecastKg > 0 ? `${forecastKg.toLocaleString()} kg` : null} sub="Next 7 days forecast" accent="blue" linkText={forecastKg > 0 ? "Explore forecast details" : null} />
      <StatCard icon={<Icon.recycle />} label="Estimated Waste Risk" value={wasteRisk !== null && Number(wasteRisk) > 0 ? `${wasteRisk}%` : null} sub="Potential loss in value over next 30 days" accent="orange" linkText={wasteRisk !== null && Number(wasteRisk) > 0 ? "Analyse waste report" : null} />

      {/* Spoilage Alerts */}
      <div style={{ background: "#fff", margin: "12px 0 0", padding: "20px 16px" }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#222", marginBottom: 16 }}>Spoilage Alerts</h2>
        {activeAlerts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px 0", color: "#aaa" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}><Icon.bell /></div>
            <div style={{ fontWeight: 600, color: "#555", fontSize: 15 }}>No Active Alerts</div>
            <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>All inventory items are within safe parameters</div>
          </div>
        ) : (
          <>
            {activeAlerts.map(a => <AlertRow key={a.id} alert={a} onCheck={handleResolveAlert} />)}
            <button onClick={() => setActiveTab("alerts")} style={{ background: "none", border: "none", color: "#1a73e8", fontSize: 13, cursor: "pointer", marginTop: 6, padding: 0 }}>View all alerts →</button>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ background: "#fff", margin: "12px 0 0", padding: "20px 16px" }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#222", marginBottom: 14 }}>Quick Actions</h2>
        <button onClick={() => setModal("add")} style={{ width: "100%", padding: "13px", background: "#1a73e8", color: "#fff", border: "none", borderRadius: 7, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
          <Icon.plus /> Add Inventory
        </button>
        <button onClick={() => setActiveTab("alerts")} style={{ width: "100%", padding: "12px", background: "#f5f5f5", border: "none", borderRadius: 7, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10, color: "#333" }}>
          <Icon.bell /> View Alerts {activeAlerts.length > 0 && <span style={{ background: "#e53935", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{activeAlerts.length}</span>}
        </button>
        <button onClick={handleDownloadReport} style={{ width: "100%", padding: "12px", background: "#f5f5f5", border: "none", borderRadius: 7, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#333" }}>
          <Icon.download /> Download Report
        </button>
      </div>

      {/* Recent Activity */}
      <div style={{ background: "#fff", margin: "12px 0 0", padding: "20px 16px" }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#222", marginBottom: 16 }}>Recent Activity</h2>
        {activity.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px 0", color: "#aaa" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}><Icon.bell /></div>
            <div style={{ fontWeight: 600, color: "#555", fontSize: 15 }}>No Recent Activity</div>
            <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>Activity will appear here as you use the system</div>
          </div>
        ) : activity.slice(0, 5).map(a => <ActivityItem key={a.id} item={a} />)}
      </div>

      {/* Key Metrics */}
      <div style={{ background: "#fff", margin: "12px 0 0", padding: "20px 16px" }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#222", marginBottom: 14 }}>Key Metrics</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Total Batches", value: inventory.length || 0 },
            { label: "Active Suppliers", value: [...new Set(inventory.map(i => i.supplier).filter(Boolean))].length },
            { label: "Quality Rate", value: inventory.length > 0 ? `${(((inventory.length - inventory.filter(i => i.status === "expired").length) / inventory.length) * 100).toFixed(1)}%` : "–" },
            { label: "Avg. Turnover", value: inventory.length > 0 ? "3.2 days" : "–" },
          ].map(m => (
            <div key={m.label} style={{ background: "#f8f9fa", borderRadius: 8, padding: "14px 12px" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#333", fontFamily: "'Barlow', sans-serif" }}>{m.value}</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Storage Locations */}
      <div style={{ background: "#fff", margin: "12px 0 0", padding: "20px 16px" }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#222", marginBottom: 4 }}>Storage Locations Overview</h2>
        {locations.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px 0", color: "#aaa" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}><Icon.bell /></div>
            <div style={{ fontWeight: 600, color: "#555", fontSize: 15 }}>No Storage Locations</div>
            <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>Add storage locations to track inventory distribution</div>
          </div>
        ) : locations.map(loc => <LocationCard key={loc.id} loc={loc} onDelete={handleDeleteLocation} />)}
      </div>
    </div>
  );

  // ── INVENTORY TAB ──
  const InventoryView = () => (
    <div style={{ background: "#fff", minHeight: "100%" }}>
  
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between", borderBottom: "1px solid #eee" }}> 
        <h2 style={{ fontSize: 17, fontWeight: 700, color:"black"}}>All Inventory ({inventory.length})</h2>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%"}}> 
        
          <button  onClick={handleBackToDashboard} style={{ background: "#1a73e8", color: "#fff", border: "none", borderRadius: 6, padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <Icon.back /> Back
          </button>

          <button onClick={() => setModal("add")} style={{ background: "#1a73e8", color: "#fff", border: "none", borderRadius: 6, padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <Icon.plus /> Add
          </button>
          
          </div>
        
      </div>
      {inventory.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
          <div style={{ fontWeight: 600, color: "#555", fontSize: 16 }}>No inventory items</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Add your first item to get started</div>
          <button 
            onClick={() => setModal("add")} 
            style={{ marginTop: 16, background: "#1a73e8", 
            color: "#fff", border: "none", borderRadius: 7, 
            padding: "11px 22px", fontSize: 14, fontWeight: 700,
             cursor: "pointer" }}>
              + Add Inventory
            </button>
        </div>

           
      ) : inventory.map(item => {
        const statusColors = { normal: { bg: "#e8f5e9", text: "#2e7d32" }, "high-risk": { bg: "#fff3e0", text: "#e65100" }, expired: { bg: "#ffebee", text: "#c62828" } };
        const sc = statusColors[item.status] || statusColors.normal;
        return (
          <div key={item.id} style={{ padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#222" }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>#{item.batch} · {item.supplier}</div>
              </div>
              <span style={{ background: sc.bg, color: sc.text, fontSize: 11, padding: "3px 9px", borderRadius: 12, fontWeight: 600 }}>{item.status}</span>
            </div>
            
            <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: "#aaa" }}>Qty Stocked</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#1a73e8" }}>{Number(item.quantity).toLocaleString()} {item.unit}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: "#aaa" }}>Location</div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#333" }}>{item.location || "–"}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: "#aaa" }}>Qty Sold</div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#333" }}>{item.qtySold || 0} {item.unit}</div>
              </div> 

              <div>
                <div style={{ fontSize: 11, color: "#aaa" }}>Qty Remaining</div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#333" }}>{Number(item.quantity - item.qtySold || 0).toLocaleString() || "-"} {item.unit}</div>
              </div> 
            
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setEditItem(item); setModal("edit"); }} style={{ flex: 1, padding: "8px", background: "#e3f2fd", color: "#1a73e8", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><Icon.edit /> Edit</button>
              <button onClick={() => handleDeleteInventory(item.id, item.name)} style={{ flex: 1, padding: "8px", background: "#ffebee", color: "#e53935", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><Icon.trash /> Delete</button>
            </div>
          </div>
        );
      })}
    </div>

  );

  // ── ALERTS TAB ──
  const AlertsView = () => (
    <div style={{ background: "#fff", minHeight: "100%", padding: 16 }}>
      <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Alerts ({activeAlerts.length} active)</h2>
      {alerts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}>
          <Icon.bell />
          <div style={{ fontWeight: 600, color: "#555", marginTop: 12 }}>No Alerts</div>
        </div>
      ) : alerts.map(a => (
        <div key={a.id} style={{ opacity: a.resolved ? 0.7 : 1 }}>
          <AlertRow alert={a} onCheck={handleResolveAlert} />
        </div>
      ))}
    </div>
  );

  // ── FORECAST TAB ──
  const ForecastView = () => (
    <div style={{ background: "#fff", minHeight: "100%", padding: 20 }}>
      <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Demand Forecast</h2>
      <div style={{ background: "#f8f9ff", borderRadius: 10, padding: "20px 16px", marginBottom: 16, border: "1px solid #e8eaf6" }}>
        <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>Projected Demand (Next 7 Days)</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: "#1a73e8", fontFamily: "'Barlow', sans-serif" }}>{forecastKg.toLocaleString()} kg</div>
        <div style={{ height: 60, marginTop: 12, display: "flex", alignItems: "flex-end", gap: 6 }}>
          {[40, 65, 55, 80, 72, 90, 78].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: `rgba(26,115,232,${0.3 + h / 200})`, borderRadius: "3px 3px 0 0" }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <span key={d} style={{ fontSize: 10, color: "#aaa" }}>{d}</span>)}
        </div>
      </div>
      <div style={{ background: "#f9fbe7", borderRadius: 10, padding: 16, border: "1px solid #f0f4c3" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#558b2f", marginBottom: 6 }}>📊 AI Insight</div>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>Based on current trends, stock levels are projected to meet demand for the next 7 days. Consider replenishing Tuna and Salmon stocks within 5 days.</div>
      </div>
    </div>
  );

  // ── TRADE TAB ──
  const TradeView = () => (
    <div style={{ background: "#fff", minHeight: "100%", padding: 20 }}>
      <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Trade Overview</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {[
          { label: "Total Value", value: `₦${(totalInventoryKg * 1250).toLocaleString()}`, icon: "💰", color: "#1a73e8" },
          { label: "Active Suppliers", value: [...new Set(inventory.map(i => i.supplier).filter(Boolean))].length, icon: "🤝", color: "#00897b" },
          { label: "Pending Deliveries", value: "2", icon: "🚚", color: "#f57c00" },
          { label: "Export Ready", value: `${Math.round(totalInventoryKg * 0.3).toLocaleString()} kg`, icon: "🌍", color: "#8e24aa" },
        ].map(m => (
          <div key={m.label} style={{ background: "#f8f9fa", borderRadius: 10, padding: "18px 16px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 28 }}>{m.icon}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: m.color, fontFamily: "'Barlow', sans-serif" }}>{m.value}</div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>{m.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const views = { dashboard: <DashboardView />, inventory: <InventoryView />, alerts: <AlertsView />, forecast: <ForecastView />, trade: <TradeView /> };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0f2f5 !important; font-family: 'IBM Plex Sans', sans-serif; }
        button { font-family: 'IBM Plex Sans', sans-serif; }
        input, select { font-family: 'IBM Plex Sans', sans-serif; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #f0f0f0; } ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }
      `}</style>

      <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: "#f0f2f5", position: "relative" }}>
        {/* Header */}
        <div style={{ background: "#fff", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 100 }}>
      
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#555", padding: 0 }}><Icon.user /></button>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 20, color: "#1a73e8", letterSpacing: -0.5 }}>AquaBa</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#555", padding: 4 }}><Icon.menu /></button>
          
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ background: "#1a73e8", height: 3, animation: "none" }}>
            <div style={{ height: "100%", background: "#fff", width: "40%", animation: "slideUp 1s infinite" }} />
          </div>
        )}

        {/* Sidebar Overlay */}
        <div style={{ display:"flex", flexDirection:"column", justifyContent: "space-between" }}>
        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} 
              style={{ position: "fixed", 
              inset: 0, 
              background: "rgba(0,0,0,0.4)", 
              zIndex: 200, 
              animation: "fadeIn .2s ease" }}>

            <div onClick={e => e.stopPropagation()} style={{ width: 240, height: "100%", background: "#fff", padding: "20px 0", animation: "slideUp .25s ease" }}>
              <div style={{ padding: "12px 20px 24px", borderBottom: "1px solid #eee" }}>
                <div style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 22, color: "#1a73e8" }}>AquaBa</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Seafood Inventory Manager</div>
              </div>
              {tabs.map(t => (
                <button key={t.id} onClick={() => { setActiveTab(t.id); setSidebarOpen(false); }} style={{ width: "100%", padding: "14px 20px", background: activeTab === t.id ? "#e8f0fe" : "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, color: activeTab === t.id ? "#1a73e8" : "#555", fontWeight: activeTab === t.id ? 700 : 500, fontSize: 14, textAlign: "left" }}>
                  {t.icon} {t.label}
                </button>
              ))}
              
              <div style={{ display:"flex", flexDirection:"column"}}>
                  <div style={{ borderTop: "1px solid #eee", padding: "16px 20px", marginTop: "auto" }}>
                
                    <button 
                    onClick={handleDownloadReport} 
                    style={{ 
                    width: "100%", 
                    padding: "10px", 
                    background: "#f5f5f5", 
                    border: "none", 
                    borderRadius: 6, 
                    cursor: "pointer", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 8, 
                    fontSize: 13, 
                    color: "#555", 
                    fontWeight: 600 }}>
                  
                    <Icon.download /> Download Report
                    </button>
                </div>

              <div style={{ borderTop: "1px solid #eee", padding: "16px 20px", margin:"270px 0"}}>
                
                <button 
                    // onClick={handleLogout} 
                    style={{ 
                    width: "100%", 
                    padding: "10px", 
                    background: "#f5f5f5", 
                    border: "none", 
                    borderRadius: 6, 
                    cursor: "pointer", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    gap: 8, 
                    fontSize: 13, 
                    color: "red", 
                    fontWeight: 600 }}>
                  
                  <Icon.logout /> Logout
                </button>
              </div>
              </div>
              
              
            </div>

          </div>
      
        )}

        </div>

        {/* Main Content */}
        <div style={{ paddingBottom: 80, animation: "slideUp .3s ease" }}>
          {views[activeTab]}
        </div>

        {/* Bottom Nav */}
        <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "#fff", borderTop: "1px solid #eee", display: "flex", zIndex: 100 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ flex: 1, padding: "10px 0 12px", background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: activeTab === t.id ? "#1a73e8" : "#aaa", fontWeight: activeTab === t.id ? 700 : 400, transition: "color .15s" }}>
              {t.icon}
              <span style={{ fontSize: 10 }}>{t.label}</span>
            </button>
          ))}



        </div>

        {/* Modals */}
        {modal === "add" && <InventoryModal onSave={handleAddInventory} onClose={() => setModal(null)} />}
        {modal === "edit" && editItem && <InventoryModal item={editItem} onSave={handleEditInventory} onClose={() => { setModal(null); setEditItem(null); }} />}

        {/* Toast */}
        {toast && (
          <div style={{ position: "fixed", bottom: 90, left: "50%", transform: "translateX(-50%)", background: toast.type === "success" ? "#1a73e8" : toast.type === "info" ? "#555" : "#e53935", color: "#fff", padding: "11px 22px", borderRadius: 22, fontSize: 13, fontWeight: 600, zIndex: 9999, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", animation: "slideUp .25s ease", whiteSpace: "nowrap" }}>
            {toast.type === "success" ? "✓ " : "ℹ "}{toast.msg}
          </div>
        )}
      </div>
    </>
  );
}
