import React, { useState } from 'react';
import { ShoppingCategory } from '../types/protocol';
import { Check, Plus, Trash2, Copy, CheckCheck, RotateCcw, Share2, Search, ShoppingBag } from 'lucide-react';

interface ShoppingListProps {
  categories: ShoppingCategory[];
  onUpdateCategories: (categories: ShoppingCategory[]) => void;
}

export const ShoppingList: React.FC<ShoppingListProps> = ({
  categories,
  onUpdateCategories
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategoryForAdd, setSelectedCategoryForAdd] = useState(categories[0]?.id || 'proteinas');
  const [copiedFeedback, setCopiedFeedback] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle item check
  const handleToggleItem = (categoryId: string, itemId: string) => {
    const updated = categories.map((cat) => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map((item) => {
          if (item.id !== itemId) return item;
          return { ...item, checked: !item.checked };
        })
      };
    });
    onUpdateCategories(updated);
  };

  // Add custom item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const updated = categories.map((cat) => {
      if (cat.id !== selectedCategoryForAdd) return cat;
      return {
        ...cat,
        items: [
          ...cat.items,
          {
            id: `custom_${Date.now()}`,
            name: newItemName.trim(),
            checked: false,
            custom: true
          }
        ]
      };
    });

    onUpdateCategories(updated);
    setNewItemName('');
  };

  // Remove custom item
  const handleRemoveItem = (categoryId: string, itemId: string) => {
    const updated = categories.map((cat) => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.filter((item) => item.id !== itemId)
      };
    });
    onUpdateCategories(updated);
  };

  // Uncheck all items
  const handleUncheckAll = () => {
    const updated = categories.map((cat) => ({
      ...cat,
      items: cat.items.map((item) => ({ ...item, checked: false }))
    }));
    onUpdateCategories(updated);
  };

  // Copy list for WhatsApp or notes
  const handleCopyList = () => {
    let text = "🛒 *LISTA DE COMPRAS - PROTOCOLO VERÃO 42*\n\n";
    categories.forEach((cat) => {
      text += `*${cat.name.toUpperCase()}*\n`;
      cat.items.forEach((item) => {
        text += `${item.checked ? '✅' : '▫️'} ${item.name}\n`;
      });
      text += "\n";
    });

    navigator.clipboard.writeText(text);
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2500);
  };

  // Count items
  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedItems = categories.reduce(
    (acc, cat) => acc + cat.items.filter((i) => i.checked).length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
            Página 47 — Lista Básica de Compras
          </span>
          <h2 className="text-2xl font-bold text-stone-900 mt-2">
            Organização da Despensa e Feira
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Marque os itens no supermercado, adicione alimentos de sua preferência ou copie direto para o WhatsApp.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyList}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer"
          >
            {copiedFeedback ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedFeedback ? 'Copiado para colar no WhatsApp!' : 'Copiar Lista Completa'}</span>
          </button>

          <button
            onClick={handleUncheckAll}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
            title="Desmarcar todos"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Desmarcar tudo</span>
          </button>
        </div>
      </div>

      {/* Progress & Add Item Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Progress Bar */}
        <div className="md:col-span-5 bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm font-mono">
              {Math.round((checkedItems / (totalItems || 1)) * 100)}%
            </div>
            <div>
              <span className="text-xs font-bold text-stone-900 block">
                Itens no carrinho
              </span>
              <span className="text-[11px] text-stone-500 font-mono">
                {checkedItems} de {totalItems} itens comprados
              </span>
            </div>
          </div>
          <div className="w-24 bg-stone-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${(checkedItems / (totalItems || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Add custom item form */}
        <div className="md:col-span-7 bg-white p-4 rounded-xl border border-stone-200">
          <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="+ Adicionar item personalizado..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="flex-1 w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <select
              value={selectedCategoryForAdd}
              onChange={(e) => setSelectedCategoryForAdd(e.target.value)}
              className="px-2.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-3.5 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shrink-0 cursor-pointer"
            >
              Adicionar
            </button>
          </form>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900">
                {category.name}
              </h3>
              <span className="text-[11px] font-mono text-stone-400">
                {category.items.filter((i) => i.checked).length}/{category.items.length}
              </span>
            </div>

            <div className="p-4 space-y-2 flex-1">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleItem(category.id, item.id)}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer select-none transition-colors ${
                    item.checked
                      ? 'bg-emerald-50/60 text-stone-400 line-through'
                      : 'hover:bg-stone-50 text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                        item.checked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {item.checked && <Check className="w-3 h-3" />}
                    </div>
                    <span className="truncate">{item.name}</span>
                  </div>

                  {item.custom && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(category.id, item.id);
                      }}
                      className="text-stone-400 hover:text-red-600 p-1"
                      title="Excluir item personalizado"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
