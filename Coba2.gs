/**
* Project Name : Google Search
* File Name : Coba2.gs
* Date : 22/7/2020 (8 am) (Yogyakarta, Indonesia)
* Credit : Aghisna12
*/

var global_cookie = "Your Cookie Google Accout";//String
var global_sleep = 3000;//Integer

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

function searchGoogle(katakunci) {
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
      'user-agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0',
      'cookie':global_cookie
    }
  };
  return UrlFetchApp.fetch(api + buatParam(query), options);
}

function testLimitGoogle() {
  for (var i = 0; i < 100; i++) {
    var coba = "test " + String(i);
    var res = searchGoogle(coba);
    if (res && res.getResponseCode() && res.getContentText()) {
      Logger.log(coba + " | " + res.getResponseCode() + " | " + (res.getContentText()).length);
    }
    Utilities.sleep(global_sleep);
  }
}
