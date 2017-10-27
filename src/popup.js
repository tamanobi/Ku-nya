'use restrict';

function setBooleanToLocalStorage(key, val) {
  if (!window.localStorage) return false;
  window.localStorage.setItem(key, ((val !== false)? '1': '0'));
}

function setValueToLocalStorage(key, val) {
  if (!window.localStorage) return false;
  window.localStorage.setItem(key, String(val));
}

function setJsonToLocalStorage(key, obj) {
  if (!window.localStorage) return false;
  window.localStorage.setItem(key, JSON.stringify(obj));
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
          excluding_tag: '',
          excluding_tags: getJsonFromLocalStorage('excluding_tags', []),
          is_excluding_high_aspect_ratio: getBooleanFromLocalStorage('is_excluding_high_aspect_ratio'),
          smallest_includable_aspect_ratio: getNumberFromLocalStorage('smallest_includable_aspect_ratio', 3),
      },
      methods: {
          addTag: function (e) {
              const is_already_registered = this.excluding_tags.some( e => {
                  return (typeof e[this.excluding_tag] !== 'undefined');
              });
true
              if (!is_already_registered) {
                  let obj = {};
                  obj[this.excluding_tag] = true;
                  obj['name'] = this.excluding_tag;
                  this.excluding_tags.push(obj);
              } else {
                  this.excluding_tag = '';
              }
          },
          deleteTag: function (e) {
              let index = -1;
              this.excluding_tags.some( (tag, i) => {
                  if (typeof tag[e.target.value] !== 'undefined') {
                      index = i;
                      return true;
                  }
                  return false;
              });

              if (index != -1) {
                  this.excluding_tags.splice(index, 1);
              }
          }
      },
      watch: {
          excluding_tags: function () {
              setJsonToLocalStorage('excluding_tags', this.excluding_tags);
          },
          with_manga_tag: function (newChecked) {
              setBooleanToLocalStorage('contents_with_manga_tag', newChecked);
          },
          selected: function (newSelected) {
               if (window.localStorage) {
                   window.localStorage.setItem('content', newSelected);
               }
          },
          is_excluding_high_aspect_ratio: function (newChecked) {
              setBooleanToLocalStorage('is_excluding_high_aspect_ratio', newChecked);
          },
          smallest_includable_aspect_ratio: function (newValue) {
              setValueToLocalStorage('smallest_includable_aspect_ratio', newValue);
          }
      }
  });
});
