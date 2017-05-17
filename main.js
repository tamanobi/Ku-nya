'use restrict';
document.addEventListener('DOMContentLoaded', (event) => {
  var sourceUri = 'https://www.pixiv.net/ranking.php?mode=daily&format=json&content=illust';
  var promiseList = [];

  for (var i = 1; i <= 3; i++) {
    var p = axios.get(sourceUri + '&p=' + i);
    promiseList.push(p);
  }

  Promise.all(promiseList).then((values) => {
    var items = [];
    var illustrations = [];

    values.forEach((response) => {
      if (response.status === 200) {
        // Extracting illustration info
        response.data.contents.forEach((content) => {
            illustrations.push({
              'illustrationId': content.illust_id,
              'illustrationUrl': content.url,
              'illustrationTitle': content.title,
              'userName': content.user_name,
            });
        });
      }
    });

    // Shuffle.
    illustrations = shuffle(illustrations);

    // Inserting elements to a New tab page body.
    illustrations.forEach((illust) => {
      items.push(createGalleryItem(
        illust.illustrationId,
        illust.illustrationUrl,
        illust.illustrationTitle,
        illust.userName
      ));
    });

    // Wait for image loading
    return Promise.all(items.map((item) => {
      return new Promise((resolve) => {
        item.img.onload = item.img.onerror = () => resolve(item);
      });
    }));
  })
  .then((items) => {
    items.forEach((item) => {
      document.querySelector('#gallery').appendChild(item.anchor);
    });

    setTimeout(() => {
      items.forEach((item) => item.img.classList.add('loaded'));
    }, 125);
  }).catch((response) => {
    console.log(response);
  });
});

function createIllustrationElement(imageUrl, title, author) {
  var img = new Image();
  img.src = imageUrl;
  img.alt = author + ' / ' + title;
  return img;
}

function createGalleryItem(illustrationId, imageUrl, title, author) {
    var linkUrl = 'https://www.pixiv.net/i/' + illustrationId;
    var img = createIllustrationElement(imageUrl, title, author);
    var anchor = document.createElement('a');
    anchor.setAttribute('href', linkUrl);
    anchor.setAttribute('target', 'pixiv');
    anchor.appendChild(img);
    return {anchor, img};
}

function shuffle(array) {
  var n = array.length, t, i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
}
