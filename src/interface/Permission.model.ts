import { Schema } from "mongoose";

export const PermissionPages = new Schema({
  pageName: { type: String, required: true },
  actions: { type: [String], required: true },
});