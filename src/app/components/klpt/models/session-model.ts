import { ElementModel } from './element-model';
import { NameValuePair } from './name-value-pair';

export interface SessionModel {
  id: string;
  created: Date;
  updated: Date | undefined;
  expiry: Date;
  educatorName: string | undefined;
  learnerCode: string;
  pageIndex: number;
  domain: string;
  subDomain: string | undefined;
  elements: ElementModel[];
  formFields: NameValuePair[];
}