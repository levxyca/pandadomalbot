const {
  isToday,
  dateToString,
  dateFromText,
} = require('../utilities/date-time');

const INITIAL_DATE = '09/10/2020';

class Counter {
  constructor() {
    this.today = '';
    this.counters = {
      eita: {
        total: 0,
        day: 0,
      },
      oh: {
        total: 0,
        day: 0,
      },
      calma: {
        total: 0,
        day: 0,
      },
    };
  }

  /**
   * Incrementa um contador.
   *
   * @param {String} key palavra do contador.
   */
  increment(key) {
    const counter = this.counters[key];
    if (counter) {
      counter.total += 1;
      counter.day += 1;
      this.counters = { ...this.counters, counter };
    }
  }

  /**
   * Obtém o texto formatado de quantas vezes o contador foi utilizado.
   *
   * @param {String} key palavra do contador.
   */
  text(key) {
    const counter = this.counters[key];

    if (!counter) return null;

    const daysufix = counter.day === 1 ? 'vez' : 'vezes';
    const totalsufix = counter.total === 1 ? 'vez' : 'vezes';

    return `@${process.env.CHANNEL} já disse ${key} ${counter.day} ${daysufix} hoje e ${counter.total} ${totalsufix} desde o dia ${INITIAL_DATE}.`;
  }

  static fromJSON(json) {
    const counter = Object.assign(new Counter(), json);

    if (!counter.today) {
      counter.today = dateToString(new Date());
    }

    if (!isToday(dateFromText(counter.today))) {
      Object.keys(counter.counters).forEach((key) => {
        counter.counters[key].day = 0;
      });
      counter.today = dateToString(new Date());
    }

    return counter;
  }
}

module.exports = Counter;
