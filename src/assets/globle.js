
export function formateDate (dateTimeStamp) {
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30
  const year = month * 12
  const type = arguments[1] ? arguments[1] : false
  if (dateTimeStamp === '' || typeof (dateTimeStamp) === 'undefined') {
    return ''
  }
  const now = new Date().getTime()
  let diffValue = 0
  let result = ''
  try {
    diffValue = now - Date.parse(dateTimeStamp)
    // diffValue = now - Date.parse(dateTimeStamp.replace(/-/gi, '/'))
  } catch (e) {
    console.log('getFrendlyDate() 异常:' + e.message)
    return result
  }
  if (diffValue < 0) {
    // 结束日期不能小于开始日期！
    return result
  }
  // dateTimeStamp = dateTimeStamp.replace(/-/g, '/')
  dateTimeStamp = new Date(dateTimeStamp)
  let yearC = diffValue / year
  let monthC = diffValue / month
  let weekC = diffValue / (7 * day)
  let dayC = diffValue / day
  let hourC = diffValue / hour
  let minC = diffValue / minute
  let yearG = dateTimeStamp.getFullYear()
  let monthG = dateTimeStamp.getMonth() + 1
  let dayG = dateTimeStamp.getDate()
  monthG = monthG <= 9 ? ('0' + monthG) : monthG
  dayG = dayG <= 9 ? ('0' + dayG) : dayG

  if (yearC >= 1) {
    if (type) {
      result = yearG + '-' + monthG + '-' + dayG
    } else {
      result = parseInt(yearC) + '年前'
    }
  } else if (monthC >= 1) {
    if (type) {
      result = monthG + '-' + dayG
    } else {
      result = parseInt(monthC) + '个月前'
    }
  } else if (weekC >= 1) {
    if (type) {
      result = monthG + '-' + dayG
    } else {
      result = parseInt(weekC) + '周前'
    }
  } else if (dayC >= 1) {
    if (type) {
      result = monthG + '-' + dayG
    } else {
      result = parseInt(dayC) + '天前'
    }
  } else if (hourC >= 1) {
    result = parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    result = parseInt(minC) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
}

/**
 * 兼容微信设置页面的title
 */
export let setDocumentTitle = function (title) {
  document.title = title
  let ua = navigator.userAgent
  if (/\bMicroMessenger\/([\d.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    var i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}

export function addHTTP (url) {
  return (String(url).indexOf('http') >= 0) ? url : 'http:' + url
}
