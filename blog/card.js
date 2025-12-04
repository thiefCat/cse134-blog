class BlogCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    const link = this.getAttribute('link');
    const date = this.getAttribute('date');
    const tag = this.getAttribute('tag');
    const description = this.getAttribute('description');
    const imgSrc = this.getAttribute('img-src');
    const imgAlt = this.getAttribute('img-alt');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-body, sans-serif);
          margin-bottom: 1.5rem;
          --card-img-width: 240px; 
          --card-img-height: 160px;
        }

        article {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border: 1px solid var(--border-color, #eee);
          background-color: var(--light-main-bg, #fff);
          border-radius: 12px;
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.2s ease;
          height: var(--card-img-height);
        }

        article:hover {
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .card-content {
          display: flex;
          flex-direction: column;
          padding: 1.2rem;
          flex: 1;
          overflow: hidden;
        }

        h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.4rem;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        h2 a {
          color: var(--text-color, #333);
          text-decoration: none;
        }
        h2 a:hover { color: #007bff; }

        p {
          margin: 0;
          color: var(--text-color, #666);
          font-size: 1rem;
          line-height: 1.5;
          
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          margin-top: auto;
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: #999;
          font-weight: 500;
        }

        picture {
          display: ${imgSrc ? 'block' : 'none'};
          width: var(--card-img-width);
          height: 100%;
          flex-shrink: 0;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        @media (prefers-color-scheme: dark) {
           article {
             background-color: #211F26;
             border-color: #444;
           }
           h2 a { color: #E6E0E9; }
           p { color: #ccc; }
        }

        @media (max-width: 768px) {
          :host {
             --card-img-height: auto;
          }
          article {
            flex-direction: column-reverse;
            height: auto;
          }
          picture {
            width: 100%;
            height: 200px;
          }
        }
      </style>

      <article>
        <div class="card-content">
          <h2><a href="${link}">${title}</a></h2>
          <p>${description}</p>
          <div class="card-footer">
            <span>${date}</span>
            <span>#${tag}</span>
          </div>
        </div>

        <picture>
           <img src="${imgSrc}" alt="${imgAlt || 'Cover'}" />
        </picture>
      </article>
    `;
  }
}

customElements.define('blog-card', BlogCard);