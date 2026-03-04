const products = [
  {
    name: 'Obsidian Marble Case',
    price: '$28',
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80',
    link: 'https://www.etsy.com/'
  },
  {
    name: 'Midnight Monogram Case',
    price: '$32',
    image:
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80',
    link: 'https://www.etsy.com/'
  },
  {
    name: 'Noir Floral Luxe Case',
    price: '$30',
    image:
      'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=700&q=80',
    link: 'https://www.etsy.com/'
  },
  {
    name: 'Black Satin Initial Case',
    price: '$29',
    image:
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=700&q=80',
    link: 'https://www.etsy.com/'
  }
];

const grid = document.getElementById('productGrid');

products.forEach((product) => {
  const card = document.createElement('article');
  card.className = 'card';

  card.innerHTML = `
    <img class="card-image" src="${product.image}" alt="${product.name}" loading="lazy" />
    <h3>${product.name}</h3>
    <div class="price-row">
      <span>${product.price}</span>
      <a class="buy-link" href="${product.link}" target="_blank" rel="noreferrer">View on Etsy</a>
    </div>
  `;

  grid.appendChild(card);
});

document.getElementById('year').textContent = new Date().getFullYear();
