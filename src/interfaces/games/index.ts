type filterBy = "new-releases" | "coming-soon" | "available";

type platform =
  | "ps5"
  | "ps4"
  | "xbox-series-x"
  | "xboxone"
  | "switch"
  | "pc"
  | "ios"
  | "stadia";

type sortBy = "date" | "metascore" | "name" | "userscore";

/**
 *  Interface GamesParamsOptions
 *  @interface
 *  @classdesc URL parameter options
 */
export interface GamesParamsOptions {
  /**
   * @member {filterBy} filterBy
   */
  filterBy: filterBy;
  /**
   * @member {platform} platform
   */
  platform: platform;
  /**
   * @member {sortBy} sortBy
   */
  sortBy: sortBy;
}
