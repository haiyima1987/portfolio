// export mq constants
export const MQ_XS = 'MQ_XS'
export const MQ_SM = 'MQ_SM'
export const MQ_MD = 'MQ_MD'
export const MQ_LG = 'MQ_LG'
export const MQ_XL = 'MQ_XL'
export const MQ_XXL = 'MQ_XXL'
const TAG_START = '<'
const TAG_END = '>'

export const TABLE_COLORS = {
  redMain: '#FF2151',
  greenMain: '#417505'
}

export const SHORT_MONTHS = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec'
}

export default {
  /**
   * Dom and layout manipulation
   */
  disableScroll: function () {
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'
    document.body.style.position = 'fixed'
    document.body.style.top = '0'
    document.body.style.right = '0'
    document.body.style.bottom = '0'
    document.body.style.left = '0'
  },
  enableScroll: function () {
    document.body.style.overflow = ''
    document.body.style.height = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.right = ''
    document.body.style.bottom = ''
    document.body.style.left = ''
  },
  getScreenWidth: function () {
    let width = window.innerWidth
    if (width < 576) {
      return MQ_XS
    } else if (width >= 576 && width < 768) {
      return MQ_SM
    } else if (width >= 768 && width < 992) {
      return MQ_MD
    } else if (width >= 992 && width < 1200) {
      return MQ_LG
    } else if (width >= 1200 && width < 1600) {
      return MQ_XL
    } else {
      return MQ_XXL
    }
  },
  isSmallScreen: function () {
    switch (this.getScreenWidth()) {
      case MQ_XS:
        return true
      case MQ_SM:
        return true
      default:
        return false
    }
  },
  isTabletMobile: function () {
    switch (this.getScreenWidth()) {
      case MQ_XS:
        return true
      case MQ_SM:
        return true
      case MQ_MD:
        return true
      default:
        return false
    }
  },
  isAndroid: function () {
    return navigator.userAgent.match(/Android/i)
  },
  isBlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  isiOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  isOpera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  isWindows: function () {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
  },
  isMobile: function () {
    return this.isAndroid() || this.isBlackBerry() || this.isiOS()
      || this.isOpera() || this.isWindows()
  },
  scrollUp: function () {
    scroll(0, 0)
  },
  /**
   * string and html manipulation
   */
  parseHtmlString: function (htmlString, className = '') {
    // add class to the tag
    if (htmlString.indexOf(TAG_START) !== -1 && htmlString.indexOf(TAG_END) !== -1) {
      htmlString = htmlString.replace(TAG_END, ` class="${className}"${TAG_END}`)
    } else {
      htmlString = `<p>${htmlString}</p>`
      htmlString = htmlString.replace(TAG_END, ` class="${className}"${TAG_END}`)
    }
    return htmlString
  },
  addTextColor: function (text, indexStart, searchTerm, className) {
    let textStart = text.substring(0, indexStart)
    let textMiddle = text.substr(indexStart, searchTerm.length)
    let textEnd = text.substring(indexStart + searchTerm.length)
    return `${textStart}<span class="${className}">${textMiddle}</span>${textEnd}`
  },
  removeTextColor: function (text) {
    let tagIndex = text.indexOf(TAG_START)
    if (tagIndex === -1) return text
    let textStart = text.substring(0, tagIndex)
    let textEnd = text.substring(text.indexOf(TAG_END) + 1)
    return this.removeTextColor(`${textStart}${textEnd}`)
  },
  replaceDotWithComma: function (number) {
    return String(number).replace(/[.]/gi, ',')
  },
  replaceCommaWithDot: function (number) {
    return String(number).replace(/[,]/gi, '.')
  },
  replaceBackSlashes: function (link) {
    return link.replace(/\\/g, '/')
  },
  prependZeroToNumber(num) {
    return num < 10 ? '0' + num : num
  },
  camelCaseToSpacedNames: function (text) {
    // insert a space before all caps
    return text.replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function (str) {
        return str.toUpperCase()
      })
  },
  kebabCaseToSpacedNames: function (text) {
    return text.replace(/-/g, ' ')
      .replace(/^./, function (str) {
        return str.toUpperCase()
      })
  },
  /**
   * date manipulation
   */
  formatDateDash: function (timestamp) {
    let dateToFormat = new Date(timestamp)
    let month = dateToFormat.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let day = dateToFormat.getDate()
    if (day < 10) {
      day = '0' + day
    }
    return day + '-' + month + '-' + dateToFormat.getFullYear()
  },
  isToday: function (date) {
    let today = new Date()
    return today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
  },
  getTimestampDiff: function (date) {
    let nowTimestamp = new Date().getTime()
    let dateTimestamp = new Date(date * 1000).getTime()
    return Math.abs(dateTimestamp - nowTimestamp)
  },
  getTimeTodayOrDate: function (timestamp) {
    let date = new Date(timestamp * 1000)
    if (!this.isToday(date)) {
      let month = date.getMonth() + 1
      month = month < 10 ? `0${month}` : month
      let day = date.getDate()
      day = day < 10 ? `0${day}` : day
      return `${day}/${month}/${date.getFullYear().toString().substr(-2)}`
    }
    let hour = date.getHours()
    hour = hour < 10 ? `0${hour}` : hour
    let minutes = date.getMinutes()
    minutes = minutes < 10 ? `0${minutes}` : minutes
    return `${hour}:${minutes}`
  },
  getTimeAgo: function (date) {
    let diff = this.getTimestampDiff(date)
    const SECOND = 1000
    const MINUTE = SECOND * 60
    const HOUR = MINUTE * 60
    const DAY = HOUR * 24
    const MONTH = DAY * 30
    const YEAR = MONTH * 12

    let seconds = Math.floor(diff / SECOND)
    let minutes = Math.floor(diff / MINUTE)
    let hours = Math.floor(diff / HOUR)
    let days = Math.floor(diff / DAY)
    let months = Math.floor(diff / MONTH)
    let years = Math.floor(diff / YEAR)

    let timeDiff = 0
    let text = ''

    if (seconds < 60) {
      seconds === 1 ? text = 'second' : text = 'seconds'
      timeDiff = seconds
    } else if (minutes < 60) {
      minutes === 1 ? text = 'minute' : text = 'minutes'
      timeDiff = minutes
    } else if (hours < 24) {
      hours === 1 ? text = 'hour' : text = 'hours'
      timeDiff = hours
    } else if (days < 30) {
      days === 1 ? text = 'day' : text = 'days'
      timeDiff = days
    } else if (months < 12) {
      months === 1 ? text = 'month' : text = 'months'
      timeDiff = months
    } else if (years > 0) {
      years === 1 ? text = 'year' : text = 'years'
      timeDiff = years
    }
    return timeDiff + ' ' + text + ' ago'
  },
  getMonthText: function (monthNum) {

  }
}
