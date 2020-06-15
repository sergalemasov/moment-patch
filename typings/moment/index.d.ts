
import * as moment from 'moment-timezone';

declare module 'moment-timezone' {
  interface Moment {
    msk(): moment.Moment;
    setFrom(momentFrom: moment.Moment): moment.Moment;
    toUtc(): moment.Moment;
    mskOffset(timezone: number): moment.Moment;
  }

  export var mskOffset: number;
  export function msk(...args: any[]): moment.Moment;
  export function mskParse(...args: any[]): moment.Moment;
}
