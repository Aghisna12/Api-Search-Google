function buatParam(query) {
  var hasil = [];
  if (query) {
    var i = 0;
    for (var obj in query) {
      var pertama = encodeURIComponent(obj);
      var kedua = encodeURIComponent(query[obj]);
      if (pertama && kedua) {
        hasil.push({
          'pertama':pertama,
          'kedua':kedua
        });
      }
      ++i;
    };
  }
  if (hasil) {
    var hasil_query = "?";
    hasil.forEach(function(coba, idx) {
      var pertama = coba.pertama;
      var kedua = coba.kedua;
      if (idx == hasil.length - 1) {
        hasil_query += pertama + "=" + kedua;
      } else {
        hasil_query += pertama + "=" + kedua + "&";
      }
    });
    return hasil_query;
  } else {
    return "";
  }
}

function setCacheCookie(value) {
  var cache = CacheService.getUserCache();
  if (cache && value) {
    cache.put('cookie', value);
    return true;
  }
  return false;
}

function getCacheCookie() {
  var cookie = '';
  var cache = CacheService.getUserCache();
  if (cache) {
    var cached = cache.get('cookie');
    if (cached) {
      cookie = cached;
    }
  }
  return cookie;
}

function getCookie(force) {
  var cookie = '';
  if (!force) {
    cookie = getCacheCookie();
  } else {
    var options = {
      'method':'get',
      'contentType':'text/html; charset=UTF-8',
      'headers':{
        'referer':'https://www.google.com/',
        'user-agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
      }
    };
    var respon = UrlFetchApp.fetch("https://www.google.com/search", options);
    if (respon && respon.getHeaders()) {
      var headers = respon.getHeaders();
      if (headers['Set-Cookie']) {
        var cookies = headers['Set-Cookie'];
        var cookie_r = /^(.*?);/g.exec(cookies);
        if (cookie_r.length) {
          cookie = cookie_r[1];
          setCacheCookie(cookie);
        }
      }
    }
  }
  return cookie;
}


function searchGoogle(katakunci, force) {
  var api = "https://www.google.com/search";
  if (!katakunci) {
    return "katakunci kosong!";
  }
  var query = {
    'q':katakunci,
    'oq':katakunci,
    'sclient':'psy-ab',
    'uact':'5'
  };
  var options = {
    'method':'get',
    'contentType':'text/html; charset=UTF-8',
    'headers':{
      'referer':'https://www.google.com/',
      'user-agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
      'cookie':getCookie(force);
    }
  };
  return UrlFetchApp.fetch(api + buatParam(query), options);
}

function testGoogle(keyword) {
  //Logger.log(getCookie(true));
  var data = searchGoogle(keyword);
  if (!data) {
    data = searchGoogle(keyword, true);
  }
  return data;
}

function testCase() {
  Logger.log(testGoogle("coba"));
}
