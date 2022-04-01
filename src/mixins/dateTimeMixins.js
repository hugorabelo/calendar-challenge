import { DateTime, Interval } from 'luxon'

const dateTimeMixins = {
  name: 'dateTimeMixins',
  methods: {
    getFormattedTime(dateTime) {
      if (DateTime.isDateTime(dateTime) && dateTime.isValid) {
        return dateTime.setLocale('en-US').toLocaleString(DateTime.TIME_SIMPLE)
      }
      return ''
    },
    getFullFormattedDate(dateTime) {
      if (DateTime.isDateTime(dateTime) && dateTime.isValid) {
        return dateTime.setLocale('en-US').toLocaleString(DateTime.DATE_HUGE)
      }
      return ''
    },
    getISODateTime(dateTime) {
      if (DateTime.isDateTime(dateTime)) {
        return dateTime.toISO()
      }
      return dateTime
    },
    getObjectDateTime(dateTime) {
      if (!dateTime) {
        return null
      }
      try {
        if (DateTime.isDateTime(dateTime)) {
          return dateTime
        }
        return DateTime.fromISO(dateTime)
      } catch {
        return null
      }
    },
    countDaysFromNow(dateTime) {
      let currentDate = this.getObjectDateTime(dateTime)
      let today = DateTime.now()
      let countDays = Interval.fromDateTimes(today.startOf('day'), currentDate.startOf('day')).length('days')
      return countDays
    },
  },
}

export default dateTimeMixins
