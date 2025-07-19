// lib/models/GameByUser.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IGameByUser extends Document {
  userId: mongoose.Types.ObjectId;
  gameId: mongoose.Types.ObjectId;
}

const GameByUserSchema = new Schema<IGameByUser>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
});

export default mongoose.models.GameByUser ||
  mongoose.model<IGameByUser>('GameByUser', GameByUserSchema);
