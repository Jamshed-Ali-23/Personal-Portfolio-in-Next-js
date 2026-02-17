import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  title: string;
  platform: string;
  issueDate?: Date | string;
  credentialId?: string;
  credentialUrl?: string;
  certificateFile?: string;
  skills?: string[];
  color?: string;
  description?: string;
  order: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    title: { type: String, required: true },
    platform: { type: String, required: true },
    issueDate: { type: Schema.Types.Mixed },
    credentialId: String,
    credentialUrl: String,
    certificateFile: String,
    skills: { type: [String], default: [] },
    color: { type: String, default: 'amber' },
    description: String,
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
