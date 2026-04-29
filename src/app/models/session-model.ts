import { ElementModel } from './element-model';
import { NameValuePair } from './name-value-pair';

export interface SessionModel {
  id: string;
  created: Date;
  updated: Date | undefined;
  expiry: Date;
  pageIndex: number;
  domain: string;
  subDomain: string | undefined;
  elements: ElementModel[];
  formFields: NameValuePair[];
}