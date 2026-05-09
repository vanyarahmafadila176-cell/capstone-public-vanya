import { useState } from "react";

const initialForm = {
  reporterName: "",
  phone: "",
  category: "",
  address: "",
  title: "",
  description: "",
  file: null,
  filePreview: "",
};

function ReportPage({ onSubmit, onBack }) {
  const [form, setForm] = useState(initialForm);

  const isComplete =
    form.reporterName.trim() &&
    form.phone.trim() &&
    form.category.trim() &&
    form.address.trim() &&
    form.title.trim() &&
    form.description.trim() &&
    form.file;

  // 📷 HANDLE FILE + PREVIEW IMAGE
  const handleFile = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        file,
        filePreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isComplete) return;

    onSubmit({
      reporterName: form.reporterName,
      phone: form.phone,
      category: form.category,
      title: form.title,
      place: form.address,
      description: form.description,
      image: form.filePreview, // 🔥 kirim gambar ke homepage
      date: new Date().toLocaleDateString(),
      status: "Diproses",
    });

    setForm(initialForm);
  };

  return (
    <form className="screen" onSubmit={handleSubmit}>
      {/* HEADER */}
      <div className="top-row">
        <button className="icon-btn" type="button" onClick={onBack}>
          {"<"}
        </button>
        <h2>Buat Laporan</h2>
      </div>

      <div className="report-table">

        {/* NAMA */}
        <div className="table-row">
          <label>Nama Pelapor</label>
          <input
            className="field"
            value={form.reporterName}
            onChange={(e) =>
              setForm({ ...form, reporterName: e.target.value })
            }
            required
          />
        </div>

        {/* TELEPON */}
        <div className="table-row">
          <label>Nomor Telepon</label>
          <input
            className="field"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            required
          />
        </div>

        {/* ALAMAT */}
        <div className="table-row">
          <label>Alamat Lengkap</label>
          <input
            className="field"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            required
          />
        </div>

        {/* 🔥 JUDUL BARU */}
        <div className="table-row">
          <label>Judul Laporan</label>
          <input
            className="field"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />
        </div>

        {/* KATEGORI */}
        <div className="table-row">
          <label>Kategori</label>
          <select
            className="field"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            required
          >
            <option value="">Pilih kategori</option>
            <option value="Infrastruktur">Infrastruktur</option>
            <option value="Kebersihan">Kebersihan</option>
            <option value="Keamanan">Keamanan</option>
            <option value="Layanan Publik">Layanan Publik</option>
          </select>
        </div>

        {/* DESKRIPSI */}
        <div className="table-row textarea-row">
          <label>Deskripsi</label>
          <textarea
            className="field area"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />
        </div>

        {/* 📷 UPLOAD + PREVIEW GAMBAR */}
        <div className="table-row">
          <label>Dokumentasi</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            required
          />
        </div>

        {form.filePreview && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={form.filePreview}
              alt="preview"
              style={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        )}
      </div>

      {/* SUBMIT */}
      <button className="btn primary full" type="submit" disabled={!isComplete}>
        Kirim Laporan
      </button>
    </form>
  );
}

export default ReportPage;