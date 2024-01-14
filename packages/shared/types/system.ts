export enum SystemRequestType {
  searchUsersAndGroups = 'searchUsersAndGroups',
}

export interface UserAndGroupSearchItem {
  id: string;
  name: string;
  avatar: string;
}
export interface UserAndGroupSearchResult {
  users: UserAndGroupSearchItem[];
  groups: UserAndGroupSearchItem[];
}

export interface UserAndGroupSearchRequestBody {
  searchText: string;
}
