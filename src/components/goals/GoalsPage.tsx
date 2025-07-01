import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Plus, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { formatCurrency } from '../../utils/currency';
import { mockGoals } from '../../utils/mockData';
import { Goal } from '../../types';

interface GoalsPageProps {
  selectedCurrency: string;
}

export const GoalsPage: React.FC<GoalsPageProps> = ({ selectedCurrency }) => {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    targetDate: '',
    category: 'other' as Goal['category']
  });

  const categoryOptions = [
    { value: 'emergency', label: 'Emergency Fund' },
    { value: 'vacation', label: 'Vacation' },
    { value: 'education', label: 'Education' },
    { value: 'business', label: 'Business' },
    { value: 'other', label: 'Other' }
  ];

  const getCategoryIcon = (category: Goal['category']) => {
    switch (category) {
      case 'emergency':
        return '🛡️';
      case 'vacation':
        return '🏖️';
      case 'education':
        return '🎓';
      case 'business':
        return '💼';
      default:
        return '🎯';
    }
  };

  const getCategoryColor = (category: Goal['category']) => {
    switch (category) {
      case 'emergency':
        return 'bg-red-100 text-red-700';
      case 'vacation':
        return 'bg-blue-100 text-blue-700';
      case 'education':
        return 'bg-green-100 text-green-700';
      case 'business':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCreateGoal = () => {
    if (!formData.title || !formData.targetAmount) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: 0,
      targetDate: new Date(formData.targetDate),
      category: formData.category,
      isActive: true
    };

    setGoals([...goals, newGoal]);
    resetForm();
    setShowCreateModal(false);
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description,
      targetAmount: goal.targetAmount.toString(),
      targetDate: goal.targetDate.toISOString().split('T')[0],
      category: goal.category
    });
    setShowCreateModal(true);
  };

  const handleUpdateGoal = () => {
    if (!editingGoal || !formData.title || !formData.targetAmount) return;

    const updatedGoal: Goal = {
      ...editingGoal,
      title: formData.title,
      description: formData.description,
      targetAmount: parseFloat(formData.targetAmount),
      targetDate: new Date(formData.targetDate),
      category: formData.category
    };

    setGoals(goals.map(g => g.id === editingGoal.id ? updatedGoal : g));
    resetForm();
    setShowCreateModal(false);
    setEditingGoal(null);
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      targetAmount: '',
      targetDate: '',
      category: 'other'
    });
  };

  const activeGoals = goals.filter(g => g.isActive);
  const completedGoals = goals.filter(g => g.currentAmount >= g.targetAmount);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-gray-600">Track and achieve your financial milestones</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Goal
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Goals</p>
              <p className="text-2xl font-bold text-gray-900">{activeGoals.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedGoals.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Target</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  activeGoals.reduce((sum, g) => sum + g.targetAmount, 0),
                  selectedCurrency
                )}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Goals List */}
      <div className="grid gap-4">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const isCompleted = goal.currentAmount >= goal.targetAmount;
          const daysLeft = Math.ceil(
            (goal.targetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          );

          return (
            <motion.div
              key={goal.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getCategoryIcon(goal.category)}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                      <p className="text-sm text-gray-600">{goal.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                          {goal.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditGoal(goal)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">
                      {formatCurrency(goal.currentAmount, selectedCurrency)} / {formatCurrency(goal.targetAmount, selectedCurrency)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{progress.toFixed(1)}% complete</span>
                    {isCompleted && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-3 w-3" />
                        Goal achieved!
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Create/Edit Goal Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setEditingGoal(null);
          resetForm();
        }}
        title={editingGoal ? 'Edit Goal' : 'Create New Goal'}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Goal Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Emergency Fund"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Target Amount"
              type="number"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              placeholder="0.00"
            />

            <Input
              label="Target Date"
              type="date"
              value={formData.targetDate}
              onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
            />
          </div>

          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Goal['category'] })}
            options={categoryOptions}
          />

          <Input
            label="Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your goal..."
          />

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                setEditingGoal(null);
                resetForm();
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={editingGoal ? handleUpdateGoal : handleCreateGoal}
              className="flex-1"
              disabled={!formData.title || !formData.targetAmount}
            >
              {editingGoal ? 'Update Goal' : 'Create Goal'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
