import dayjs, { Dayjs } from 'dayjs';
import i18n from '~/infra/i18n';

export class GeneralTime {
  private _value: Dayjs;
  get value() {
    return this._value;
  }
  private _isToday() {
    return dayjs().isSame(this._value, 'day');
  }
  private _isYesterday() {
    return dayjs().add(-1, 'day').isSame(this._value, 'day');
  }
  toBriefFormat() {
    if (this._isToday()) {
      // return time
      return this._value.format('HH:mm');
    }
    if (this._isYesterday()) {
      return i18n.global.t('time.yesterday');
    }
    return this._value.format('M/D');
  }
  format() {
    const time = this._value.format('HH:mm');
    if (this._isToday()) {
      return time;
    }
    if (this._isYesterday()) {
      return `${i18n.global.t('time.yesterday')} ${time}`;
    }
    return `${this._value.format('M/D')} ${time}`;
  }
  constructor(time: string) {
    this._value = dayjs(time);
  }
}
