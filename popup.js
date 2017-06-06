'use restrict';

function setBooleanToLocalStorage(key, val) {
  if (!window.localStorage) return false;
  window.localStorage.setItem(key, ((val !== false)? '1': '0'));
}

function getBooleanFromLocalStorage(key) {
  if (!window.localStorage) return false;
  return (window.localStorage.getItem(key) === '0')? false: true;
}

function includes(sequence, needle) {
  return sequence.some(e => {
    return e === needle;
  });
}

document.addEventListener('DOMContentLoaded', event => {
  var v = new Vue({
      el: '#setting',
      data: {
          selected: (window.localStorage && window.localStorage.getItem('content')) ? window.localStorage.getItem('content') : 'illust',
          options: [
              {value: 'illust'},
              {value: 'original'},
              {value: 'manga'},
              {value: 'ugoira'},
          ],
          with_manga_tag: getBooleanFromLocalStorage('contents_with_manga_tag'),
          with_big_height: getBooleanFromLocalStorage('with_big_height'),
      },
      watch: {
          with_manga_tag: function (newChecked){
              setBooleanToLocalStorage('contents_with_manga_tag', newChecked);
          },
          with_big_height: function (newChecked){
              setBooleanToLocalStorage('with_big_height', newChecked);
          },
          selected: function (newSelected){
               if (window.localStorage) {
                   window.localStorage.setItem('content', newSelected);
               }
          }
      }
  });
});
