import { useState } from "react";

function HomePage({ greeting, stats = [], reports = [], setReports }) {
  const [search, setSearch] = useState("");
  const [openDetail, setOpenDetail] = useState(null);

  // 🔍 SEARCH FIX
  const filteredReports = reports.filter((r) => {
    const keyword = search.trim().toLowerCase();

    return (
      (r.title || "").toLowerCase().includes(keyword) ||
      (r.status || "").toLowerCase().includes(keyword) ||
      (r.place || "").toLowerCase().includes(keyword) ||
      (r.date || "").toLowerCase().includes(keyword)
    );
  });

  // 🗑 DELETE REPORT
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Hapus laporan ini?");
    if (!confirmDelete) return;

    const updated = reports.filter((r, index) => index !== id);
    setReports(updated);

    if (openDetail === id) setOpenDetail(null);
  };

  return (
    <section className="screen">

      {/* HEADER */}
      <header className="header-block">
        <div className="logo">ADUIN</div>
        <h2>{greeting}</h2>
      </header>

      {/* STATS (AMAN MESKIPUN KOSONG) */}
      <div className="stats-grid">
        {stats.map((item) => (
          <article key={item.label} className="card stat">
            <p>{item.label}</p>
            <strong>{item.value ?? 0}</strong>
          </article>
        ))}
      </div>

      {/* REPORT LIST */}
      <section className="report-list">

        {/* TOP */}
        <div className="report-top">
          <h3>Riwayat Laporan</h3>

          <div className="search-box">
            🔍
            <input
              type="text"
              placeholder="Cari laporan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* HEADER */}
        <div className="report-head">
          <span>Judul Laporan</span>
          <span>Status</span>
        </div>

        {/* LIST */}
        {filteredReports.length > 0 ? (
          filteredReports.map((r, i) => (
            <article key={i} className="card report">

              {/* MAIN INFO */}
              <div>
                <strong>{r.title}</strong>

                <p>
                  {r.place || "Belum ada lokasi"} • {r.date || "Belum ada tanggal"}
                </p>
              </div>

              {/* STATUS */}
              <span className={`status-pill ${r.status?.toLowerCase()}`}>
                {r.status}
              </span>

              {/* ACTION BUTTONS */}
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>

                <button
                  onClick={() =>
                    setOpenDetail(openDetail === i ? null : i)
                  }
                >
                  Detail
                </button>

                <button
                  onClick={() => handleDelete(i)}
                  style={{ color: "red" }}
                >
                  Hapus
                </button>
              </div>

              {/* DETAIL SECTION */}
              {openDetail === i && (
                <div className="report-detail" style={{ marginTop: "10px" }}>
                  <hr />

                  <p><b>Alamat:</b> {r.place || "-"}</p>
                  <p><b>Tanggal:</b> {r.date || "-"}</p>
                  <p><b>Status:</b> {r.status || "-"}</p>

                  {/* kalau belum ada isi detail */}
                  {r.detail ? (
                    <p><b>Detail:</b> {r.detail}</p>
                  ) : (
                    <p style={{ color: "gray" }}>
                      Belum ada detail laporan
                    </p>
                  )}
                </div>
              )}

            </article>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Tidak ada hasil
          </p>
        )}

      </section>
    </section>
  );
}

export default HomePage;