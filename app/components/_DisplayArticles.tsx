
import React from 'react';
import Article from './_Articles';

const articles = [
    {
        id: 1,
        title: 'Breaking News: Market Hits Record Highs',
        description: 'The stock market reached new heights today as investors reacted to positive economic data.',
        url: 'https://example.com/article1',
        imageUrl: 'https://example.com/image1.jpg'
    },
    {
        id: 2,
        title: 'Sports Update: Local Team Wins Championship',
        description: 'In an exciting final match, the local team clinched the championship title.',
        url: 'https://example.com/article2',
        imageUrl: 'https://example.com/image2.jpg'
    },
    {
        id: 3,
        title: 'Player of the Year Announced',
        description: 'The prestigious Player of the Year award has been announced, recognizing outstanding performance.',
        url: 'https://example.com/article3',
        imageUrl: 'https://example.com/image3.jpg'
    },
    {
        id: 4,
        title: 'Upcoming Sports Events to Watch',
        description: 'A roundup of the most anticipated sports events happening this season.',
        url: 'https://example.com/article4',
        imageUrl: 'https://example.com/image4.jpg'
    },
    {
        id: 5,
        title: 'Injury Report: Star Player Out for Season',
        description: 'A key player has been ruled out for the rest of the season due to a severe injury.',
        url: 'https://example.com/article5',
        imageUrl: 'https://example.com/image5.jpg'
    },
    {
        id: 6,
        title: 'Historic Win: Underdog Team Triumphs',
        description: 'In a surprising turn of events, the underdog team secured a historic victory.',
        url: 'https://example.com/article6',
        imageUrl: 'https://example.com/image6.jpg'
    },
    {
        id: 7,
        title: 'Transfer News: Major Signing Announced',
        description: 'A major signing has been announced, shaking up the sports world.',
        url: 'https://example.com/article7',
        imageUrl: 'https://example.com/image7.jpg'
    },
    {
        id: 8,
        title: 'Coach Resigns After Controversial Season',
        description: 'Following a controversial season, the head coach has announced their resignation.',
        url: 'https://example.com/article8',
        imageUrl: 'https://example.com/image8.jpg'
    }
];

export default function DisplayArticles() {
    return (
        <div className="bg-white text-black">
            <h1 className='bg-white text-black text-2xl pl-5 pt-5' style={{ textDecoration: 'underline' }}>News Articles</h1>
            <Article articles={articles} />
        </div>
    );
};
