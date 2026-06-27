import React from 'react';
import Item from './Item';

function ItemList({ items, onToggleStatus, onDelete, onEdit }) {
  if (items.length === 0) {
    return <p className="empty-message">Tidak ada data antrean salon ditemukan.</p>;
  }

  return (
    <div className="item-list">
      {items.map(item => (
        <Item 
          key={item.id} 
          item={item} 
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default ItemList;