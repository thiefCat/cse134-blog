const KEY = 'blogData'; 

const selector = document.getElementById('post-selector');
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');
const tagInput = document.getElementById('tag');
const descInput = document.getElementById('description');
const imgInput = document.getElementById('imgSrc');
const linkInput = document.getElementById('link');

const btnCreate = document.getElementById('btn-create');
const btnUpdate = document.getElementById('btn-update');
const btnDelete = document.getElementById('btn-delete');
const createGroup = document.getElementById('create-btn-group');
const editGroup = document.getElementById('edit-btn-group');

function loadData() {
  const json = localStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
}

function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
  initSelector();
}


function initSelector() {
  const data = loadData();
  selector.innerHTML = '<option value="-1">-- Create New Post --</option>';
  
  data.forEach((item, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = item.title;
    selector.appendChild(option);
  });
}


selector.addEventListener('change', () => {
  const index = selector.value;
  
  if (index === "-1") {
    document.getElementById('blog-form').reset();
    createGroup.style.display = 'block';
    editGroup.style.display = 'none';
  } else {
    const data = loadData();
    const item = data[index];
    
    titleInput.value = item.title || "";
    dateInput.value = item.date || "";
    tagInput.value = item.tag || "";
    descInput.value = item.description || "";
    imgInput.value = item.imgSrc || "";
    linkInput.value = item.link || "";

    createGroup.style.display = 'none';
    editGroup.style.display = 'block';
  }
});

btnCreate.addEventListener('click', () => {
  const newItem = {
    title: titleInput.value,
    date: dateInput.value,
    tag: tagInput.value,
    description: descInput.value,
    imgSrc: imgInput.value,
    link: linkInput.value
  };

  const data = loadData();
  data.push(newItem);
  saveData(data);
  alert('Created!');
  document.getElementById('blog-form').reset();
});


btnUpdate.addEventListener('click', () => {
  const index = selector.value;
  if (index === "-1") return;

  const data = loadData();
  data[index].title = titleInput.value;
  data[index].date = dateInput.value;
  data[index].tag = tagInput.value;
  data[index].description = descInput.value;
  data[index].imgSrc = imgInput.value;
  data[index].link = linkInput.value;

  saveData(data);
  alert('Updated!');
});


btnDelete.addEventListener('click', () => {
  const index = selector.value;
  if (index === "-1") return;
  const data = loadData();
  data.splice(index, 1);
  saveData(data);

  alert('Deleted!');
  document.getElementById('blog-form').reset();
  createGroup.style.display = 'block';
  editGroup.style.display = 'none';
});


initSelector();