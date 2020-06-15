import * as moment from 'moment-timezone';

moment.fn.msk = function (): moment.Moment {
    return this.tz('Europe/Moscow');
};

moment.fn.setFrom = function (momentFrom: moment.Moment): moment.Moment {
    if (!moment.isMoment(momentFrom)) {
        throw 'Объект должен быть типа Moment';
    }

    this.year(momentFrom.year());
    this.month(momentFrom.month());
    this.date(momentFrom.date());
    this.hour(momentFrom.hour());
    this.minute(momentFrom.minute());
    this.second(momentFrom.second());
    this.millisecond(momentFrom.millisecond());

    return this;
};

moment.fn.toUtc = function(): moment.Moment {
    return moment.utc().setFrom(this);
};

moment.fn.mskOffset = function(timezone: number): moment.Moment {
    return moment.fn.toUtc.call(this).utcOffset(timezone);
};

const mskOffset = moment.tz(moment.utc(), 'Europe/Moscow').utcOffset() / 60;

function msk(...args: any[]): moment.Moment {
    return moment.call(null, ...args).tz('Europe/Moscow');
};

function mskParse(...args: any[]) {
    const parseMoment = moment.call(null, ...args);

    return msk().setFrom(parseMoment);
};

Object.assign(moment, {
    msk,
    mskOffset,
    mskParse
});

export = moment;