import React from 'react'
import { useLocation } from 'react-router-dom';
import '../style/marveldetailpage.css'

const MarvelDetailPage = () => {
    const location = useLocation();
    const { productData } = location.state || {};

    if (!productData) {
        return <div>No data available.</div>;
    }

    const {
        name,
        description,
        thumbnail,
        comics,
        series,
        events,
        urls
    } = productData;

    const imagePath = `${thumbnail.path}.${thumbnail.extension}`;

    return (
        <div className="detail-container">
            <div className="detail-header">
                <img src={imagePath} alt={name} className="character-image" />
                <div className="header-info">
                    <h1 className="character-name">{name}</h1>
                    <p className="character-description">{description || 'No description available.'}</p>
                    <div className="links">
                        {urls.map((urlObj) => (
                            <a href={urlObj.url} target="_blank" rel="noopener noreferrer" key={urlObj.type}>
                                {urlObj.type.charAt(0).toUpperCase() + urlObj.type.slice(1)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="detail-section">
                <h2 className="section-title">Comics</h2>
                <div className="comics-list">
                    {comics.items.map(comic => (
                        <div key={comic.resourceURI} className="comic-item">
                            <a href={comic.resourceURI} target="_blank" rel="noopener noreferrer">{comic.name}</a>
                        </div>
                    ))}
                </div>
            </div>
            <div className="detail-section">
                <h2 className="section-title">Series</h2>
                <div className="series-list">
                    {series.items.map(series => (
                        <div key={series.resourceURI} className="series-item">
                            <a href={series.resourceURI} target="_blank" rel="noopener noreferrer">{series.name}</a>
                        </div>
                    ))}
                </div>
            </div>
            <div className="detail-section">
                <h2 className="section-title">Events</h2>
                <div className="events-list">
                    {events.items.map(event => (
                        <div key={event.resourceURI} className="event-item">
                            <a href={event.resourceURI} target="_blank" rel="noopener noreferrer">{event.name}</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarvelDetailPage;
