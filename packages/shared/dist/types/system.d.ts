declare enum SystemRequestType {
    searchUsersAndGroups = "searchUsersAndGroups"
}
interface UserAndGroupSearchItem {
    id: string;
    name: string;
    avatar: string;
}
interface UserAndGroupSearchResult {
    users: UserAndGroupSearchItem[];
    groups: UserAndGroupSearchItem[];
}
interface UserAndGroupSearchRequestBody {
    searchText: string;
}

export { SystemRequestType, UserAndGroupSearchItem, UserAndGroupSearchRequestBody, UserAndGroupSearchResult };
