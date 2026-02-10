import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  title: string;
  tagline?: string;
  bio?: string;
  shortBio?: string;
  email?: string;
  phone?: string;
  location?: string;
  availability?: string;
  avatarUrl?: string;
  profileImage?: string;
  resumeUrl?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    email?: string;
  };
  stats?: {
    projectsCompleted?: number;
    certificationsEarned?: number;
    technologiesMastered?: number;
  };
  education?: {
    degree?: string;
    institution?: string;
    year?: string;
    description?: string;
  };
  coursework?: string[];
  strengths?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: String,
    bio: String,
    shortBio: String,
    email: String,
    phone: String,
    location: String,
    availability: String,
    avatarUrl: String,
    profileImage: String,
    resumeUrl: String,
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      website: String,
      email: String,
    },
    stats: {
      projectsCompleted: { type: Number, default: 0 },
      certificationsEarned: { type: Number, default: 0 },
      technologiesMastered: { type: Number, default: 0 },
    },
    education: {
      degree: String,
      institution: String,
      year: String,
      description: String,
    },
    coursework: [String],
    strengths: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
