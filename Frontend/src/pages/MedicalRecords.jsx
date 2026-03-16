import React, { useEffect, useMemo, useRef, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import apiClient from '../api/apiClient';
import useDebounce from '../hooks/useDebounce';

const DEFAULT_LIMIT = 10;

function validateRecord(input) {
  const errors = {};
  if (!input.patientId?.trim()) errors.patientId = 'Patient ID is required';
  if (!input.doctorId?.trim()) errors.doctorId = 'Doctor ID is required';
  if (!input.diagnosis?.trim()) errors.diagnosis = 'Diagnosis is required';
  if (!input.prescription?.trim()) errors.prescription = 'Prescription is required';
  return errors;
}

const emptyForm = {
  patientId: '',
  doctorId: '',
  diagnosis: '',
  prescription: '',
  notes: ''
};

export default function MedicalRecords() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(DEFAULT_LIMIT);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const [mode, setMode] = useState('create'); // create | edit
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const diagnosisRef = useRef(null);

  const filteredItems = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return items;
    return items.filter((r) => {
      const hay = [
        r.diagnosis,
        r.prescription,
        r.notes,
        r.patientId,
        r.doctorId
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [items, debouncedSearch]);

  async function fetchPage(nextPage) {
    setLoading(true);
    setError('');
    try {
      const res = await apiClient.get('/records', {
        params: { page: nextPage, limit }
      });
      setItems(res.data.data || []);
      setPage(res.data.page || nextPage);
      setTotalPages(res.data.totalPages || 1);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load medical records');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mode === 'edit' && diagnosisRef.current) {
      diagnosisRef.current.focus();
    }
  }, [mode]);

  function startCreate() {
    setMode('create');
    setEditingId(null);
    setForm(emptyForm);
    setFormErrors({});
  }

  function startEdit(record) {
    setMode('edit');
    setEditingId(record._id);
    setForm({
      patientId: record.patientId || '',
      doctorId: record.doctorId || '',
      diagnosis: record.diagnosis || '',
      prescription: record.prescription || '',
      notes: record.notes || ''
    });
    setFormErrors({});
  }

  async function submitForm(e) {
    e.preventDefault();
    const errors = validateRecord(form);
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    setLoading(true);
    setError('');
    try {
      if (mode === 'create') {
        await apiClient.post('/records', form);
      } else {
        await apiClient.patch(`/records/${editingId}`, form);
      }
      await fetchPage(page);
      startCreate();
    } catch (e2) {
      setError(e2?.response?.data?.message || 'Failed to save medical record');
    } finally {
      setLoading(false);
    }
  }

  async function deleteRecord(id) {
    const ok = window.confirm('Delete this record? This cannot be undone.');
    if (!ok) return;

    setLoading(true);
    setError('');
    try {
      await apiClient.delete(`/records/${id}`);
      await fetchPage(page);
      if (editingId === id) startCreate();
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to delete medical record');
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-display font-bold text-slate-900">Medical Records</h1>
            <p className="text-slate-500">Create, update, and manage patient medical records.</p>
          </div>

          <div className="flex gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search diagnosis, notes, IDs..."
              className="w-full md:w-80 bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10"
            />
            <button
              onClick={startCreate}
              className="shrink-0 bg-slate-900 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              New
            </button>
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-semibold">
            {error}
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                {mode === 'create' ? 'Create record' : 'Edit record'}
              </h2>
              {mode === 'edit' ? (
                <button
                  onClick={startCreate}
                  className="text-sm font-bold text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
              ) : null}
            </div>

            <form onSubmit={submitForm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Patient ID</label>
                <input
                  value={form.patientId}
                  onChange={(e) => setForm((p) => ({ ...p, patientId: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10"
                  placeholder="Mongo ObjectId"
                />
                {formErrors.patientId ? (
                  <p className="text-xs text-red-600 font-semibold mt-1">{formErrors.patientId}</p>
                ) : null}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Doctor ID</label>
                <input
                  value={form.doctorId}
                  onChange={(e) => setForm((p) => ({ ...p, doctorId: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10"
                  placeholder="Mongo ObjectId"
                />
                {formErrors.doctorId ? (
                  <p className="text-xs text-red-600 font-semibold mt-1">{formErrors.doctorId}</p>
                ) : null}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Diagnosis</label>
                <input
                  ref={diagnosisRef}
                  value={form.diagnosis}
                  onChange={(e) => setForm((p) => ({ ...p, diagnosis: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10"
                />
                {formErrors.diagnosis ? (
                  <p className="text-xs text-red-600 font-semibold mt-1">{formErrors.diagnosis}</p>
                ) : null}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Prescription</label>
                <input
                  value={form.prescription}
                  onChange={(e) => setForm((p) => ({ ...p, prescription: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10"
                />
                {formErrors.prescription ? (
                  <p className="text-xs text-red-600 font-semibold mt-1">{formErrors.prescription}</p>
                ) : null}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10 min-h-[110px]"
                  placeholder="Optional"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-60"
              >
                {mode === 'create' ? 'Create' : 'Save changes'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-lg font-bold text-slate-900">Records</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchPage(Math.max(1, page - 1))}
                  disabled={loading || page <= 1}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-sm font-semibold text-slate-600">
                  Page {page} / {totalPages}
                </span>
                <button
                  onClick={() => fetchPage(Math.min(totalPages, page + 1))}
                  disabled={loading || page >= totalPages}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-sm text-slate-500">Loading…</div>
            ) : filteredItems.length === 0 ? (
              <div className="text-sm text-slate-500">No records found.</div>
            ) : (
              <div className="space-y-3">
                {filteredItems.map((r) => (
                  <div
                    key={r._id}
                    className={`border rounded-2xl p-4 transition-colors ${
                      editingId === r._id ? 'border-primary-300 bg-primary-50/30' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900">{r.diagnosis}</p>
                        <p className="text-xs text-slate-500">
                          <span className="font-bold">Patient</span>: {String(r.patientId)} ·{' '}
                          <span className="font-bold">Doctor</span>: {String(r.doctorId)}
                        </p>
                        <p className="text-xs text-slate-600">
                          <span className="font-bold">Rx</span>: {r.prescription}
                        </p>
                        {r.notes ? <p className="text-xs text-slate-500">{r.notes}</p> : null}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(r)}
                          className="px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteRecord(r._id)}
                          className="px-3 py-2 rounded-lg border border-red-200 text-red-700 bg-red-50 text-xs font-bold hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

