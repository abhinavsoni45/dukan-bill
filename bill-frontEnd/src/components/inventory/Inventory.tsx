
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useQzTray from '../../hooks/useQzTray';
import { InventoryItem } from '../../models/InventoryItem'; // Assuming you have this model

const Inventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [selectedPrinter, setSelectedPrinter] = useState<string>('');
  const { printers, findPrinters, print, loading, error } = useQzTray();

  useEffect(() => {
    // Fetch inventory items from your backend
    axios.get('inventory').then(response => {
      setItems(response.data);
    });

    // Find available printers
    findPrinters().then(foundPrinters => {
      if (foundPrinters.length > 0) {
        setSelectedPrinter(foundPrinters[0]);
      }
    });
  }, [findPrinters]);

  const handlePrint = async (item: InventoryItem, template: string) => {
    if (!selectedPrinter) {
      alert('Please select a printer.');
      return;
    }

    try {
      const response = await axios.post('/inventory/print/single', {
        item,
        template,
      });

      if (response.data.success) {
        await print(selectedPrinter, response.data.commands);
        alert('Print job sent successfully!');
      } else {
        alert('Failed to get print commands from server.');
      }
    } catch (err) {
      console.error('Printing error:', err);
      alert('An error occurred while printing.');
    }
  };

  return (
    <div>
      <h1>Inventory</h1>

      <div>
        <label>Select Printer: </label>
        <select
          value={selectedPrinter}
          onChange={e => setSelectedPrinter(e.target.value)}
          disabled={loading}
        >
          {printers.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {loading && <p>Loading printers...</p>}
        {error && <p style={{ color: 'red' }}>QZ Tray Error: {error.message}</p>}
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.itemName}</td>
              <td>
                <button onClick={() => handlePrint(item, 'mrp_template')}>
                  Print MRP Label
                </button>
                <button onClick={() => handlePrint(item, 'weight_template')}>
                  Print Weight Label
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
