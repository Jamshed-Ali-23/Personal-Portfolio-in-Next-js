import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  role: string;
  company: string;
  location?: string;
  description?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  isCurrent: boolean;
  achievements: string[];
  technologies?: string[];
  order: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    description: String,
    startDate: { type: Schema.Types.Mixed },
    endDate: { type: Schema.Types.Mixed },
    isCurrent: { type: Boolean, default: false },
    achievements: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
