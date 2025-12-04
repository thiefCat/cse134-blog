const localData = [
  {
    "title": "CSE224 - Go OOP",
    "link": "blogs/go-oop.html",
    "date": "2025-05-08",
    "tag": "CSE224",
    "description": "This blog introduces OOP in Go.",
    "imgSrc": "images/go.png",
    "imgAlt": "Golang Logo"
  },
  {
    "title": "CSE224 - Go Concurrent Programming",
    "link": "blogs/go-concurrency.html",
    "date": "2025-05-10",
    "tag": "CSE224",
    "description": "This blog introduces Go routine and channels.",
    "imgSrc": "images/concurrency.png",
    "imgAlt": "Concurrency Logo"
  }
];


if (!localStorage.getItem('blogData')) {
  localStorage.setItem('blogData', JSON.stringify(localData));
}


const loadLocalBtn = document.getElementById('load-local');
const loadRemoteBtn = document.getElementById('load-remote');
const cardList = document.getElementById('card-list');

function renderCards(data) {
  cardList.innerHTML = '';

  data.forEach(item => {
    const card = document.createElement('blog-card');

    card.setAttribute('title', item.title);
    card.setAttribute('link', item.link);
    card.setAttribute('date', item.date);
    card.setAttribute('tag', item.tag);
    card.setAttribute('description', item.description);
    card.setAttribute('img-src', item.imgSrc);
    card.setAttribute('img-alt', item.imgAlt);

    cardList.appendChild(card);
  });
}


loadLocalBtn.addEventListener('click', () => {
  const jsonString = localStorage.getItem('blogData');
  if (jsonString) {
    const data = JSON.parse(jsonString);
    renderCards(data);
  } else {
    alert("No local data found!");
  }
});


loadRemoteBtn.addEventListener('click', () => {
  console.log("Loading from Remote Server...");

  fetch(`https://api.jsonbin.io/v3/b/6930c630ae596e708f81d394`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      const data = json.record;
      renderCards(data);
    })
    .catch(error => {
      console.error('Error fetching remote data:', error);
    });
});