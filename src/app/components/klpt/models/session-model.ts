import { ElementModel } from './element-model';
import { NameValuePair } from './name-value-pair';
import { SessionTag } from './session-tag';

export interface SessionModel {
  id: string;
  created: Date;
  updated: Date | undefined;
  expiry: Date;
  educatorName: string | undefined;
  learnerCode: string;
  sessionTag?: SessionTag;
  pageIndex: number;
  domain: string;
  subDomain: string | undefined;
  elements: ElementModel[];
  formFields: NameValuePair[];
}
