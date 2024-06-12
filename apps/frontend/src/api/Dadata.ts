/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  DadataControllerAddressSuggestData,
  DadataControllerAddressSuggestError,
  DadataControllerAddressSuggestParams,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Dadata<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
 * No description
 *
 * @tags Dadata
 * @name DadataControllerAddressSuggest
 * @request GET:/dadata
 * @response `200` `DadataControllerAddressSuggestData`
 * @response `404` `{
    type?: "NOT_FOUND",
    message?: "No one suggestion found",
    thing?: "DADATA_SUGGESTION",

}`
 */
  dadataControllerAddressSuggest = (query: DadataControllerAddressSuggestParams, params: RequestParams = {}) =>
    this.http.request<DadataControllerAddressSuggestData, DadataControllerAddressSuggestError>({
      path: `/dadata`,
      method: "GET",
      query: query,
      ...params,
    });
}
