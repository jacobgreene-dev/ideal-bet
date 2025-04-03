import React from 'react';

interface NewsArticle {
    id: number;
    title: string;
    description: string;
    url: string;
    imageUrl: string;
}

interface NewsDisplayProps {
    articles: NewsArticle[];
}

export default function Articles({ articles }: NewsDisplayProps) {
    return (
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {articles.map(article => (
                //border-b border-gray-300
                <div key={article.id} className="news-article mb-8 p-4 bg-gray-200 ">
                    <img src={article.imageUrl} alt={'no img'} className="news-image w-full h-auto mb-4" />
                    <div className="news-content">
                        <h2 className="news-title text-2xl font-bold mb-2">{article.title}</h2>
                        <p className="news-description text-lg mb-4">{article.description}</p>
                        <a href={article.url} className="news-link text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                            Read more
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
