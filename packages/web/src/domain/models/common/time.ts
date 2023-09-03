import dayjs, { Dayjs } from 'dayjs';
import i18n from '~/infra/i18n';

export class GeneralTime {
  private _value: Dayjs;
  get value() {
    return this._value;
  }
  toDisplayFormat() {
    const isToday = dayjs().isSame(this._value, 'day');
    // return time
    if (isToday) {
      return this._value.format('HH:mm');
    }
    const isYesterday = dayjs().add(-1, 'day').isSame(this._value, 'day');
    if (isYesterday) {
      return i18n.global.t('time.yesterday');
    }
    return this._value.format('M/D');
  }
  constructor(time: string) {
    this._value = dayjs(time);
  }
}
