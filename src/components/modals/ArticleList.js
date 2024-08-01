import React from 'react';

const ArticlesList = ({ articles }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {articles.map((article, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticlesList;
