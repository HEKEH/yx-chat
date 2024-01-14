import {
  SystemRequestType,
  UserAndGroupSearchRequestBody,
} from '@yx-chat/shared/types';
import { AbstractSocketRequest } from './type';

export class SearchUsersAndGroupsRequest extends AbstractSocketRequest<UserAndGroupSearchRequestBody> {
  private _searchText: string;
  get type() {
    return SystemRequestType.searchUsersAndGroups;
  }
  get data() {
    return {
      searchText: this._searchText,
    };
  }
  get name() {
    return 'Search Users And Groups';
  }
  constructor(searchText: string) {
    super();
    this._searchText = searchText;
  }
}
