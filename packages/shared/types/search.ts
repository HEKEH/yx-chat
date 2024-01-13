export interface UserAndGroupSearchItem {
  id: string;
  name: string;
  avatar: string;
}
export interface UserAndGroupSearchResult {
  users: UserAndGroupSearchItem[];
  groups: UserAndGroupSearchItem[];
}
