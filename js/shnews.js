const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

// Configurações iniciais
const country = "br";
const options = ["health","sports"];
const pexelsApiKey = 'moj27hkSbftMlXJBI3upU9GQpFIsYBdhi0VbDwqYG8zqQqXbdqebkh3j'; 
let requestURL;

// Função para obter uma imagem da Pexels
const getImageFromPexels = async (query) => {
  const pexelsApiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`;

  try {
    const response = await fetch(pexelsApiUrl, {
      headers: {
        'Authorization': pexelsApiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch image from Pexels API');
    }

    const data = await response.json();

    if (data.photos && data.photos.length > 0) {
      // Tenta obter a imagem em alta resolução, e se não disponível, usa a maior resolução possível
      return data.photos[0].src.fullHD || data.photos[0].src.large || data.photos[0].src.original || data.photos[0].src.small;
    }
  } catch (error) {
    console.error('Error fetching image:', error);
  }

  return null;
};

// Função para gerar a interface de notícias
const generateUI = async (articles) => {
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");

    // Obtém a URL da imagem da Pexels
    const imageUrl = await getImageFromPexels(item.title);

    // Monta o conteúdo do card
    card.innerHTML = `<div class="news-image-container">
      <img src="${imageUrl || "./newspaper.jpg"}" alt="" />
    </div>
    <div class="news-content">
      <div class="news-title">
        ${item.title}
      </div>
      <div class="news-description">
        ${item.description || item.content || ""}
      </div>
      <a href="${item.url}" target="_blank" class="view-button">Read More</a>
    </div>`;

    // Adiciona o card
    container.appendChild(card);
  }
};

// Função para obter notícias 
const getNews = async () => {
  container.innerHTML = "";
  let response = await fetch(requestURL);

  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }

  let data = await response.json();
  generateUI(data.articles);
};

// Função para selecionar uma categoria de notícias
const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });


  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};


const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${
      i == "general" ? "active" : ""
    }" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};

// Função de inicialização
const init = () => {
  optionsContainer.innerHTML = "";
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=sports&apiKey=${apiKey}`;
  getNews();  // Carrega automaticamente as notícias de esportes
  createOptions();
};
window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};
