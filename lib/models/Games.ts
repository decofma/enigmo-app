// lib/models/Game.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IGame extends Document {
  title: string;
  description: string;
  isActive: boolean;
}

const GameSchema = new Schema<IGame>({
  title: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
});

export default mongoose.models.Game || mongoose.model<IGame>('Game', GameSchema);
