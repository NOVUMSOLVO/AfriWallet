import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  BarChart3, 
  Plus, 
  Edit3, 
  Trash2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { formatCurrency } from '../../utils/currency';
import { mockBudgetCategories } from '../../utils/mockData';
import { BudgetCategory } from '../../types';

interface BudgetPageProps {
  selectedCurrency: string;
}

export const BudgetPage: React.FC<BudgetPageProps> = ({ selectedCurrency }) => {
  const [categories, setCategories] = useState<BudgetCategory[]>(mockBudgetCategories);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BudgetCategory | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    allocated: '',
    color: '#3B82F6',
    icon: 'shopping-bag'
  });

  const iconOptions = [
    { value: 'shopping-bag', label: 'Shopping' },
    { value: 'car', label: 'Transportation' },
    { value: 'utensils', label: 'Food & Dining' },
    { value: 'music', label: 'Entertainment' },
    { value: 'home', label: 'Housing' },
    { value: 'heart', label: 'Healthcare' },
    { value: 'book', label: 'Education' },
    { value: 'phone', label: 'Phone & Internet' },
    { value: 'shirt', label: 'Clothing' },
    { value: 'plane', label: 'Travel' }
  ];

  const colorOptions = [
    { value: '#3B82F6', label: 'Blue' },
    { value: '#10B981', label: 'Green' },
    { value: '#F59E0B', label: 'Orange' },
    { value: '#EF4444', label: 'Red' },
    { value: '#8B5CF6', label: 'Purple' },
    { value: '#06B6D4', label: 'Cyan' },
    { value: '#84CC16', label: 'Lime' },
    { value: '#F97316', label: 'Orange' }
  ];

  const totalAllocated = categories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = totalAllocated - totalSpent;

  const handleCreateCategory = () => {
    if (!formData.name || !formData.allocated) return;

    const newCategory: BudgetCategory = {
      id: Date.now().toString(),
      name: formData.name,
      allocated: parseFloat(formData.allocated),
      spent: 0,
      color: formData.color,
      icon: formData.icon
    };

    setCategories([...categories, newCategory]);
    resetForm();
    setShowCreateModal(false);
  };

  const handleEditCategory = (category: BudgetCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      allocated: category.allocated.toString(),
      color: category.color,
      icon: category.icon
    });
    setShowCreateModal(true);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || !formData.name || !formData.allocated) return;

    const updatedCategory: BudgetCategory = {
      ...editingCategory,
      name: formData.name,
      allocated: parseFloat(formData.allocated),
      color: formData.color,
      icon: formData.icon
    };

    setCategories(categories.map(c => c.id === editingCategory.id ? updatedCategory : c));
    resetForm();
    setShowCreateModal(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(c => c.id !== categoryId));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      allocated: '',
      color: '#3B82F6',
      icon: 'shopping-bag'
    });
  };

  const getSpendingStatus = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage >= 100) return { status: 'over', color: 'text-red-600' };
    if (percentage >= 80) return { status: 'warning', color: 'text-orange-600' };
    return { status: 'good', color: 'text-green-600' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget Manager</h1>
          <p className="text-gray-600">Track your spending and stay on budget</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalAllocated, selectedCurrency)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalSpent, selectedCurrency)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Remaining</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(remainingBudget, selectedCurrency)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Spending Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {((totalSpent / totalAllocated) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Budget Categories */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Categories</h2>
        <div className="space-y-4">
          {categories.map((category) => {
            const percentage = (category.spent / category.allocated) * 100;
            const spendingStatus = getSpendingStatus(category.spent, category.allocated);
            const remaining = category.allocated - category.spent;

            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      <span className="text-sm">💼</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(category.spent, selectedCurrency)} of {formatCurrency(category.allocated, selectedCurrency)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${spendingStatus.color}`}>
                      {percentage.toFixed(1)}%
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: percentage >= 100 ? '#EF4444' : percentage >= 80 ? '#F59E0B' : category.color
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {remaining >= 0 ? 'Remaining' : 'Over budget'}: {formatCurrency(Math.abs(remaining), selectedCurrency)}
                    </span>
                    {percentage >= 100 && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertTriangle className="h-3 w-3" />
                        Over budget
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Create/Edit Category Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setEditingCategory(null);
          resetForm();
        }}
        title={editingCategory ? 'Edit Category' : 'Add Budget Category'}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Category Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Food & Dining"
          />

          <Input
            label="Monthly Budget"
            type="number"
            value={formData.allocated}
            onChange={(e) => setFormData({ ...formData, allocated: e.target.value })}
            placeholder="0.00"
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              options={iconOptions}
            />

            <Select
              label="Color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              options={colorOptions}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                setEditingCategory(null);
                resetForm();
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
              className="flex-1"
              disabled={!formData.name || !formData.allocated}
            >
              {editingCategory ? 'Update Category' : 'Add Category'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
