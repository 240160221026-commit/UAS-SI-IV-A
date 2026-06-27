import React, { useState, useEffect } from 'react';
import FormInput from './components/FormInput';
import ItemList from './components/ItemList';
import './index.css';

function App() {
  // 1. STATE MANAGEMENT & LOCAL STORAGE PERSISTENCE
  const [services, setServices] = useState(() => {
    const savedData = localStorage.getItem('glowspace_services');
    return savedData ? JSON.parse(savedData) : [];
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, completed
  const [editingItem, setEditingItem] = useState(null); // Menyimpan data yang sedang diedit

  useEffect(() => {
    localStorage.setItem('glowspace_services', JSON.stringify(services));
  }, [services]);

  // 2. CRUD HANDLERS
  // CREATE & UPDATE (Full Edit)
  const handleSaveService = (data) => {
    if (editingItem) {
      // Logic Update / Edit Penuh
      setServices(services.map(item => 
        item.id === editingItem.id ? { ...item, ...data } : item
      ));
      setEditingItem(null);
      alert('Data antrean salon berhasil diperbarui!');
    } else {
      // Logic Create
      const newService = {
        id: String(+new Date()),
        ...data,
        isCompleted: false,
        bookingDate: new Date().toLocaleString('id-ID')
      };
      setServices([newService, ...services]);
      alert('Antrean baru berhasil ditambahkan!');
    }
  };

  // UPDATE (Toggle Status Minimal Properti)
  const handleToggleStatus = (id) => {
    setServices(services.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  // DELETE with Confirmation
  const handleDeleteService = (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data antrean ini secara permanen?');
    if (confirmDelete) {
      setServices(services.filter(item => item.id !== id));
      if (editingItem && editingItem.id === id) setEditingItem(null);
      alert('Data antrean berhasil dihapus.');
    }
  };

  // Pemicu Mode Edit
  const handleStartEdit = (item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  // 3. FILTER & SEARCH LOGIC (Real-time)
  const filteredServices = services.filter(item => {
    const matchesSearch = item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'pending') return matchesSearch && !item.isCompleted;
    if (filterStatus === 'completed') return matchesSearch && item.isCompleted;
    return matchesSearch;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✨ Glamour & Co. Management App</h1>
        <p>Aplikasi Manajemen Antrean & Layanan Pelanggan Salon</p>
      </header>

      <main className="app-content">
        {/* Sisi Kiri: Form Input */}
        <section className="form-section">
          <h2>{editingItem ? '📝 Edit Data Antrean' : '➕ Tambah Antrean Salon'}</h2>
          <FormInput 
            onSave={handleSaveService} 
            editingItem={editingItem} 
            onCancelEdit={handleCancelEdit}
          />
        </section>

        {/* Sisi Kanan: List & Filter Data */}
        <section className="list-section">
          <div className="controls-container">
            {/* Input Pencarian */}
            <input 
              type="text" 
              placeholder="Cari nama pelanggan / layanan..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            
            {/* Filter Status */}
            <div className="filter-buttons">
              <button className={filterStatus === 'all' ? 'active' : ''} onClick={() => setFilterStatus('all')}>Semua ({services.length})</button>
              <button className={filterStatus === 'pending' ? 'active' : ''} onClick={() => setFilterStatus('pending')}>Menunggu ({services.filter(s => !s.isCompleted).length})</button>
              <button className={filterStatus === 'completed' ? 'active' : ''} onClick={() => setFilterStatus('completed')}>Selesai ({services.filter(s => s.isCompleted).length})</button>
            </div>
          </div>

          <ItemList 
            items={filteredServices} 
            onToggleStatus={handleToggleStatus}
            onDelete={handleDeleteService}
            onEdit={handleStartEdit}
          />
        </section>
      </main>
    </div>
  );
}

export default App;