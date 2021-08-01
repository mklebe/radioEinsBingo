import { Category } from "./categories";

export interface UserTip {
  category: Category,
  user: string,
  tips: Array<[string, string, string, string, string]>
}