import React from 'react';

function Item({ item, onToggleStatus, onDelete, onEdit }) {
  // Format mata uang Rupiah
  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className={`salon-item ${item.isCompleted ? 'completed' : 'pending'}`}>
      <div className="item-info">
        {/* TAMBAHAN GONG: Badge Status yang Jelas */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <h3 style={{ margin: 0 }}>{item.customerName}</h3>
          <span className={`status-badge ${item.isCompleted ? 'badge-success' : 'badge-warning'}`}>
            {item.isCompleted ? '✓ Selesai' : '⏳ Menunggu'}
          </span>
        </div>
        
        <p className="service-tag">{item.serviceName}</p>
        <p className="price-tag">{formatRupiah(item.price)}</p>
        <span className="date-tag">⏰ {item.bookingDate}</span>
      </div>

      <div className="item-actions">
        {/* PERBAIKAN GONG: Tombol status disesuaikan dengan kondisi aslinya */}
        <button 
          onClick={() => onToggleStatus(item.id)} 
          className={`btn-status ${item.isCompleted ? 'btn-completed-status' : 'btn-pending-status'}`}
        >
          {item.isCompleted ? '↩️ Batalkan Selesai' : '✅ Tandai Selesai'}
        </button>

        <div style={{ display: 'flex', gap: '5px', width: '100%' }}>
          <button onClick={() => onEdit(item)} className="btn-edit" style={{ flex: 1 }}>
            ✏️ Edit
          </button>
          <button onClick={() => onDelete(item.id)} className="btn-delete" style={{ flex: 1 }}>
            🗑️ Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;