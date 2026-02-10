import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill {
  name: string;
  level: number;
}

export interface ISkillCategory extends Document {
  title: string;
  icon: string;
  description?: string;
  skills: ISkill[];
  order: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SkillCategorySchema = new Schema<ISkillCategory>(
  {
    title: { type: String, required: true },
    icon: { type: String, default: '🔧' },
    description: String,
    skills: {
      type: [{
        name: { type: String, required: true },
        level: { type: Number, default: 0, min: 0, max: 100 },
      }],
      default: [],
    },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SkillCategory || mongoose.model<ISkillCategory>('SkillCategory', SkillCategorySchema);
