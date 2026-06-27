import React, { useState, useEffect } from 'react';

// 1. DAFTAR LAYANAN DAN HARGA OTOMATIS (MAPPING)
const SERVICE_PRICES = {
  'Haircut Premium': 75000,
  'Creambath & Spa': 120000,
  'Coloring / Hair Dye': 250000,
  'Manicure & Pedicure': 90000,
  'Facial Treatment': 150000
};

function FormInput({ onSave, editingItem, onCancelEdit }) {
  const [customerName, setCustomerName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');

  // 2. OTOMATISASI HARGA BERDASARKAN LAYANAN YANG DIPILIH
  useEffect(() => {
    if (serviceName && SERVICE_PRICES[serviceName]) {
      setPrice(SERVICE_PRICES[serviceName]);
    } else if (!editingItem) {
      setPrice(''); // Kosongkan jika belum memilih layanan (pada mode tambah)
    }
  }, [serviceName, editingItem]);

  // Sinkronisasi form saat tombol edit ditekan
  useEffect(() => {
    if (editingItem) {
      setCustomerName(editingItem.customerName);
      setServiceName(editingItem.serviceName);
      setPrice(editingItem.price);
    } else {
      clearForm();
    }
  }, [editingItem]);

  const clearForm = () => {
    setCustomerName('');
    setServiceName('');
    setPrice('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi Dasar
    if (!customerName.trim() || !serviceName.trim() || !price) {
      alert('Semua kolom form wajib diisi dengan benar!');
      return;
    }

    onSave({
      customerName: customerName.trim(),
      serviceName: serviceName.trim(),
      price: Number(price)
    });

    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="salon-form">
      <div className="form-group">
        <label>Nama Pelanggan</label>
        <input 
          type="text" 
          value={customerName} 
          onChange={(e) => setCustomerName(e.target.value)} 
          placeholder="Masukkan nama pelanggan"
        />
      </div>

      <div className="form-group">
        <label>Jenis Layanan Salon</label>
        <select value={serviceName} onChange={(e) => setServiceName(e.target.value)}>
          <option value="">-- Pilih Layanan --</option>
          <option value="Haircut Premium">Haircut Premium (Rp 75.000)</option>
          <option value="Creambath & Spa">Creambath & Spa (Rp 120.000)</option>
          <option value="Coloring / Hair Dye">Coloring / Hair Dye (Rp 250.000)</option>
          <option value="Manicure & Pedicure">Manicure & Pedicure (Rp 90.000)</option>
          <option value="Facial Treatment">Facial Treatment (Rp 150.000)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Harga (Rp)</label>
        {/* 3. INPUT HARGA JADI READ-ONLY / DISABLED AGAR PELANGGAN TIDAK BISA ISI SENDIRI */}
        <input 
          type="number" 
          value={price} 
          readOnly 
          placeholder="Pilih layanan untuk melihat harga"
          style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }} // Gaya visual tambahan agar terlihat terkunci
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {editingItem ? 'Simpan Perubahan' : 'Tambah ke Antrean'}
        </button>
        {editingItem && (
          <button type="button" onClick={onCancelEdit} className="btn-cancel">
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

export default FormInput;