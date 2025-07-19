// lib/models/Serial.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISerial extends Document {
  code: string;
  used: boolean;
  premium: boolean ;
}

const SerialsSchema = new Schema<ISerial>({
  code: { type: String, required: true, unique: true },
  used: { type: Boolean, required: true, default: false },
  premium: { type: Boolean, required: true, default: false }
});

export default mongoose.models.Serials || mongoose.model<ISerial>('Serials', SerialsSchema);
