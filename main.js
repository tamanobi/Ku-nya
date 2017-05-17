'use restrict';
document.addEventListener('DOMContentLoaded', (event) => {
  const SOURCE_URI = 'https://www.pixiv.net/ranking.php?mode=daily&format=json&content=illust';
  const promiseList = [];

  for (let i = 1; i <= 3; i++) {
    const p = axios.get(SOURCE_URI + '&p=' + i);
    promiseList.push(p);
  }

  Promise.all(promiseList).then(values => {
    const items = [];
    let illustrations = [];

    values.forEach(response => {
      if (response.status === 200) {
        // Extracting illustration info
        response.data.contents.forEach(content => {
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
    illustrations.forEach(illust => {
      items.push(createGalleryItem(
        illust.illustrationId,
        illust.illustrationUrl,
        illust.illustrationTitle,
        illust.userName
      ));
    });

    // Wait for image loading
    return Promise.all(items.map(item => {
      return new Promise(resolve => {
        item.img.onload = item.img.onerror = () => resolve(item);
      });
    }));
  })
  .then((items) => {
    items.forEach((item) => {
      document.querySelector('#gallery').appendChild(item.anchor);
    });

    setTimeout(() => {
      items.forEach(item => item.img.classList.add('loaded'));
    }, 125);
  }).catch(response => {
    console.log(response);
  });
});

function createIllustrationElement(imageUrl, title, author) {
  const img = new Image();
  img.src = imageUrl;
  img.alt = author + ' / ' + title;
  return img;
}

function createGalleryItem(illustrationId, imageUrl, title, author) {
    const linkUrl = 'https://www.pixiv.net/i/' + illustrationId;
    const img = createIllustrationElement(imageUrl, title, author);
    const anchor = document.createElement('a');
    anchor.setAttribute('href', linkUrl);
    anchor.setAttribute('target', 'pixiv');
    anchor.appendChild(img);
    return {anchor, img};
}

function shuffle(array) {
  let n = array.length;

  while (n) {
    const i = Math.floor(Math.random() * n--);
    const t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
}
