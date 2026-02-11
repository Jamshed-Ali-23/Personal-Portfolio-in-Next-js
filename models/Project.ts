import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  icon: string;
  category: string;
  duration?: string;
  problem: string;
  solution: string;
  fullDescription?: string;
  techStack: string[];
  features: string[];
  challenges: string[];
  results: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    icon: { type: String, default: '📊' },
    category: { type: String, required: true, enum: ['Machine Learning', 'Data Analytics', 'Web Development'] },
    duration: String,
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    fullDescription: String,
    techStack: { type: [String], default: [] },
    features: { type: [String], default: [] },
    challenges: { type: [String], default: [] },
    results: { type: [String], default: [] },
    images: { type: [String], default: [] },
    githubUrl: String,
    liveUrl: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
